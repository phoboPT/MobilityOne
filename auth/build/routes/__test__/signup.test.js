"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
it('returns a 201 on successfull signup', async () => (0, supertest_1.default)(app_1.app)
    .post('/api/users/signup')
    .send({
    email: 'teste@teste.com',
    password: 'asdf',
    name: 'teste',
})
    .expect(201));
it('returns a 400 with an invalid email', async () => (0, supertest_1.default)(app_1.app)
    .post('/api/users/signup')
    .send({
    email: 'testedasda',
    password: 'asdf',
})
    .expect(400));
it('returns a 400 with an invalid password', async () => (0, supertest_1.default)(app_1.app)
    .post('/api/users/signup')
    .send({
    email: 'testedasda',
    password: '',
})
    .expect(400));
it('returns a 400 with empty fields', async () => {
    await (0, supertest_1.default)(app_1.app)
        .post('/api/users/signup')
        .send({
        email: 'email@e,masd.pt',
    })
        .expect(400);
    await (0, supertest_1.default)(app_1.app)
        .post('/api/users/signup')
        .send({
        password: 'asddff',
    })
        .expect(400);
});
it('disallows duplicate emails', async () => {
    await (0, supertest_1.default)(app_1.app)
        .post('/api/users/signup')
        .send({
        email: 'teste@teste12.com',
        password: 'asdf',
        name: 'teste',
    })
        .expect(201);
    await (0, supertest_1.default)(app_1.app)
        .post('/api/users/signup')
        .send({
        email: 'teste@teste12.com',
        password: 'asdf',
        name: 'teste',
    })
        .expect(400);
});
it('sets a cookie after a successfull signup', async () => {
    const cookie = await global.signin();
    expect(cookie).toBeDefined();
});
