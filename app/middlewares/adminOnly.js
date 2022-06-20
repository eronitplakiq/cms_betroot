module.exports = (req, res, next) => {
    
    if(req.user.role === 'admin'){
        next();
    }else{
        res.status(403).json({
            errors: { 
                global: 'You are unauthorized for this action',
                error: err
            }
        })
    }
  };