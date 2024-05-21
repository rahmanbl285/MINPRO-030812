import { OrderController } from "@/controllers/order.controller";
import { Router } from "express";

export class OrderRouter {
    private router: Router
    private orderController: OrderController

    constructor() {
        this.router = Router()
        this.orderController = new OrderController()
        this.initializeRoutes()
    }

    private initializeRoutes () : void {
        this.router.post('/', this.orderController.createOrder)
        this.router.get('/', this.orderController.getUserOrder)
    }

    getRouter() {
        return this.router
    }
}