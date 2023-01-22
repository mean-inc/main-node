import {ApiError} from "../exceptions/index.js";

export default function (error, req, res, next) {
    console.log(error)

    if (error instanceof ApiError) {
        return res.status(error.status).json({message: error.message})
    }
    return res.status(500).json({message: 'Internal Server Error'})
}