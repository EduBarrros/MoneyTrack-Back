import { z } from 'zod';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const TransactionController = {

    async CreateTransaction(request: any, reply: any) {

        try {
            const createTransactionSchema = z.object({
                value: z.number(),
                type: z.number(),
                userId: z.string()
            })

            const { value, type, userId } = createTransactionSchema.parse(request.body);

            const Transaction = await prisma.transaction.create({
                data: {
                    value,
                    type,
                    user: {
                        connect: {id: userId}
                    }
                }
            })

            return reply.status(201).send({
                status: 1,
                transaction: {
                    id: Transaction.id,
                    type: type,
                    value,
                    user: userId
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