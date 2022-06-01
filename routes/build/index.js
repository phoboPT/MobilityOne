"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
const start = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI not defined');
    }
    if (!process.env.NATS_CLIENT_ID) {
        throw new Error('NATS_CLIENT_ID not defined');
    }
    if (!process.env.NATS_URL) {
        throw new Error('NATS_URL not defined');
    }
    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error('NATS_CLUSTER_ID not defined');
    }
    try {
        // await natsWrapper.connect('orders', process.env.NATS_CLIENT_ID, process.env.NATS_URL);
        // natsWrapper.client.on('close', () => {
        //   console.log('NATS connection closed');
        //   process.exit();
        // });
        // process.on('SIGINT', () => natsWrapper.client.close());
        // process.on('SIGTERM', () => natsWrapper.client.close());
        // new OrderCreatedListener(natsWrapper.client).listen();
        // new OrderUpdatedListener(natsWrapper.client).listen();
        // new OrderFinishedListener(natsWrapper.client).listen();
        await mongoose_1.default.connect(process.env.MONGO_URI);
        console.log('Connected to mongo DB');
    }
    catch (err) {
        console.error(`Error on start ${err}`);
    }
    app_1.app.listen(3000, () => {
        console.log('Listening port 3000!!!!!!!!');
    });
};
start();
