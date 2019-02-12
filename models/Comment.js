var mongoose = require('mongoose')

    , Schema = mongoose.Schema

var commentSchema = Schema({
    author: String,
	description: String,
	post_id:[{ type: Schema.Types.ObjectId, ref: 'Post' }]
});


module.exports = mongoose.model('Comment', commentSchema);