import prisma from '@/prisma';
import { Request, Response } from 'express';
import { genSalt, hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import fs from 'fs';
import { transporter } from '@/helpers/nodemailer';
import Handlebars from 'handlebars';
import path from 'path';
import { DiscountStatus, PointStatus } from '@prisma/client';

export class UserController {
  async userRegister(req: Request, res: Response) {
    try {
        const { firstname, lastname, password, email, username, referral } = req.body;
        console.log(req.body);
        
        const salt = await genSalt(10);
        const hashPassword = await hash(password, salt);

        // Validate email uniqueness
        const validateEmail = await prisma.user.findUnique({
            where: { email: email },
        });

        // Validate username uniqueness
        const validateUser = await prisma.user.findUnique({
            where: { username: username },
        });

        if (validateEmail) throw new Error('This email has been taken by another user, please change your email');
        if (validateUser) throw new Error('This username has been taken by another user, please change your username');

        // Referral code logic
        if (referral) {
            const reffUser = await prisma.user.findUnique({
                where: { referral: referral.toLowerCase() },
            });

            if (!reffUser) throw new Error('Wrong referral code');
        }

        const createdUser = await prisma.user.create({
            data: {
                fullName: firstname + " " + lastname,
                username: username,
                email: email,
                password: hashPassword,
            },
        });

        // Generate JWT token
        const payload = {
            id: createdUser.id,
            referral: referral
        };
        const token = sign(payload, process.env.KEY_JWT!, { expiresIn: '1h' });

        // Send verification email
        const link = `http://localhost:3000/verify/${token}`;
        const templatePath = path.join(__dirname, '../templates', 'register.html');
        const templateSource = fs.readFileSync(templatePath, 'utf-8');
        const compiledTemplate = Handlebars.compile(templateSource);
        const html = compiledTemplate({ name: `${firstname} ${lastname}`, link });

        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Welcome to EVENT',
            html,
        });

        res.status(201).send({
            status: 'OK',
            message: 'User Created!',
            user: createdUser,
        });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(400).send({
            status: 'error',
            message: err || 'Failed to register user',
        });
    }
}

  // =========================================================
  async userVerify(req: Request, res: Response) {
    try {
      const reffCode = await generateReferralNumber();
      console.log(req.user);
      
      // const id = req.user?.referral
      // res.send(id)
      const verifyUser = await prisma.user.update({
        where: {
          id: req.user?.id,
        },
        data: {
          isActive: true,
          referral: reffCode,
        },
      });
      if (req.user?.referral) {
        
        const reffUser = await prisma.user.findUnique({
          where: {
            referral: req.user.referral,
          },
        });
        if (!reffUser) throw 'wrong referral code';
        await prisma.points.create({
          data: {
            amount: 10000,
            expiredDate: new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000),
            userId: reffUser.id,
            currentPoint: 10000,
            pointStatus: 'Active',
          },
        });
        await prisma.discount.create({
          data: {
            currentDiscount: 10,
            expiredDate: new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000),
            userId: req.user?.id,
            discountStatus: 'Active',
          },
        });
      }
        res.json("verify success");
      
    } catch (err) {
      // console.log(err)
      res.status(400).send({
        status: 'error',
        message: err,
      });
    }
  }
  
  //===========================================
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
  // ===========================================
  async keepLogin(req: Request, res:Response) {
    try {
        const user = await prisma.user.findUnique({
          where : { id : req.user?.id},
          select: {
            id: true, username:true , isEventOrganizer : true
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
  // ===========================================

  async userProfile(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.user?.id,
        },
        select: {
          id: true,
          fullName: true,
          email: true,
          profileImg: true,
          usedReferralCode: true,
          isEventOrganizer: true,
          Points: true,
          Discount: true,
          Event: true,
          referral:true
        },
      });
      res.status(200).send(user);
    } catch (err) {
      res.status(400).send({
        status: 'error',
        message: err,
      });
    }
  }
  // =======================================================
  async userUpdate(req: Request, res: Response) {
    try {
      let newPath = null;
      if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split(',');
        const ext = parts[parts.length - 1];
        newPath = path + ',' + ext;
        fs.renameSync(path, newPath);
      }
      const user = await prisma.user.findUnique({
        where: {
          id: req.user?.id,
        },
      });
      let updateUser;
      if (user?.email !== req.body.email) {
        updateUser = await prisma.user.update({
          where: {
            id: user?.id,
          },
          data: {
            username: req.body.username,
            profileImg: newPath ? newPath : user?.profileImg,
          },
        });
        const payload = {
          id: user?.id,
          email: req.body.email,
        };

        const token = sign(payload, process.env.KEY_JWT!, { expiresIn: '1h' });
        const link = `http://localhost:3000/verify/update_email/${token}`;
        const templatePath = path.join(
          __dirname,
          '../templates',
          'updateEmail.html',
        );
        const templateSource = fs.readFileSync(templatePath, 'utf-8');
        const compiledTemplate = Handlebars.compile(templateSource);
        const html = compiledTemplate({
          name: user?.username,
          link,
        });
        await transporter.sendMail({
          from: process.env.MAIL_USER!,
          to: req.body.email,
          subject: 'update email confirmation',
          html,
        });
        res.status(200).send({
          status: 'update email',
          token: token,
          email: req.body.email,
        });
      } 
      else if (user?.email === req.body.email) {
        updateUser = await prisma.user.update({
          where: {
            id: user?.id,
          },
          data: {
            ...req.body,
            profileImg : newPath ? newPath : user?.profileImg,
          },
        });
        res.status(200).send({ status: 'user updated' });
      }
    } catch (err) {
      res.status(400).send({
        status: 'error',
        message: err,
      });
    }
  }

  // =============================================
  async sendEmail(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user?.id },
      });
      const payload = {
        id: user?.id,
      
      };
      const token = sign(payload, process.env.KEY_JWT!, { expiresIn: '1h' });
      const link = `http://localhost:3000/verify/organizer${token}`;
      const templatePath = path.join(__dirname, '../templates', 'verify.html');
      const templateSource = fs.readFileSync(templatePath, 'utf-8');
      const compiledTemplate = Handlebars.compile(templateSource);
      const html = compiledTemplate({
        name: user?.username,
        link,
      });
      await transporter.sendMail({
        from: process.env.MAIL_USER!,
        to: user?.email,
        subject: 'Verify as an organizer',
        html,
      });
      res.status(200).send('email send');
    } catch (err) {
      res.status(400).send({
        status: 'error',
        message: err,
      });
    }
  }
