const {validationResult,check } = require('express-validator')
 
exports.createBlogValidation = () => {
 return [
  check('blogHeadline','Headline must have atleast 5 letters').trim().isLength({ min: 5 }),
  check('blogDescription','description  must have atleast 10 letters').trim().isLength({ min: 5 })
 ]
}
 
exports.updateBlogValidation = () => {
  return [
   check('blogHeadline','Headline must have atleast 5 letters').trim().if(check('blogHeadline').exists()).isLength({ min: 5 }),
   check('blogDescription','description  must have atleast 10 letters').trim().if(check('blogDescription').exists()).isLength({ min: 5})
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