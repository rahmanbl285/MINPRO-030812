type User = {
    id: number,
    referral: string,
    email: string

}

declare namespace Express {
    export interface Request {
        user?: User
    }
}