import { Router } from "express";
const router: Router = Router()
import * as controller from "../controllers/users.controller"

router.post('/register', controller.register)

router.post('/login', controller.login)

router.get('/detail/:id', controller.detail)

export const usersRoute = router