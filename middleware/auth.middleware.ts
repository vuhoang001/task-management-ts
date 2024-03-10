import { Response, Request, NextFunction } from "express";
import User from "../api/v1/models/users.model";

export const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        const user = await User.findOne({
            tokenUser: token,
            deleted: false
        }).select('-password')

        if (!user) {
            res.json({
                code: 400,
                message: "Token không hợp lệ !"
            })
            return
        }

        req["user"] = user
        next()
    } else {
        res.json({
            code: 200,
            message: "Không có token !"
        })
    }
}