const express = require('express');
const mongoose = require('mongoose');
const app = express();
const moviesRouter=require('./routes/route');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://127.0.0.1:27017/userLike', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// var db = mongoose.connection;
// db.on('error', function callback() { //监听是否有异常
//     console.log("Connection error");
// });
// db.once('open', function callback() { //监听一次打开
//     //在这里创建你的模式和模型
//     console.log('connected!');
// })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}))
app.use('/api/v1',moviesRouter)
// app.use('/', (req, res, next) => {
//     res.send("hello,express")
// });

app.listen((8080), () => {
    console.log("server is running")
});