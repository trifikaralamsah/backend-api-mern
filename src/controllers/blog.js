const {validationResult} = require('express-validator');
const BlogPost = require('../models/blog');

// Create Blog Post
exports.createBlogPost = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        // console.log('err :', errors);
        const err = new Error('Input value tidak sesuai');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }
    // validasi for image file
    if(!req.file) {
        const err = new Error('Image harus Di Upload');
        err.errorStatus = 422;
        throw err;
    }

    const title = req.body.title;
    const image = req.file.path; // image from muller
    const body = req.body.body;

    const Posting = new BlogPost({
        title: title,
        body: body,
        image: image,
        author: {
            uid: 1,
            name: 'Tri Fikar',
        }
    })

    Posting.save()
    .then(result_data => {
        const result = {
            code: 1,
            message: 'Create Blog Post Success',
            data: result_data
        }
        res.status(201).json(result);
    })
    .catch(err => {
        console.log('error ', err);
    });

}

// Get All Blog Post
exports.getAllBlogPost = (req, res, next) => {
    // find() to get all data in models blog
    BlogPost.find()
    .then(result => {
        res.status(200).json({
            message: 'Data Blog Post Berhasil Dipanggil',
            data: result
        })
    })
    .catch(err => {
        next(err);
    });
}