import { z } from 'zod';
import fastify from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const UserController = {
    
    async CreateUser(request: any, reply: any) {

        const createUserSchema = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string()
        })

        const { name, email, password} = createUserSchema.parse(request.body);

        await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })

        return reply.status(201).send()

    }
}