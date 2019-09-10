const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mid = require('../middleware/index.js');

// GET /profile
router.get('/profile', mid.requiresLogin, function(request, response, next) {
  User.findById(request.session.userId)
      .exec(function (error, user) {
        if (error) {
          return next(error);
        } else {
          return response.render('profile', { title: 'Trang cá nhân', name: user.name });
        }
      });
});

// GET /logout
router.get('/logout', function(request, response, next) {
  if (request.session) {
    // delete session object
    request.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return response.redirect('/');
      }
    });
  }
});

// // GET /profile
// router.get('/profle', ((request, response, next) => {
//   if (! request.session.userID){
//     const err = new Error('Đăng nhập để vào trang này');
//     err.status= 403;
//     return next(err);
//   }
//   User.findById(request.session.userID)
//     .exec((error,user)=> {
//       if(error){
//         return next(error);
//       } else {
//         return response.render('profile',{title: 'Trang cá nhân', name: username});
//       }
//     });
// }));

// GET Login
router.get('/login', mid.loggedOut, function(req, res, next) {
  return res.render('login', { title: 'Log In'});
});

// POST login
router.post('/login', function(request, response, next) {
  if (request.body.email && request.body.password) {
    User.authenticate(request.body.email, request.body.password, function (error, user) {
      if (error || !user) {
        var err = new Error('Sai email - mật khẩu.');
        err.status = 401;
        return next(err);
      }  else {
        request.session.userId = user._id;
        return response.redirect('/profile');
      }
    });
  } else {
    var err = new Error('Điền email + mật khẩu');
    err.status = 401;
    return next(err);
  }
});

// // POST login
// router.post('/login', (request,response, next) => {
//   if (request.body.email && request.body.password){
//     User.authenticate(request.body.email, request.body.passward, (error,user)=>{
//       if(error || !user){
//         const err = new Error('k timf thay tai khoan -Sai Email - Mật khẩu');
//         err.status = 401;
//         return next(err);
//       }
//     })
//   } else {
//     request.session.userID = user._id;
//     return response('/profile');
//     // const err = new Error('Yêu cầu điền cả email + mật khẩu')
//     // err.status = 401;
//     // return next(err);
//   }
// });

// GET Register
router.get('/register',(request, response, next) => {
  return response.render('register',{ title: 'Đăng kí'});
});
// POST REGISTER
router.post('/register', (request, response, next) => {
  if (request.body.email &&
    request.body.name &&
    request.body.password &&
    request.body.confirmPassword) {

      // confirm that user typed same password twice
      if (request.body.password !== request.body.confirmPassword) {
        var err = new Error('Mật khẩu k đúng.');
        err.status = 400;
        return next(err);
      }

      // tạo đổi tượng với form input
      var userData = {
        email: request.body.email,
        name: request.body.name,
        favoriteBook: request.body.favoriteBook,
        password: request.body.password
      };

      // Dùng chức năng create của scheme để điền vào mongo
      User.create(userData, function (error, user) {
        if (error) {
          return next(error);
        } else {
          request.session.userId = user._id;
          return response.redirect('/profile');
        }
      });

    } else {
      var err = new Error('All fields rquired.');
      err.status = 400;
      return next(err);
    }
});

// GET /
router.get('/', (request, response, next) => {
  return response.render('index',{ title: 'Home'});
});

// GET /about
router.get('/about', (request, response, next) => {
  return response.render('about',{ title: 'About'});
});

// GET /contact
router.get('/contact', (request, response, next) => {
  return response.render('contact',{ title: 'Contact'});
});

module.exports = router;