const devErrorHandler = (error, res) => res.status(400).json({ error: error.message });
const productionErrorHandler = (error, res) =>
  res.status(400).json({ message: 'an error occurred while processing your request' });

const handler = () => {
  if (process.env.NODE_ENV === 'production') return productionErrorHandler;

  return devErrorHandler;
};

const wrapAction = (action, errorHandler) => async (req, res) => {
  try {
    return await action(req, res);
  } catch (error) {
    errorHandler(error, res);
  }
};

// wrap all actions in the actionsObject in an error handler
const wrapActions = (actionsObject) =>
  Object.fromEntries(Object.entries(actionsObject).map(([k, v]) => [k, wrapAction(v, handler())]));

module.exports = { wrapActions };
