import tasks from "../models/tasks.model"
import { Response, Request } from "express"

export const index = async (req: Request, res: Response) => {
    try {
        interface find {
            deleted: boolean,
            status?: string
        }

        const find: find = {
            deleted: false
        }

        if (req.query.status) {
            find.status = req.query.status.toString()
        }
        const task = await tasks.find(find)
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