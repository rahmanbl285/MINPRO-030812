import { EventController } from "@/controllers/event.controller";
import { UserMiddleware } from "@/middlewares/user.middleware";
import { uploader } from "@/helpers/uploader";
import { Router } from "express";
import multer from "multer";

const uploadMiddleware = multer({
    dest: 'public/images'
})

export class EventRouter {
    private router: Router
    private eventController: EventController
    private userMiddleware: UserMiddleware

    constructor() {
        this.router = Router()
        this.eventController = new EventController()
        this.userMiddleware = new UserMiddleware()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post('/create-event', uploader('IMG', '/images').single('file'), this.eventController.createEvent)
        this.router.get('/', this.eventController.getEvent)
        this.router.get('/:eventSlug', this.eventController.getEventSlug)
        this.router.get('/:id', this.eventController.getEventId)
        this.router.patch('/:id', uploader('IMG', '/images').single('file'), this.eventController.updateEvent)
        this.router.delete('/:id', this.eventController.deletedEvent)
    }

    getRouter() {
        return this.router
    }
}