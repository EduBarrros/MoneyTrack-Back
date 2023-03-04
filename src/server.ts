import fastify from "fastify";
import { UserController } from "./modules/user/userController";
import { AuthController } from "./modules/auth/authController";

const app = fastify();


app.post('/users', UserController.CreateUser)
app.post('/login', AuthController.LogIn)


app.listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
}).then(() => {
    console.log("HTTP Server Running")
})