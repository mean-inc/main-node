import typesService from "./types.service.js";

class TypesController {

    async getAllTypes(req, res, next) {
        try {
            const types = await typesService.getAllTypes()
            return res.json({success: true, types})
        } catch (e) {
            next(e)
        }
    }
}

export default new TypesController()