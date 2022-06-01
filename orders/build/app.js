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
const routes_1 = require("./routes");
const new_1 = require("./routes/new");
const show_1 = require("./routes/show");
const delete_1 = require("./routes/delete");
// import { Order } from './models/order';
const update_1 = require("./routes/update");
const app = (0, express_1.default)();
exports.app = app;
app.set('trust proxy', true);
app.use((0, body_parser_1.json)());
app.use((0, cookie_session_1.default)({
    signed: false,
    secure: false,
}));
// Order.collection.drop();
app.use(common_lib_1.currentUser);
app.use(update_1.updateOrderRouter);
app.use(new_1.newOrderRouter);
app.use(show_1.showOrderRouter);
app.use(routes_1.indexOrderRouter);
app.use(delete_1.deleteOrderRouter);
app.all('*', async () => {
    throw new common_lib_1.NotFoundError({ from: "Index, /BAD_URL, route don't exist" });
});
app.use(common_lib_1.errorHandler);
