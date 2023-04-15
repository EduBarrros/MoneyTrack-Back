import fastify from "fastify";
import cors from '@fastify/cors'
import { UserController } from "./modules/user/userController";
import { AuthController } from "./modules/auth/authController";
import { TransactionController } from "./modules/transaction/transactionController";

const app = fastify();

app.register(cors, {
    origin: true, // Habilita qualquer origem (acesso cruzado de qualquer origem)
    methods: ['GET', 'POST'], // Define os métodos HTTP permitidos
    allowedHeaders: ['Content-Type'], // Define os cabeçalhos permitidos
})

app.post('/CreateUser', UserController.CreateUser)
app.get('/Login', AuthController.LogIn)
app.post('/CreateTransaction', TransactionController.CreateTransaction)
app.get('/GetTransactionsByUserId', TransactionController.GetAllTransactionsByUserId)


app.listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
}).then(() => {
    console.log("HTTP Server Running")
})