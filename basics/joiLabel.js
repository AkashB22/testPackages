function doJoiValidation(obj){
    let joi = require('joi');

    let schema = {
        //label adds custom names instead of the key name in the object
        "name": joi.date().timestamp().raw().required().label('name_value')
    }

    let result = joi.validate(obj, schema);

    return result.error;
}

function doJoiValidationAllow(obj){
    let joi = require('joi');

    let schema = {
        "name": joi.string().valid('john', 'jane').label('name_value')
    }

    let result = joi.validate(obj, schema);

    return result.error;
}

// console.log(doJoiValidation({"name": 2121423}));
console.log(doJoiValidationAllow({"name": "2121423"}));