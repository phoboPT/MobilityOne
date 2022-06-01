"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("../app");
let mongo;
beforeAll(async () => {
    process.env.JWT_KEY = 'gdhgdhgd';
    mongo = new mongodb_memory_server_1.MongoMemoryServer();
    const mongoUri = await mongo.getUri();
    await mongoose_1.default.connect(mongoUri);
});
beforeEach(async () => {
    const collections = await mongoose_1.default.connection.db.collections();
    for (const collection of collections) {
        await collection.deleteMany({});
    }
});
afterAll(async () => {
    await mongo.stop();
    await mongoose_1.default.connection.close();
});
global.signin = async () => {
    const response = await (0, supertest_1.default)(app_1.app)
        .post('/api/users/signup')
        .send({
        email: 'teste@teste.com',
        password: 'asdf',
        name: 'easdasfsda',
    })
        .expect(201);
    const cookie = response.get('Set-Cookie');
    return cookie;
};
