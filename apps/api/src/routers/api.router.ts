import { Router } from 'express'
import { UserRouter } from './user.router'
import { SampleRouter } from './sample.router'
import { EventRouter } from './event.router'
import { CartRouter } from './cart.router'
import { OrderRouter } from './order.router'
import { ReviewRouter } from './review.router'

export class ApiRouter {
    private router: Router
    private userRouter: UserRouter
    private sampleRouter: SampleRouter
    private eventRouter: EventRouter
    private cartRouter: CartRouter
    private orderRouter: OrderRouter
    private reviewRouter: ReviewRouter

    constructor() {
        this.router = Router()
        this.userRouter = new UserRouter()
        this.sampleRouter = new SampleRouter()
        this.eventRouter = new EventRouter()
        this.cartRouter = new CartRouter()
        this.orderRouter = new OrderRouter()
        this.reviewRouter = new ReviewRouter()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.use('/users', this.userRouter.getRouter())
        this.router.use('/sample', this.sampleRouter.getRouter())
        this.router.use('/events', this.eventRouter.getRouter())
        this.router.use('/carts', this.cartRouter.getRouter())
        this.router.use('/orders', this.orderRouter.getRouter())
        this.router.use('/reviews', this.reviewRouter.getRouter());
    }

    getRouter() {
        return this.router
    }
}