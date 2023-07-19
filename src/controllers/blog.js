const {validationResult} = require('express-validator');
const path = require('path');
const fs = require('fs');
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
// Get Blog Post By Id
exports.getBlogPostById = (req, res, next) => {
    const postId = req.params.postId;
    BlogPost.findById(postId)
    .then(result => {
        if(!result) {
            const error = new Error('Blog Post tidak ditemukan');
            error.errorStatus = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Data Blog Post By Id Berhasil dipanggil',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}
// Update Blog Post By Id
exports.updateBlogPost = (req, res, next) => {
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
    const postId = req.params.postId;

    BlogPost.findById(postId)
    .then(post => {
        if(!post) {
            const err = new Error('Blog Post tidak ditemukan');
            err.errorStatus = 404;
            throw err;
        }

        post.title = title;
        post.body = body;
        post.image = image;

        return post.save();
    })
    .then(result => {
        res.status(200).json({
            message: 'Update Blog Post Berhasil',
            data: result,
        })
    })
    .catch(err => {
        next(err);
    })

    const Posting = new BlogPost({
        title: title,
        body: body,
        image: image,
        author: {
            uid: 1,
            name: 'Tri Fikar',
        }
    })
}

// Delete Blog Post By Id
exports.deleteBlogPost = (req, res, next) => {
    const postId = req.params.postId;
    // cek adapah terdapat blog post dgn id yg dikirimkan
    BlogPost.findById(postId)
    .then(post => {
        if(!post) { // cek dapat atau tidak
            const err = new Error('Blog Post tidak ditemukan');
            err.errorStatus = 404;
            throw err;
        }
        // hapus image
        removeImage(post.image);
        return BlogPost.findByIdAndRemove(postId); // remove blog post
    })
    .then(result => {
        res.status(200).json({
            message: 'Hapus Blog Post Berhasil',
            data: result,
        })
    })
    .catch(err => {
        next(err);
    })
}

const removeImage = (filePath) => {
    console.log('file path', filePath);
    console.log('dir name: ', __dirname); // C:\laragon\www\study\mern\backend-api-mern\src\controllers
    // menggabungkan nama file path
    filePath = path.join(__dirname, '../..', filePath) // C:\laragon\www\study\mern\backend-api-mern\images\1689429246678-Mern.jpg
    // cara remove image di node js dgn unlink
    fs.unlink(filePath, err => console.log('error: ', err));
} 