exports.createBlogPost = (req, res, next) => {
    const title = req.body.title;
    // const image = req.body.image;
    const body = req.body.body;

    const result = {
        code: 1,
        message: 'Create Blog Post Success',
        data: {
            post_id: 1,
            title: title,
            image: "imgfile.jpg",
            body: body,
            created_at: "08/072023",
            author: {
                uid: 1,
                name: "testing"
            }
        }
    }
    res.status(201).json(result);

}