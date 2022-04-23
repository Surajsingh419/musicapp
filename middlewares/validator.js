const mongoose = require('mongoose');
const musicModel = require('../models/musicModel')



const isvalid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.length === 0) return false
    return true;
}

const isvalidRequestBody = function (requestbody) {
    return Object.keys(requestbody).length > 0
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}




//--------------------------------------------------------------------------------------------------------------------//

const checkmusic = async (req, res, next) => {
    try {
        let requestBody = req.body;
        if (!isvalidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, msg: "Please Provide Data" })
        }
        const { Mp3file, Category, Artist, genre } = requestBody;

        if (!isvalid(Mp3file)) {
            return res.status(400).send({ status: false, msg: "Please fill the mp3file" })
        }

        if (!isvalid(Category)) {
            return res.status(400).send({ status: false, msg: "Please fill the category" })
        }
        if (!isvalid(Artist)) {
            return res.status(400).send({ status: false, msg: "Please fill the Artist" })
        }
        if (!isvalid(genre)) {
            return res.status(400).send({ status: false, msg: "Please fill the genre" })
        }
         if (!(files && files.length > 0)) {
            return res.status(400).send({ status: false, message: "Invalid request parameter, please provide mp3 file" })
        }                           
        next();
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

module.exports = {
    isvalid, isvalidRequestBody, isValidObjectId, checkmusic
}