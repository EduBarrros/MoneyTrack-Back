import { z } from 'zod';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const UserController = {

    async CreateUser(request: any, reply: any) {

        try {
            const createUserSchema = z.object({
                name: z.string(),
                email: z.string().email(),
                password: z.string()
            })

            const { name, email, password } = createUserSchema.parse(request.body);

            await prisma.user.create({
                data: {
                    name,
                    email,
                    password
                }
            })

            return reply.status(201).send({
                status: 1,
                user: {
                    name,
                    email
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