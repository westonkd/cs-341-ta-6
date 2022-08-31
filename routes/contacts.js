const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');

const {
  createValidator,
  showValidator,
  updateValidator,
  destroyValidator
} = require('../validators/contactsValidator');
const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll);

router.get('/:id', ...showValidator(param), contactsController.getSingle);

router.post('/', ...createValidator(body), contactsController.createContact);

router.put('/:id', ...updateValidator(body), contactsController.updateContact);

router.delete('/:id', ...destroyValidator(param), contactsController.deleteContact);

module.exports = router;
