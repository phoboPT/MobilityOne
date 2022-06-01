"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const body_parser_1 = require("body-parser");
const common_lib_1 = require("@mobileorg/common-lib");
const cookie_session_1 = __importDefault(require("cookie-session"));
const current_user_1 = require("./routes/current-user");
const signin_1 = require("./routes/signin");
const signout_1 = require("./routes/signout");
const signup_1 = require("./routes/signup");
const allUsers_1 = require("./routes/allUsers");
const app = (0, express_1.default)();
exports.app = app;
app.set('trust proxy', true);
app.use((0, body_parser_1.json)());
app.use((0, cookie_session_1.default)({
    signed: false,
    secure: false,
}));
app.use(allUsers_1.allUsersRouter);
app.use(signin_1.signinRouter);
app.use(signout_1.signoutRouter);
app.use(signup_1.signupRouter);
app.use(current_user_1.currentUserRouter);
app.all('*', async () => {
    console.log('Auth');
    throw new common_lib_1.NotFoundError({ from: "Index, /BAD_URL, route don't exist Auth" });
});
app.use(common_lib_1.errorHandler);
