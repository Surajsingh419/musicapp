const userModel = require('../models/musicModel')
const fs = require('fs')
const http = require('http')
const validator = require('../middlewares/validator')





const Music = async function (req, res) {
    try {
        let files = req.files
        let requestBody = req.body;
        const { Mp3file, Category, Artist, genre } = requestBody;
        const musicData = { Mp3file, Category, Artist, genre }
        profileImage = await uploadFile(files[0]);
        const music = await musicModel.create(musicData)
        res.status(201).send({ status: true, message: "Music uploaded sucessfully", data: music })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: false, data: err.message })
    }
}





const getMusics = async function (req, res) {
    try {
        //here we use pagination
        const limit = parseInt(req.query.limit);
        const skip = parseInt(req.query.skip);

        const musics = await musicModel.getAll(limit, skip);

        res.status(200).send({ status: true, message: "music list", data: musics })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ status: false, error: error.message });
    }
}

const getAllMusics = async function (req, res) {
    try {
        //USE FILTER QUERY
        const filterQuery = { isDeleted: false }
        const queryParams = req.query;

        if (validator.isvalidRequestBody(queryParams)) {

            const { Category, genre } = queryParams;


            if (validator.isvalid(Category)) {
                filterQuery['Category'] = Category
            }

            if (validator.isvalid(genre)) {
                filterQuery['genre'] = genre

            }
        }
        const Musics = await musicModel.find(filterQuery)

        if (Array.isArray(Musics) && Musics.length === 0) {
            return res.status(404).send({ productsStatus: false, message: 'No Music found' })
        }

        return res.status(200).send({ status: true, message: 'Music list', data: Musics })
    } catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }

}

//-----MUSIC PLAY API-----

const playAllMusics = async function (req, res) {
    try {
      var trackID = new ObjectID(req.params.trackID);
    } catch(err) {
      return res.status(400).json({ message: "Invalid trackID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters" }); 
    }
    res.set('content-type', 'audio/mp3');
    res.set('accept-ranges', 'bytes');
  
    let bucket = new mongodb.GridFSBucket(db, {
      bucketName: 'tracks'
    });
  
    let downloadStream = bucket.openDownloadStream(trackID);
  
    downloadStream.on('data', (chunk) => {
      res.write(chunk);
    });
  
    downloadStream.on('error', () => {
      res.sendStatus(404);
    });
}
  








module.exports = { Music, getAllMusics, getMusics ,playAllMusics}
