// import {Request, Response, NextFunction} from 'express'

// export class UserMiddleware {
//     log(req: Request, res: Response, next: NextFunction ) {
//         console.log("middleware gaiseuu");
//         next()
        
//     }
// }

import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

export class UserMiddleware {
    async verifyToken (req: Request, res: Response, next: NextFunction) {
        try {
            let token = req.headers.authorization?.replace("Bearer ", "")
            if(!token) throw "Token Empty"

            const verifyUser = verify(token, process.env.KEY_JWT!)
            req.user = verifyUser as User

            next()
        } catch (err) {
            res.status(400).send({
                status: 'error',
                message: err
            })
        }
    }
}

