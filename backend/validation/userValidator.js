const {validationResult,check} = require('express-validator')
 
exports.signupUserValidation = () => {
 return [
   check('name','Name must be between 5 to 30 letters').trim().isLength({ min: 5 , max: 30}),
   check('username','Username must be between 5 to 15 letters').trim().isLength({ min: 5 , max: 15}),
   check('email','Email should be valid').isEmail(),
   check("password","Password must be at least 8 characters").isLength({ min: 8 }),
   check('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) throw new Error('Confirmation Password Does not match');
      return true
  }),
 ]
}
 exports.signinUserValidation = () => {
  return [
    check('email','Email field should not be Empty and it should be valid').trim().notEmpty().isEmail(),
    check('password','Password filed should not be Empty').notEmpty(),
   ]
}
 
exports.validate = (req, res, next) => {
 const errors = validationResult(req)
 if (errors.isEmpty()) {
   return next()
 }
 const extractedErrors = []
 errors.array().map(err => extractedErrors.push(err.msg))
 
 return res.status(422).json({
   message: "request failed",
   errors: extractedErrors
 })
}