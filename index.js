const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');
const mongoose = require('mongoose');
const multer = require('multer'); // library for upload file
const path = require('path');
// set folder save image
const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        callback(null, new Date().getTime() + '-' + file.originalname);
    }
})
// validation file, only format mimetype image
const fileFilter = (req, file, callback) => {
    if( file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/jpeg'){
        callback(null, true);
    } else {
        callback(null, false);
    }
}

app.use(bodyParser.json()) // type JSON
app.use('/images', express.static(path.join(__dirname, 'images'))); // midleware for access image server static
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image')); // midleware muler config, param must be image

// Handle CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/v1/auth', authRoutes);
app.use('/v1/blog', blogRoutes);

// Handle error
app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({message: message, data: data});
})

mongoose.connect('mongodb+srv://fikar:Ngjzh9GNCDVcQ2rD@cluster0.dzcambl.mongodb.net/blog?retryWrites=true&w=majority')
.then(() => {
    app.listen(4000, () => console.log('Connection Success'));
})
.catch(err =>console.log(err));

// app.listen(4000);