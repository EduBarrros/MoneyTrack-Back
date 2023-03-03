import fastify from "fastify";
import { UserController } from "./modules/user/userController";

const app = fastify();


app.post('/users', UserController.CreateUser)


app.listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
}).then(() => {
    console.log("HTTP Server Running")
})