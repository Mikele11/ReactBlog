var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = require('../models/Post.js');
var Comment = require('../models/Comment.js');
var passport = require('passport');
require('../config/passport')(passport);

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
router.get('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Post.find(function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
router.get('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    Post.findById(req.params.id,function (err, post) {
      if (err) return next(err);
      res.json(post);
    })
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.post('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Post.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    })
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
router.put('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
    var token = getToken(req.headers);
  if (token) {
    Post.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.delete('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
    var token = getToken(req.headers);
  if (token) {
    Post.findByIdAndRemove(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});


router.get('/comment/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  let token = getToken(req.headers);
  if (token) {
    Comment.find({'post_id': req.params.id })
		.then(function(coment) {
			res.json(coment);
		})
		.catch(function(err) {
			return next(err);
		})	
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
})

router.post('/comment/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  let token = getToken(req.headers);
  let comment_arr=[];
  if (token) {
	Comment.create(req.body)
		.then(function(coment) {
			Post.findById(req.params.id)
				.then(function(postBuffer) {
					comment_arr=postBuffer.comment;
					comment_arr.push(coment._id);
					Post.findByIdAndUpdate(req.params.id, {'comment': comment_arr}, {new: true})
						.then(function(post) {
              res.json(post);
						})
						.catch(function(err) {
							return next(err);
						})
				})
				.catch(function(err) {
					return next(err);
				})				
		})
		.catch(function(err) {
			return next(err);
		})		
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
})

router.delete('/comment/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  let token = getToken(req.headers);
  if (token) {
    console.log('deleted id=>>',req.params.id)
    Comment.deleteMany({'post_id': req.params.id })
		.then(function(coment) {
      res.json(coment);
		})
		.catch(function(err) {
			return next(err);
    })
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
})
module.exports = router;