import { Router } from "express";
const router: Router = Router()
import * as controller from "../controllers/users.controller"

router.post('/register', controller.register)

export const usersRoute = router