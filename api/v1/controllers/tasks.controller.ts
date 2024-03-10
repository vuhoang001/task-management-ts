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

export const changeStatus = async (req: Request, res: Response) => {
    const id: string = req.params.id
    const status: string = req.body.status
    try {
        await tasks.updateOne({
            _id: id
        }, {
            status: status
        })

        res.json({
            code: 200,
            message: "Updated successful !"
        })
    } catch (err) {
        res.json({
            code: 400,
            message: "Updated failed !"
        })
    }
}

export const changeMulti = async (req: Request, res: Response) => {
    const ids: string[] = req.body.ids
    const key: string = req.body.key
    const value: string = req.body.value
    switch (key) {
        case "status": {
            try {
                await tasks.updateMany({
                    _id: { $in: ids }
                }, {
                    status: value
                })

                res.json({
                    code: 200,
                    message: "Updated successful!"
                })
            } catch (err) {
                res.json({
                    code: 400,
                    message: "Update failed"
                })
            }
            break;
        }
        default: {
            res.json({
                code: 400,
                message: "Hoạt động thất bại!"
            })
            break;
        }
    }

}

export const create = async (req: Request, res: Response) => {
    try {
        const data = new tasks(req.body)
        await data.save()

        res.json({
            code: 200,
            message: "Tạo mới thành công !"
        })
    } catch (err) {
        res.json({
            code: 400,
            message: "Tạo mới thất bại!"
        })
    }
}

export const edit = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        await tasks.updateMany({
            _id: id
        }, req.body)

        res.json({
            code: 200,
            message: "Chỉnh sửa thành công !"
        })
    } catch {
        res.json({
            code: 400,
            message: "Chỉnh sửa thất bại !"
        })
    }
}