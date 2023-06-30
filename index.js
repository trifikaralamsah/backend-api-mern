const express = require('express');

const app = express();

app.use(() => {
    console.log('hello server');
    console.log('hello tiga');
})

app.listen(4000);