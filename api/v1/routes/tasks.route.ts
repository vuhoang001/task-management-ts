import { Router, Request, Response } from 'express'
import tasks from '../../../models/tasks.model'
const router: Router = Router()

// const controller = require('../controllers/task.controller')

router.get('/', async (req: Request, res: Response) => {
    try {
        const task = await tasks.find({
            deleted: false
        })
        if (!res.headersSent) {
            res.json(task)
        }
    } catch (error) {
        // Xử lý lỗi ở đây nếu cần thiết
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.use('/detail/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    const task = await tasks.findOne({
        _id: id,
        deleted: false
    })
    res.json(task)
})


export const taskRouter: Router = router