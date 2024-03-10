import { Router } from "express";
const router: Router = Router()
import * as controller from "../controllers/users.controller"
import * as authMiddleware from "../../../middleware/auth.middleware"

router.post('/register', controller.register)

router.post('/login', controller.login)

router.get('/detail/:id', authMiddleware.requireAuth, controller.detail)

export const usersRoute = router