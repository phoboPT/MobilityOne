"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
it('clears the cookie after signing out', async () => {
    await (0, supertest_1.default)(app_1.app)
        .post('/api/users/signup')
        .send({
        email: 'teste@teste.com',
        password: 'asdf',
        name: 'easdasfsda',
    })
        .expect(201);
    const response = await (0, supertest_1.default)(app_1.app).post('/api/users/signout').send({}).expect(200);
    expect(response.get('Set-Cookie')[0]).toEqual('express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly');
});
