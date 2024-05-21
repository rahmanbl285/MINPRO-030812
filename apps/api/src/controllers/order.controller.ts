import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['query']
})

export class OrderController {
    async createOrder (req: Request, res: Response) {
        try {
            await prisma.$transaction(async (tx) => {
                const cart = await tx.cart.findUnique({
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
                });
    
                if (!cart || cart.CartItem.length === 0) {
                    throw "Cart is empty";
                }
    
                const oldOrder = await tx.order.findFirst({
                    where: {
                        userId: req.user?.id,
                        status: "Pending"
                    }
                });
    
                if (oldOrder) {
                    throw "Complete the previous transaction";
                }
    
                const total = cart.CartItem.reduce((total, item) => total + (item.event.ticketPrice * item.quantity), 0);
                const now = new Date();
                const expiredDate = new Date(now.getTime() + (5 * 60000));
    
                const order = await tx.order.create({
                    data: {
                        userId: req.user?.id || 0,
                        amount: total || 0,
                        status: "Pending",
                        expiredDate
                    }
                });
    
                await Promise.all(cart.CartItem.map(async (e) => {
                    const event = await tx.event.findUnique({ where: { id: e.eventId } });
                    if (!event || event.availableSeat < e.quantity) {
                        throw `event ${event?.eventTitle || e.eventId} is out of stock`;
                    }
    
                    await tx.orderItem.create({
                        data: {
                            eventId: e.eventId,
                            orderId: order.id,
                            quantity: e.quantity
                        }
                    });
    
                    await tx.event.update({
                        data: {
                            availableSeat: (event?.availableSeat || 0) - e.quantity
                        },
                        where: {
                            id: event?.id
                        }
                    });
                }));
    
                await tx.cartItem.deleteMany({
                    where: {
                        cartId: cart.id
                    }
                });
            });
            res.status(200).send({
                status: 'ok',
                message: 'order success'
            });
        } catch (err) {
            res.status(400).send({
                status: 'error',
                message: err
            })
        }
    
    }

    async getUserOrder (req: Request, res: Response) {
        try {
            const orders = await prisma.order.findMany({
                where: { userId: req.user?.id },
                include: {
                    OrderItem: {
                        include: { event: true }
                    }
                }
            })
    
            res.status(200).send({
                status: 'ok',
                orders
            })
        } catch (err) {
            res.status(400).send({
                status: 'error',
                message: err
            })
        }
    
    }
}