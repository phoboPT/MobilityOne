"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allUsersRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../models/user");
const router = express_1.default.Router();
exports.allUsersRouter = router;
router.get('/api/users/allUsers', async (req, res) => {
    const user = await user_1.User.find({});
    res.send(user);
});
