const User = require('../models/user');
const Passport = require('passport');
const {check, validationResult} = require('express-validator/check');
const {sanitize} = require('express-validator/filter');

exports.checkIfLoggedIn = (req, res, next) => {
    if (!req.user) res.redirect('/')
    next()
}

exports.signupGet = (req, res) => {
    res.render('signup', {title: 'Sign Up'})
}

exports.signupPost = [
    // validate data
    check('username').isLength({min: 1}).withMessage('Username must be specified'),

    check('email').isEmail().withMessage('Invalid email address'),

    check('password').isLength({min: 8}).withMessage('Invalid password. Password must be at least 8 characters'),

    check('confirm_password').custom((value, {req}) => value === req.body.password).withMessage("Passwords must match"),

    sanitize('*').trim(),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // handle errors
            res.render('signup', {title: 'User sign up', errorMessage: "Please fix the following errors:", errors: errors.array()});
            return;
        } else {
            req.body.username = req.body.username.replaceAll(" ", "_");
            req.body.username = req.body.username.replaceAll("#", "");
            req.body.username = req.body.username.replaceAll("%", "");
            req.body.username = req.body.username.replaceAll('&', '');
            const newUser = new User(req.body);
            User.register(newUser, req.body.password, function(err) {
                if(err) {
                    console.log('error while registering', err);
                    return next(err);
                }
                next()
            })
        }
    }
]
exports.loginGet = (req, res) => {
    res.render('login', {title: "Login"})
}
exports.loginPost = Passport.authenticate('local', {
    successRedirect: '/edit',
    failureRedirect: '/login'
});
exports.logout = (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
}
exports.edit = (req, res) => {
    const links = req.user.links
    res.render('edit', {links, title: 'Edit Links'})
}
exports.addLink = async (req, res, next) => {
    try {
        await User.findOneAndUpdate({username: req.user.username}, {
            $push: {
                links: req.body
            }
        }, {new: true})
        res.redirect('/edit')
    } catch(error) {
        next(error)
    }
}
exports.updateLink = async (req, res, next) => {
    try {
        await User.findOneAndUpdate({_id: req.user._id, links: {$elemMatch: {_id: req.body.linkId}}}, {
            $set: {
                'links.$.title': req.body.title,
                'links.$.link': req.body.link,
                'links.$.bg': req.body.bg,
                'links.$.text': req.body.text
            }
        }, {new: true})
        res.redirect('/edit')
    } catch(error) {
        next(error)
    }
}
exports.deleteLink = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                links: {
                    _id: req.body.linkID
                }
            }
        }, {new: true})
        res.redirect('/edit')
    } catch(error) {
        next(error)
    }
}
exports.displaySettingsGet = async (req, res) => {
    res.render('display_settings', {title: 'Display settings'});
}
exports.displaySettingsPost = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user._id, req.body, {new: true})
        res.redirect('/edit')
    } catch(error) {
        next(error)
    }
}
exports.accountPage = (req, res) => {
    res.render('account_main', {title: 'Account settings'})
}
exports.editEmailGet = (req, res) => {
    res.render('edit_email', {title: 'Edit email'})
}
exports.editUsernameGet = (req, res) => {
    res.render('edit_username', {title: 'Edit uasername'})
}
exports.editPasswordGet = (req, res) => {
    res.render('edit_password', {title: 'Edit password'})
}
exports.editEmailPost = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user._id, req.body, {new: true})
        res.redirect('/')
    } catch(error) {
        next(error)
    }
}
exports.editUsernamePost = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user._id, req.body, {new: true})
        res.redirect('/')
    } catch(error) {
        next(error)
    }
}
exports.editPasswordPost = async (req, res, next) => {
    try {
        if (req.body.confirmPass === req.body.newPass) {
            req.user.changePassword(req.body.oldPass, req.body.newPass, function(err) {
                if(err) {
                    console.log('error while registering', err);
                    res.render('edit_password', {error: err, title: 'Edit password'})
                    return
                }
                res.redirect('/')
            })
        } else {
            res.render('edit_password', {error: "Passwords do not match", title: 'Edit password'})
        }
    } catch(error) {
        next(error);
    }
} 
exports.deleteAccountGet = (req, res) => {
    res.render('delete_account', {title: 'Delete account'})
}
exports.deleteAccountLogin = Passport.authenticate('local', {
    failureRedirect: '/account/delete'
})
exports.deleteAccountPost = async (req, res) => {
    try {
        await User.findByIdAndRemove(req.user._id)
        res.redirect('/')
    } catch(error) {
        next(error)
    }
}
exports.userPage = async (req, res, next) => {
    try {
        const pageOwner = await User.findOne({username: req.params.username})
        res.render('user_page', {title: `${req.params.username}'s Chib Link`, pageOwner})
    } catch(error) {
        next(error)
    }
}