import * as authService from "./auth.service.js"

const register = async() => {
    // something
    const user = await authService.register(req.body)
}

export {register}