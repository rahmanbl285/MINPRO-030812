import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export class EventController {

    async getEvent (req: Request, res: Response) {
        try {
            const { eventLocation, eventCategory, isPaid } = req.query
            const filters: any = {}

            if (eventLocation){
            filters.eventLocation = {
                contains: eventLocation
            }}

            if (eventCategory){
            filters.eventCategory = {
                equals: String(eventCategory)
            }}

            console.log(filters);
            
            const event = await prisma.event.findMany({
                where: filters
            })

            res.status(200).send ({
                status: 'OK',
                event
            })
        } catch (err) {
            console.log(err);
            
            res.status(400).send ({
                status: 'error',
                message: err
            })
        }
    }

    async getEventId (req: Request, res: Response) {
        try {
            const events = await prisma.event.findFirst({
                where: {id: +req.params.id}
            })

            res.status(200).send({
                status: 'OK',
                events
            })
        } catch (err) {
            console.log(err);
            res.status(400).send ({
                status: 'error',
                message: err
            })
        }
    }

    async createEvent (req: Request, res: Response) {
        try {
        
            const {
                eventTitle,
                startDate,
                endDate,
                eventCategory,
                eventLocation,
                description,
                ticketName,
                availableSeat,
                ticketPrice,
                startSaleDate,
                endSaleDate,
            } = req.body

            let isPaid = false
            if (ticketPrice !== 0) {
                isPaid = true;
                if (ticketPrice == 0) {
                    isPaid = false
                }
            } 

            const { file } = req
            const imgEvent = `http://localhost:8000/public/images/${file?.filename}`
            const eventSlug = req.body.eventTitle.toString().toLowerCase().replaceAll(" ", "-")

            const newEvent = await prisma.event.create ({
                data: {
                    eventTitle,
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                    eventImage: imgEvent,
                    eventCategory,
                    eventLocation,
                    eventSlug,
                    description,
                    ticketName,
                    isPaid: Boolean(isPaid),
                    availableSeat: parseInt(availableSeat),
                    ticketPrice: parseInt(ticketPrice),
                    startSaleDate: new Date(startSaleDate),
                    endSaleDate: new Date(endSaleDate),
                }
            })
            
            res.status(201).send({
                status: 'OK',
                message: 'Event Created!',
                event: newEvent
            })
        } catch (err) {
            console.log(err);
            res.status(400).send({
                status: 'error',
                message: err
            })
        }
    }

    async getEventSlug (req: Request, res: Response) {
        try {
            const events = await prisma.event.findUnique ({
                where: {
                    eventSlug: req.params.eventSlug
                }
            })
            res.status(200).send ({
                status: 'OK',
                events
            })
        } catch (err) {
            console.log(err);
            
            res.status(400).send ({
                status: 'error',
                message: err
            })
        }
    }

    async updateEvent (req: Request, res: Response) {
        try {
            const { 
                eventTitle,
                startDate,
                endDate,
                eventImage,
                eventCategory,
                eventLocation,
                description,
                ticketName,
                isPaid,
                availableSeat,
                ticketPrice,
                startSaleDate,
                endSaleDate,
             } = req.body
            const files = req.files as {[fieldName: string]: Express.Multer.File[]}
            const imgEvent = files?.eventImage ? `http://localhost:8000/public/images/${files.eventImage[0].filename}` : ""

            const result = await prisma.event.update({
                where: {
                    id: +req.params.id
                },
                data: {
                    eventTitle,
                    startDate: startDate ? new Date(startDate) : undefined,
                    endDate: endDate ? new Date(endDate) : undefined,
                    eventImage: imgEvent,
                    eventCategory,
                    eventLocation,
                    description,
                    ticketName,
                    isPaid,
                    availableSeat,
                    ticketPrice,
                    startSaleDate: startSaleDate ? new Date(startSaleDate) : undefined,
                    endSaleDate: endSaleDate ? new Date(endSaleDate) : endSaleDate,

                    } 
            })

            res.status(200).send({
                status: 'OK',
                message: 'Event updated!',
                result
            })
        } catch (err) {
            console.log(err);
            res.status(400).send ({
                status: 'error',
                message: err
            })
        }
    }

    async deletedEvent (req: Request, res: Response) {
        try {
            await prisma.event.delete({
                where: {
                    id: +req.params.id
                }
            })
            res.status(200).send({
                status: 'OK',
                message: 'Event Deleted!'
            })
        } catch (err) {
            console.log(err);
            res.status(400).send ({
                status: 'error',
                message: err
            })
        }
    }

    
}