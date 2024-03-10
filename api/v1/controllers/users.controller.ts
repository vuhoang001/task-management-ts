import { Response, Request } from "express"
import md5 from "md5"
import userModel from "../models/users.model"
export const register = async (req: Request, res: Response) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const fullName = req.body.fullName
        const existEmail = await userModel.findOne({
            email: email
        })

        if (!existEmail) {
            const user = new userModel({
                fullName: fullName,
                email: email,
                password: md5(password)
            })
            await user.save()

            res.json({
                code: 200,
                message: "Thêm mới thành công !",
                token: user.tokenUser
            })
        } else {
            res.json({
                code: 400,
                message: "Email đã tồn tại !"
            })
        }
    } catch (err) {
        res.json({
            code: 400,
            message: "Tạo tài khoản thất bại !"
        }
        )
    }
}