import APIError from "../utils/apiError.js";


const validate = (Dtoclass) => {
    return (req, res, next) => {
        const {errors, value } = Dtoclass.validate(req.body)
        if(errors){
            throw APIError.badRequest(errors.join(";"))
        }
        // clean the req.body before passing it ahead!
        req.body = value

        next()
    }
}
