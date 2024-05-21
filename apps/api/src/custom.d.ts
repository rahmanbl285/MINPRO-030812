type User = {
    id: number,
    isEventOrganizer: boolean
    userId: number
    referral: number
}

type Event = {
    id: number
    userId: number
}

type Tikets = {
    id: number
    eventId: number
    ticketName: string
    isPaid: boolean
    availableSeat: number
    ticketPrice: number
}

type PromoTiket = {
    promoName: string
    promoDiscount: number
}

declare namespace Express {
    export interface Request {
        user?: User
        event?: Events
        tiket?: Tikets
        promoTiket?: PromoTiket
    }
}