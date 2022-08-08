const error= require('../errors/error')
const Swal = require("sweetalert2")

const isLoggedIn = (req, res,next) => {
    if(req.isAuthenticated()) return next()
    console.log(Swal)
   
res.redirect('back')

}
const notLoggedIn = (req, res, next) => {
if(!req.isAuthenticated()) return next()
res.redirect('back')
}




const authorizeRoles = (...role) => {
    return (req, res, next) => {
      if (!role.includes(req.user.role)) throw new UnauthorizedError('Unauthorized to access this route');
      
      next();


    };
  };

module.exports = {
    isLoggedIn, notLoggedIn, authorizeRoles
}