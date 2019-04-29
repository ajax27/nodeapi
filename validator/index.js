exports.createPostValidator = (req, res, next) => {
  req.check('title', 'Give it a Title!').notEmpty();
  req.check('title', 'Title must be between 4 and 150 characters').isLength({
    min: 4, max: 150
  });
  req.check('body', 'Give it an Article!').notEmpty()
  req.check('body', 'Article must be between 4 and 3000 characters').isLength({
    min: 4, max: 3000
  });
  // Error Check
  const errors = req.validationErrors()
  if (errors) {
    const firstError = errors.map(error => error.msg)[0]
    return res.status(400).json({ error: firstError })
  }
  next();
};

exports.userSignupValidator = (req, res, next) => {
  // name not null and between 4 and 30 chars
  req.check('name', "Name is required").notEmpty();
  // email is valid, not null and normalized
  req.check('email', "Email must be between 3 and 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Must be a valid Email")
    .isLength({ min: 4, max: 2000 })
  // check for password
  req.check("password", "Password is required!").notEmpty();
  req.check("password")
    .isLength({ min: 8 })
    .withMessage("Password must contain at least 8 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number")
  // Error Check
  const errors = req.validationErrors()
  if (errors) {
    const firstError = errors.map(error => error.msg)[0]
    return res.status(400).json({ error: firstError })
  }
  next();
};

// Reset Password Validator
exports.passwordResetValidator = (req, res, next) => {
  // check for password
  req.check("newPassword", "Password is Required!").notEmpty();
  req.check("newPassword")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/\d/)
    .withMessage("Password must contain at least one number");
  // Error Check
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};