var mongoose = require('mongoose');
var passport = require('passport');
var settings = require('../config/settings');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require('../models/User')
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var currentUser = null;

router.post('/register', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password,
      address: req.body.address,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    });
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

router.post('/login', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          var token = jwt.sign(user.toJSON(), settings.secret);
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

router.post('/saveresethash', async (req, res, next) => {
  console.log('req',req.body.email)
  
  let result;
  try {
    const query = User.findOne({ username: req.body.email });
    const foundUser = await query.exec();
    const timeInMs = Date.now();
    const hashString = `${req.body.email}${timeInMs}`;
    const secret = 'alongrandomstringshouldgohere';
    const hash = crypto.createHmac('sha256', secret)
                       .update(hashString)
                       .digest('hex');
    foundUser.passwordReset = hash;
    currentUser = foundUser;
    foundUser.save((err) => {
      if (err) { result = res.send(JSON.stringify({ error: 'Something went wrong while attempting to reset your password. Please Try again' })); }
      result = res.send(JSON.stringify({ success: true }));
      try {
        const url = `http://localhost:3000/api/auth/confirm/${hash}`
        var nodemailer = require('nodemailer');
        var sgTransport = require('nodemailer-sendgrid-transport');
  
        var options = {
          auth: {
          api_user: 'Mikele111',//SENDGRID_USERNAME
          api_key: 'face112358'//SENDGRID_PASSWORD
          }
        }
        try {
          var client = nodemailer.createTransport(sgTransport(options));
        } catch (error) {
          console.log('errrr',error)
        }

        var email = {
          from: 'mikeleilyash@gmail.com',
          to: req.body.email,
          subject: `New password`,
          text: `
              Yours new password => 1234 from site
              Please click this email to confirm your email : <a href="${url}">${url}</a>`,
          html: `
              Yours new password => 1234 from site
              Please click this email to confirm your email : <a href="${url}">${url}</a>`
        };
  
        client.sendMail(email, function(err, info){
          if (err ){
            console.log(err);
          }
          else {
            console.log('Message sent: ' + info);
          }
        });
      } catch (error) {
        console.log('error 12',error)
      }
    });
  } catch (err) {
    console.log('err change pass',err)
    result = res.send(JSON.stringify({ error: 'Something went wrong while attempting to reset your password. Please Try again' }));
  }
  return result;
});

router.get('/confirm/:token', async (req, res, next) => {
  try {
    if (currentUser.passwordReset ==req.params.token){
      res.redirect('/?ch=1');
    }
  } catch (e) {
    console.log('catch err confirm token',e)
    res.send('error');
  }
});

router.post('/account/reset-password-render', function(req, res) {
  currentUser.password = req.body.password;
  currentUser.save(function(err) {
    if (err) {
      console.log('thisUse err',err)
      return res.json({success: false, msg: err});
    } else {
      res.redirect('/');
    }
  })
})

module.exports = router;