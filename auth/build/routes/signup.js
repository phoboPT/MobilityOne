"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const common_lib_1 = require("@mobileorg/common-lib");
const user_1 = require("../models/user");
const router = express_1.default.Router();
exports.signupRouter = router;
router.post('/api/users/signup', [
    (0, express_validator_1.body)('email').isEmail().withMessage('Email must be valid'),
    (0, express_validator_1.body)('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters'),
    (0, express_validator_1.body)('name').trim().isLength({ min: 4, max: 20 }).withMessage('Name must be between 4 and 20 characters'),
], common_lib_1.validateRequest, async (req, res) => {
    const { email, password, name, photoUrl, biography, contact, birthDate } = req.body;
    const existingUser = await user_1.User.findOne({ email });
    if (existingUser) {
        throw new common_lib_1.BadRequestError('Email in use', {
            from: 'Signup, email is already in use',
        });
    }
    const user = user_1.User.build({
        email,
        password,
        rating: 0,
        name: name || '',
        photoUrl: photoUrl ||
            'https://toppng.com/uploads/preview/app-icon-set-login-icon-comments-avatar-icon-11553436380yill0nchdm.png',
        biography: biography || '',
        contact: contact || '',
        birthDate: birthDate || '',
    });
    await user.save();
    //Generate and setting token
    const userJwt = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
    }, process.env.JWT_KEY || 'MySeCrEt');
    req.session = { jwt: userJwt };
    res.status(201).send(user);
});
