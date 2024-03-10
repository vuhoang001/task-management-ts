import panigation from "../../../helpers/panigation.helper"
import searchHelper from "../../../helpers/search.helper"

import tasks from "../models/tasks.model"
import { Response, Request } from "express"

export const index = async (req: Request, res: Response) => {
    try {
        interface find {
            deleted: boolean,
            status?: string,
            title?: RegExp
        }

        const find: find = {
            deleted: false
        }

        const sort = {}

        if (req.query.sortKey && req.query.sortValue) {
            const sortKey = req.query.sortKey.toLocaleString()
            sort[sortKey] = req.query.sortValue
        }

        if (req.query.status) {
            find.status = req.query.status.toString()
        }

        // Search 
        let objectSearch = searchHelper(req.query)
        if (req.query.keyword) {
            find.title = objectSearch.regex
        }
        // End search 
        // Painigation 
        let initPagination = {
            currentPage: 1,
            limitItems: 2
        }

        const countTasks = await tasks.countDocuments(find)

        const objectPanigation = panigation(
            initPagination,
            req.query,
            countTasks
        )
        // End panigation 


        const task = await tasks.find(find).sort(sort).limit(objectPanigation.limitItems).skip(objectPanigation.skip)


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