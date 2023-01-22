import {ApiError} from "../exceptions/index.js";

export default function (error, req, res, next) {
    console.log(error)

    if (error instanceof ApiError) {
        return res.status(error.status).json({success: error.success, message: error.message})
    }
    return res.status(500).json({success: false, message: 'Internal Server Error'})
}