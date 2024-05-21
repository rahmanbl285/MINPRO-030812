import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const addEvent = async (data: any): Promise<any> => {
    return await prisma.event.create({
        data
    })
}

export const selectEvent = async (): Promise<any> => {
    return await prisma.event.findMany()
}