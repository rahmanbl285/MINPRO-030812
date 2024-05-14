import { UserController } from '@/controllers/user.controller';
import { uploader } from '@/helpers/uploader';
import { UserMiddleware } from '@/middlewares/user.middleware';
import { Router } from 'express'
import multer from "multer"
const uploadMiddleware = multer({ dest: 'public/uploads' })

export class UserRouter {
    private router: Router;
    private userController: UserController;
    private userMiddleware: UserMiddleware

    constructor() {
        this.userController = new UserController()
        this.userMiddleware = new UserMiddleware()
        this.router = Router()
        this.initializeRoutes()
    }

    // this.router.put('/update', this.userMiddleware.verifyToken, uploader("", "/uploads").single('file'), this.userController.userUpdate)
    private initializeRoutes(): void {
        this.router.post('/register', this.userController.userRegister)
        this.router.post('/login', this.userController.userLogin)
        this.router.get('/verify', this.userMiddleware.verifyToken, this.userController.userVerify)
        this.router.get('/keep-login', this.userMiddleware.verifyToken, this.userController.keepLogin)
        // this.router.get('/profile', this.userMiddleware.verifyToken, this.userController.userProfile)
        // this.router.put('/update', this.userMiddleware.verifyToken, uploadMiddleware.single('file'), this.userController.userUpdate)
        // this.router.post('/send', this.userMiddleware.verifyToken, this.userController.sendEmail)
        // this.router.post('/activate', this.userMiddleware.verifyToken, this.userController.userActivate)
    }

    getRouter() {
        return this.router
    }
} 


// ===========================================
// punya gaby !!
// import { UserController } from '@/controllers/user.controller';
// import { UserMiddleware } from '@/middlewares/user.middleware';
// import { Router } from 'express';

// export class UserRouter { // selama didalem router,, ini masih bsa diakses !!
//   private router: Router;
//   private userController: UserController;
//   private UserMiddleware : UserMiddleware;
// // line 5 6 router sama usercontroller itu variabel didalem class
//   constructor() {
//     this.userController = new UserController();
//     this.UserMiddleware = new UserMiddleware();
//     this.router = Router();
//     this.initializeRoutes();
//   }

//   private initializeRoutes(): void {
//     this.router.get('/', this.UserMiddleware.log, this.userController.getUser);
//     this.router.post('/users', this.UserMiddleware.log, this.userController.createUser);
//     this.router.post('/profile',this.UserMiddleware.log, this.userController.LoginUser)
//     // this.router.post('/', this.userController.createSampleData);
//   }

//   getRouter(): Router {
//     return this.router;
//   }
// }
