export class UserDto{
    constructor(model) {
        this.id = model.id
        this.email = model.email
        this.name = model.name
        this.surname = model.surname
    }
}