// ===========================================
async verifyOrganizer(req: Request, res: Response) {
  try {
    await prisma.user.update({
      data: {
        isEventOrganizer : true
      },
      where : {
        id : req.user?.id
      }
    })
    res.status(200).send({
      status: 'okeey',
      message: 'verify account success'
    })
  } catch  (err){
    res.status(400).send({
      status:'error',
      message:err
    })
  }
}
// ==========================================
async updateEmail(req: Request, res: Response) {
  try {
    const validate = await prisma.user.findUnique({
      where : { email : req.user?.email}
    })
    if (validate) throw 'email has been used with another account'
    await prisma.user.update({
      data:{
        email : req.user?.email
      },
      where: {
        id: req.user?.id
      }
    })
    res.status(200).send({
      status: 'okeeyy',
      message: 'update email success'
    })
  } catch (err) {
    res.status(400).send({
      status: 'error',
      message: err
    })
  }
}
// ===========================================
async forgotPassword(req: Request, res: Response) {
  try {
    
    const user = await prisma.user.findUnique({
      where : { email : req.body.email}
    })
    if (!user) throw 'Account not found !!'
    const payload = {
      id : user?.id,
      email: user?.email
    }
    const token = sign(payload, process.env.KEY_JWT!, {expiresIn: '1h'})
    const link = `http://localhost:3000/verify/forgot-password/update/${token}`
    const templatePath = path.join(__dirname, "../templates", "resetPassword.html")
    const templateSource = fs.readFileSync(templatePath,'utf-8')
    const compiledTemplate = Handlebars.compile(templateSource)
    const html  = compiledTemplate({
      name: user?.username,
      link
    })
    await transporter.sendMail({
      from: process.env.MAIL_USER!,
      to: user.email,
      subject: "Reset password confirmation",
      html
  })
    res.status(200).send({
      status: 'okeeey',
      message: "email send !"
    })
  } catch (err) {
    res.status(400).send({
      status: 'error',
      message: err
    })
  }
}
// =============================================
async resetPassword(req: Request, res: Response) {
  const {password}  = req.body
  const salt = await genSalt(10)
  const hashPassword = await hash(password, salt)

  try {
    const updatePassword = await prisma.user.update({
      where : {id : req.user?.id},
      data : {
        password : hashPassword
      }
    })
    res.status(200).send({
      updatePassword
    })
  } catch (error) {
    console.error('Failed to reset password:', error);
    res.status(400).send({ message: 'Failed to reset password.' });
  }
}
} //penutup si baris export class  nya ahahhaha !!

// =====================================================
// REFERRAL CODE !
async function generateReferralNumber() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = 8;
  let referralCode = '';

  // Generate referral code
  for (let i = 0; i < length; i++) {
    referralCode += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }

  // Check if referral code already exists in database
  const existingReferral = await prisma.user.findUnique({
    where: {
      referral: referralCode,
    },
  });

  // If referral code already exists, recursively generate a new one until unique
  if (existingReferral) {
    return generateReferralNumber();
  }

  // If referral code is unique, return it
  return referralCode;
}
