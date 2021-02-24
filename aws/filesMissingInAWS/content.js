const mongoose = require('mongoose');
/**
 * @description: data schema of helpcontents to be stored in collection
 */
const schema = new mongoose.Schema({
    identifier: {
        type: String,
        required: true,
        lowercase: true
    },
    productName: {
        type: String,
        lowercase: true,
        required: true,
    },
    pageName: {
        type: String,
        lowercase: true,
        required: true
    },
    date: {
        type: Date,
        default: new Date().toISOString()
    },
    caption: {
        page: {
            type: String,
            lowercase: true,
            default: null
        },
        section: {
            type: String,
            lowercase: true,
            default: null
        },
        field: {
            type: String,
            lowercase: true,
            default: null
        }
    },
    zycus: {
        type: [Object],
        default: []
    },
    tenant: {
        type: [Object],
        default: []
    }
});

const model = mongoose.model('content', schema, 'BFF_testing_dont_delete');;

module.exports = model;
// module.exports = async (request) =>{
//    const config = await utils.roleCheck(request);
//    const mongoConfig = config.mongoDBConfig;
//    return mongoose.model('content', schema, mongoConfig.helpContents);
// };