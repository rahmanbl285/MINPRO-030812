import prisma from '@/prisma'
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

export class UserMiddleware {
    async verifyToken (req: Request, res: Response, next: NextFunction) {
        try {
            let token = req.headers.authorization?.replace("Bearer ", "")
            if(!token) throw "Token Empty"

            const verifyUser = verify(token, process.env.KEY_JWT!)
            req.user = verifyUser as User

            next()
        } catch (err) {
            res.status(400).send({
                status: 'error',
                message: err
            })
        }
    }

    async isEventOrganizer (req: Request, res: Response, next: NextFunction) {
        try {
            if (req.user?.isEventOrganizer == false) throw 'Unauthorized! (Event Organizer only!)'

            next()
        } catch (err) {
            res.status(400).send({
                status: 'error',
                message: err
            })
        }
    }

    async isEvent (req: Request, res: Response, next: NextFunction) {

        try {
            const { eventId } = req.body
            if (!eventId) {
                return res.status(400).json({ error: 'eventId is required' });
              }

            const event = await prisma.event.findUnique({
                where: { id: eventId }
            })

            if (!event) throw 'Event not Found!'

            req.event = event
            next()
        } catch (err) {
            res.status(400).send({
                status: 'error',
                message: err
            })
        }
    }
}

