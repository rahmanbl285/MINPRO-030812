import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma =  new PrismaClient()

export class ReferralController{
    async generateReferralCode():Promise<string> {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        const length = 6 
        let referralCode = ""

        for (let i = 0; i < length; i++) {
            referralCode += characters.charAt(Math.floor(Math.random() * characters.length))
        }
        const existingReferral = await prisma.referral.findUnique({
            where : {
                referralCode
            }
        })
        if (existingReferral) {
            return this.generateReferralCode()
        }
        return referralCode
    } 
    // ===============================================
    async getReferralCode(req: Request, res: Response) {
        try {
            const referralCode = await prisma.referral.findMany()
            res.status(200).send ({
                status : 'okeeeey',
                referralCode
            })
        } catch (err) {
            res.status(400).send ({
                status : 'error',
                message: err
            })
        }
    }
}