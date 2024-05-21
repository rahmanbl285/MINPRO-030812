import prisma from "@/prisma"
import { Request, Response } from 'express'
import { genSalt, hash, compare } from "bcrypt"
import { sign, verify } from "jsonwebtoken"
import fs from 'fs'
import { transporter } from "@/helpers/nodemailer"
import Handlebars from "handlebars"
import path from 'path'

export class UserController {
    async userRegister(req: Request, res: Response) {
        try {
            const { firstname, lastname, password, email, username, referall } = req.body // Add email and username here
            const salt = await genSalt(10)
            const hashPassword = await hash(password, salt)

            const validateEmail = await prisma.user.findUnique({
                where: { email: email }
            })

            const validateUser = await prisma.user.findUnique({
                where: { username: username }
            })

            if (validateEmail) throw 'This email has been taken by another user, please change your email'
            if (validateUser) throw 'This username has been taken by another user, please change your username'

            // Referral
            let createdUser
            if (referall !== undefined && referall !== null && referall !== '') {
                const reffUser = await prisma.user.findUnique({
                    where: { referral: referall.toLowerCase() } // Convert to lowercase
                })

                if (!reffUser) throw "Wrong referral code"
            }

            createdUser = await prisma.user.create({
                data: {
                    fullName: firstname + lastname,
                    username: username,
                    email: email,
                    password: hashPassword
                }
            })

            const payload = {
                id: createdUser.id
                //referall: referall || null
            }
            const token = sign(payload, process.env.KEY_JWT!, { expiresIn: '1h' })
            const link = `http://localhost:3000/verify/${token}`
            const templatePath = path.join(__dirname, "../templates", "register.html")
            const templateSource = fs.readFileSync(templatePath, 'utf-8')
            const compiledTemplate = Handlebars.compile(templateSource)
            const html = compiledTemplate({
                name: req.body.fullName,
                link
            })

            await transporter.sendMail({
                from: process.env.MAIL_USER,
                to: email,
                subject: 'Welcome to EVENT',
                html
            })

            res.status(201).send({
                status: 'OK',
                message: 'User Created!',
                user: createdUser // Use createdUser instead of users
            })
        } catch (err) {
            console.log(err);

            res.status(400).send({
                status: 'error',
                message: err
            })
        }
    }
// =========================================================
    async userVerify(req: Request, res: Response) {
        try {
            const token = req.headers.authorization?.split(" ")[1] // Extract token from headers
            if (!token) throw "Token is missing"
            
            const decodedToken = verify(token, process.env.KEY_JWT!) // Verify and decode token
            const userId = (decodedToken as any).id // Extract user ID from decoded token

            await prisma.user.update({
                where: { id: userId },
                data: { isActive: true }
            })

            res.status(200).send({
                status: 'OK',
                message: 'Account verification successful'
            })
        } catch (err) {
            console.log(err);
            res.status(400).send({
                status: 'error',
                message: err
            })
        }
    }

// =========================================================
async userLogin (req: Request, res: Response) {
    try {
        const { password, email } = req.body;

        // Mencari pengguna berdasarkan password atau nama lengkap
        const users = await prisma.user.findFirst({
            where: {    
                    email: email  
            }
        });

        if (users == null ) throw "Users not Found!" 
        const isValidPass = await compare (password, users.password)
        if (!isValidPass) throw "Wrong Password!"
           
        const payload = {
            id : users.id 
        }

        const token = sign(payload, process.env.KEY_JWT!, {expiresIn : "1d"});

        res.status(200).send({
            status: 'OK',
            users,
            token
        });

    } catch (err) {
        console.log(err);
        
        res.status(400).send({
            status: "error",
            message: err
        });
    }

}
  // ==============================================

  async keepLogin(req: Request, res:Response) {
    try {
        const user = await prisma.user.findUnique({
          where : { id : req.user?.id},
          select: {
            id: true, username:true
          }
        })
        res.status(200).send(user)
    } catch (err) {
        res.status(400).send({
            status: "error",
            message: err
        })
    }
  }

//===========================================

async userProfile (req: Request, res: Response) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user?.id
            },
            select : {
                id : true,
                username : true,
                isEventOrganizer : true,
                usedReferralCode : true,
                profileImg : true,
                email : true,
                Points : true,
                Discount : true,
                Event : true
            }
        })
        res.status(200).send(user)

    } catch (err) {
        res.status(400).send({
            
            status: 'error',
            message: err
        })
        
        
    }
}
  
} //penutup si baris export class  nya ahahhaha !!
