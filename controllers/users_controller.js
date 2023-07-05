const User = require('../models/user');

module.exports.profile = function(req, res) {
  return res.render('user_profile', {
    title: 'User Profile'
  });
};

module.exports.signUp = function(req, res) {
  return res.render('user_sign_up', {
    title: "codieal | Sign Up"
  });
};

module.exports.signIn = function(req, res) {
  return res.render('user_sign_in', {
    title: "codieal | Sign In"
  });
};
//In this updated code, the create method uses await to wait for the promises returned by findOne() and create() functions. The try...catch block is used to handle errors, and in case of an error, it redirects the user back to the previous page.
//const User = require('../models/user');

// module.exports.profile = function(req, res){
//     return res.render('user_profile', {
//         title: 'User Profile'
//     })
// }
// // render the sign up page
// module.exports.signUp= function(req, res){
//     return res.render('user_sign_up', {
//         title: "codieal | Sign Up"
//     })
// }
// // render the sign in page
// module.exports.signIn= function(req, res){
//     return res.render('user_sign_in', {
//         title: "codieal | Sign In"
//     })
// }

// // get the sign up data
// module.exports.create = function(req, res){
//     if (req.body.password != req.body.confirm_password){
//         return res.redirect('back');
//     }

//     User.findOne({email: req.body.email}, function(err, user){
//         if(err){console.log('error in finding user in signing up'); return}

//         if (!user){
//             User.create(req.body, function(err, user){
//                 if(err){console.log('error in creating user while signing up'); return}

//                 return res.redirect('/users/sign-in');
//             })
//         }else{
//             return res.redirect('back');
//         }

//     });
// }
//  // sign in and create a session for the user
// module.exports.createSession = function(req, res){
//     //todo Later
// }



//
module.exports.create = async function(req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      return res.redirect('back');
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.redirect('back');
    }

    const user = await User.create(req.body);
    return res.redirect('/users/sign-in');
  } catch (err) {
    console.log('Error:', err);
    return res.redirect('back');
  }
};
// sign in and create a session for the user
module.exports.createSession = async function(req, res) {
    try {
      // Find the user
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        // User not found
        return res.redirect('back');
      }
  
      // Check if password matches
      if (user.password !== req.body.password) {
        // Password doesn't match
        return res.redirect('back');
      }
  
      // Session creation
      res.cookie('user_id', user.id);
      return res.redirect('/users/profile');
    } catch (err) {
      console.log('Error:', err);
      return res.redirect('back');
    }
  };
  
