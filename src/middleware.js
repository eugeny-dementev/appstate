const appstate = require('./appstate');

module.exports = function configureMiddleware (params = {}) {
  const {
    services = {},
    logError = console.error,
    logSuccess = () => {},
  } = params;

  return function appstateMiddleware (store) {
    return (next) => function signalExecutor (actions, args, ...rest) {
      if (!Array.isArray(actions)) {
        return next(actions, args, ...rest);
      }

      const signal = appstate.create(actions);

      signal(store, services, args)
        .then(logSuccess)
        .catch(logError);
    };
  };
}
