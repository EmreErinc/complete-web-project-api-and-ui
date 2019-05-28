var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('main', { title: 'Ana Sayfa' });
});

router.get('/posts', function(req, res, next) {
  res.render('posts', { title: 'Gönderiler' });
});

router.get('/posts/:id', function(req, res, next) {
  res.render('postDetail', { _id: req.params.id });
});

router.get('/references', function(req, res, next) {
  res.render('references', { title: 'Referanslar' });
});


router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'İletişim' });
});

module.exports = router;
