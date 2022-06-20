const User = require('./../models/User');

module.exports = (req, res, next) => {
    User.findOne({ _id: req.user.id }).then((user, err) => {
        if(user.role === 'admin'){
            next();
        }else{
            res.status(403).json({
                errors: { 
                    global: 'You are unauthorized for this action',
                    error: err
                }
            })
        }
    }).catch(error => {
        res.status(500).json({
            msg: "Server Error",
            error
        })
    })
  };