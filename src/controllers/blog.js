const {validationResult} = require('express-validator');
const BlogPost = require('../models/blog');

exports.createBlogPost = (req, res, next) => {
    const title = req.body.title;
    // const image = req.body.image;
    const body = req.body.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        // console.log('err :', errors);
        const err = new Error('Input value tidak sesuai');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    const Posting = new BlogPost({
        title: title,
        body: body,
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