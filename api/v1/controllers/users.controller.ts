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

export const login = async (req: Request, res: Response) => {
    const password = req.body.password
    const email = req.body.email
    const existEmail = await userModel.findOne({
        email: email,
        deleted: false
    })

    if (!existEmail) {
        res.json({
            code: 400,
            message: "Sai tài khoản !"
        })
        return;
    }

    if (md5(password) != existEmail.password) {
        res.json({
            code: 400,
            message: "Sai mật khẩu !"
        })
        return;
    }
    const token = existEmail.tokenUser
    res.cookie('token', token)
    res.json({
        code: 200,
        message: "Đăng nhập thành công !",
        token: token
    })
}

export const detail = async (req: Request, res: Response) => {
    const id: string = req.params.id
    const user = await userModel.findOne({
        _id: id,
        deleted: false
    }).select('-password -token')
    res.json({
        code: 200,
        infor: user
    })
}