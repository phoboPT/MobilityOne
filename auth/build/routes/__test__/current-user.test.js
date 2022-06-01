"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
it('respondes with details about the current user', async () => {
    const cookie = await global.signin();
    const response = await (0, supertest_1.default)(app_1.app).get('/api/users/currentuser').set('Cookie', cookie).send().expect(200);
    expect(response.body.email).toEqual('teste@teste.com');
});
it('respondes with null if not autehnticated', async () => {
    const response = await (0, supertest_1.default)(app_1.app).get('/api/users/currentuser').send().expect(200);
    expect(response.body.currentUser).toEqual(undefined);
});
