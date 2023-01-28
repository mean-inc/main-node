import {TypesModel} from "./types.model.js";

class TypesService {

    async getAllTypes() {
        const types = await TypesModel.findAll()
        return types
    }
}

export default new TypesService()