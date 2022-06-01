"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const common_lib_1 = require("@mobileorg/common-lib");
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const password_1 = require("../services/password");
const router = express_1.default.Router();
exports.signinRouter = router;
router.post('/api/users/signin', [
    (0, express_validator_1.body)('email').isEmail().withMessage('Email must be valid'),
    (0, express_validator_1.body)('password').trim().isLength({ min: 4, max: 20 }).notEmpty().withMessage('Provide a password'),
], common_lib_1.validateRequest, async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await user_1.User.findOne({ email });
    if (!existingUser) {
        throw new common_lib_1.BadRequestError('Bad credentials provided', { from: 'Signin, invalid credentials' });
    }
    const passwordsMatch = await password_1.Password.compare(existingUser.password, password);
    if (!passwordsMatch) {
        throw new common_lib_1.BadRequestError('Bad credentials provided', { from: 'Signin, invalid credentials' });
    }
    //Generate and setting token
    const userJwt = jsonwebtoken_1.default.sign({
        id: existingUser.id,
        email: existingUser.email,
        rating: existingUser.rating,
    }, process.env.JWT_KEY);
    req.session = { jwt: userJwt };
    res.status(200).send(existingUser);
});
