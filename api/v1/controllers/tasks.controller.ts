import tasks from "../models/tasks.model"
import { Response, Request } from "express"

export const index = async (req: Request, res: Response) => {
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
}

export const detail = async (req: Request, res: Response) => {
    const id = req.params.id
    const task = await tasks.findOne({
        _id: id,
        deleted: false
    })
    res.json(task)
}