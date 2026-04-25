import Joi from "joi";

class baseDto {
    // to overide the schema. when any of the custom DTOS access it
    static schema = Joi.object({})
    // now perform validation on the schema.
    static validate(data){
        const {error, value} = this.schema.validate(data, {
            // options
            abortEarly: false,
            // if an attaker sent thousands of data, the DTO will perform validation on those data too, which will cost CPU cycles, so to prevent that we use stripUnknown whose job is to remove all those data that are required immediately, rather than performing validation on them aswell
            stripUnknown: true
        })
        
        if(error){
            const errors = error.details.map((d) => d.message)
            return {errors, value: null}
        }
        return {errors: null, value}
    }
}

export default baseDto