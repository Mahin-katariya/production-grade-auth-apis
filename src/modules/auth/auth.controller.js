import * as authService from "./auth.service.js"
import APIResponse from "../../common/utils/apiResponse.js"
const register = async(req, res) => {
    // something
    const user = await authService.register(req.body)
    APIResponse.created(res,"Registration success",user)
}

export {register}