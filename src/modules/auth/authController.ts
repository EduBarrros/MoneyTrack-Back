import { z } from 'zod';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const AuthController = {

    async LogIn(request: any, reply: any) {

        try {
            const createLogInSchema = z.object({
                email: z.string().email(),
                password: z.string()
            })

            const { email, password } = createLogInSchema.parse(request.query);

            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            })

            if (!user) {
                return reply.status(400).send({ status: 0, error: "Usuário ou senha inválidos" })
            }

            if (user.password !== password) {
                return reply.status(400).send({ status: 0, error: "Usuário ou senha inválidos" })
            }

            return reply.status(200).send({
                status: 1,
                user: {
                    id: user.id,
                    name: user.name,
                    emial: user.email
                }
            })

        } catch (error) {
            if (error instanceof z.ZodError) {
                const formattedError = error.format()
                reply.status(400).send({ status: 0, error: formattedError })
            } else {
                reply.status(500).send({ status: 0, error: 'Internal Server Error' })
            }
            
        }
    }
}