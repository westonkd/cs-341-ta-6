const { validationResult } = require('express-validator');

const errorHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

const createValidator = (body) => [
  body('firstName').isAlpha(),
  body('lastName').isAlpha(),
  body('email').isEmail(),
  body('favoriteColor').isAlpha(),
  body('birthday').isDate(),
  errorHandler
];

const updateValidator = (body) => [
  body('firstName').exists().isAlpha(),
  body('lastName').exists().isAlpha(),
  body('email').exists().isEmail(),
  body('favoriteColor').exists().isAlpha(),
  body('birthday').exists().isDate(),
  errorHandler
];

const requiredIDValidator = (param) => [param('id').isAlphanumeric(), errorHandler];

module.exports = {
  createValidator,
  updateValidator,
  showValidator: requiredIDValidator,
  destroyValidator: requiredIDValidator
};
