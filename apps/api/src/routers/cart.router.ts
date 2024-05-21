import { CartController } from "@/controllers/cart.controller";
import { Router } from "express";

export class CartRouter {
    private router: Router
    private cartController: CartController

    constructor() {
        this.router = Router()
        this.cartController = new CartController()
        this.initializeRoutes()
    }

    private initializeRoutes () : void {
        this.router.post('/', this.cartController.addToCart)
        this.router.get('/', this.cartController.getUserCart)
    }

    getRouter() {
        return this.router
    }
}