"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
it('fails when a email does not exist is supplied', async () => {
    await (0, supertest_1.default)(app_1.app)
        .post('/api/users/signin')
        .send({
        email: 'teste@teste.com',
        password: 'asdf',
    })
        .expect(400);
});
it('fails when an incorrect password is supplied', async () => {
    await (0, supertest_1.default)(app_1.app)
        .post('/api/users/signup')
        .send({
        email: 'teste@teste.com',
        password: 'asdf',
    })
        .expect(400);
    await (0, supertest_1.default)(app_1.app)
        .post('/api/users/signin')
        .send({
        email: 'teste@teste.com',
        password: 'fdsfsdf',
    })
        .expect(400);
});
it('respondes with a cookie with valid credentials', async () => {
    await (0, supertest_1.default)(app_1.app)
        .post('/api/users/signup')
        .send({
        email: 'teste@teste.com',
        password: 'asdf',
        name: 'easdasfsda',
    })
        .expect(201);
    const response = await (0, supertest_1.default)(app_1.app)
        .post('/api/users/signin')
        .send({
        email: 'teste@teste.com',
        password: 'asdf',
    })
        .expect(200);
    expect(response.get('Set-Cookie')).toBeDefined();
});
