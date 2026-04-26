import Joi from "joi";
import baseDto from "../../../common/dto/baseDto.js";

class RegisterDto extends baseDto {
    static schema = Joi.object({
        name: Joi.string().trim().min(2).max(50).required(),
        email: Joi.string().trim().email().lowercase().required(),
        password: Joi.string().min(8).message("Password must contain min of 8 characters").required(),
        role: Joi.string().valid("customer", "seller").default("customer"),
    })
}

export default RegisterDto
