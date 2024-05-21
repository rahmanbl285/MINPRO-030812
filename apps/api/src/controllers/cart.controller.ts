import prisma from "@/prisma";
import { createCart, findCart } from "@/services/cart.services";
import { Request, Response } from "express";

export class CartController {
    async addToCart(req: Request, res: Response) {
        try {
        const { eventId, quantity } = req.body
        let cart = await findCart(req)

        if (!cart) {
          cart = await createCart({ userId: req.user?.id || 0 })
      }

      let cartItem = await prisma.cartItem.findFirst({
        where: {
            cartId: cart.id,
            eventId: eventId
        }
    })

      if (cartItem) {
        cartItem = await prisma.cartItem.update({
            data: { quantity: cartItem.quantity + quantity },
            where: { id: cartItem.id }
        })
    } else {
        cartItem = await prisma.cartItem.create({
            data: {
                eventId,
                quantity,
                cartId: cart.id
            }
        })
    }

          res.status(200).send({
            status: 'ok',
            message: 'Add to cart success',
            cartItem
        })

        } catch (err) {
            console.log(err);
            res.status(400).send ({
                status: 'error',
                message: err
            })
        }
    }
    async getUserCart (req: Request, res: Response) {
      try {
        const carts = await prisma.cart.findUnique({
            where: {
                userId: req.user?.id
            },
            include: {
                CartItem: {
                    include: {
                        event: true
                    }
                }
            }
        })
        res.status(200).send({
            status: 'ok',
            carts
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
