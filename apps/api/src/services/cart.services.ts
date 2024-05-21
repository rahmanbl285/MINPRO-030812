import { PrismaClient } from "@prisma/client";
import { Request } from "express";

const prisma = new PrismaClient()

export const findCart = async (req: Request): Promise<any> => {
    return await prisma.cart.findUnique({
        where: { userId: req.user?.id }
    })
}

export const createCart = async (data: any): Promise<any> => {
    return await prisma.cart.create({
        data
    })
}