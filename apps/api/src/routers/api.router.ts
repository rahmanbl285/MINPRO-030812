import {Router} from 'express'
import { UserRouter } from './user.router'
// import { SampleRouter } from './sample.router'

export class ApiRouter {
    private userRouter: UserRouter
    // private sampleRouter : SampleRouter
    private router : Router

    constructor() {
        this.router = Router()
        this.userRouter = new UserRouter()
        // this.sampleRouter = new SampleRouter()
        this.initializeRoutes()
    }
private initializeRoutes() :void{
    this.router.use('/users', this.userRouter.getRouter())
    // this.router.post('/login', this.userRouter.getRouter())
    // this.router.get('/verify',  this.userRouter.getRouter())
    // this.router.get('/keep',  this.userRouter.getRouter())
    // this.router.use('/sample', this.sampleRouter.getRouter())
}
    getRouter() {
        return this.router
    }

}