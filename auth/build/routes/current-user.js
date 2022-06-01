"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUserRouter = void 0;
const common_lib_1 = require("@mobileorg/common-lib");
const express_1 = __importDefault(require("express"));
const common_lib_2 = require("@mobileorg/common-lib");
const user_1 = require("../models/user");
const router = express_1.default.Router();
exports.currentUserRouter = router;
router.get('/api/users/currentUser', common_lib_2.currentUser, async (req, res) => {
    const user = await user_1.User.findById(req.currentUser?.id);
    res.status(200).send(user);
});
router.post('/api/users/edit', common_lib_2.currentUser, async (req, res) => {
    const { photoUrl, biography, contact } = req.body;
    const user = await user_1.User.findById(req.currentUser?.id);
    if (!user) {
        throw new common_lib_1.NotFoundError({ from: 'User not found, verify the user id' });
    }
    user.set({
        photoUrl: photoUrl || user.photoUrl,
        biography: biography || user.briography,
        contact: contact || user.contact,
    });
    await user.save();
    res.status(201).send(user);
});
router.get('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await user_1.User.findById(id);
    res.status(200).send(user);
});
