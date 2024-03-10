import { Router, Request, Response } from 'express'
import tasks from '../models/tasks.model'
const router: Router = Router()

import * as controller from "../controllers/tasks.controller"

router.get('/', controller.index)

router.get('/detail/:id', controller.detail)

router.patch('/change-status/:id', controller.changeStatus)

router.patch('/change-multi', controller.changeMulti)


export const taskRouter: Router = router