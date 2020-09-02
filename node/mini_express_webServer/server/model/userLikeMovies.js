const mongoose = require('mongoose');

const likeMoviesSchema = mongoose.Schema(
    {
      userName: String,
      moviesName: String,
      moviesLink: String
    },
    { versionKey: false }//在存储数据的时候，MongoDB会默认生成"_v"字段，用来记录版本号，如果不需要可以通过此参数去除
)

module.exports = mongoose.model('userLike', likeMoviesSchema, 'userlike');