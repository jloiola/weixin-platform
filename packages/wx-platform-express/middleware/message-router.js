const {debug, error} = require('ulog')('wx-platform-secure:message-router');

/**
 * Message Router for Weixin event handling
 */
class MessageRouter {
  /**
   * @param {array} routeDefintions
   */
  constructor(routeDefintions=[]) {
    this.routes = routeDefintions;
    debug(`routeDefinitions=${JSON.stringify(routeDefintions)}`);
    return this.middleware;
  }

  /**
   *
   * @param {object} message - event 'message'
   * @return {object} - the first matched route
   */
  match(message) {
    return this.routes.find((route) => (
      this.matcher(route.filter, message)
    ));
  }
  /**
   *
   * @param {object} routeFilter - route configuration object
   * @param {object} message - event message
   * @return {object} - an event message that matches all filter properties
   */
  matcher(routeFilter, message) {
    return Object.keys(routeFilter).every( (key) => {
      const filter = routeFilter[key];
      const property = message[key];

      if (typeof filter === 'string') {
        return filter === property;
      } else if (typeof filter === 'object') {
        return filter.test(property);
      } else if (typeof filter === 'function') {
        return filter(property, message);
      } else {
        // catch all oops? need to log
        return null;
      }
    });
  }
  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {func} next
   * @return {*} web handler or throws ??
   */
  middleware(req, res, next) {
    const matchedRoute = this.match(req.body);
    if (matchedRoute) {
      debug(`matchedRoute=${JSON.stringify(matchedRoute)}`);
      return matchedRoute.handler(req, res, req.isEncrypted /* TODO: will be removed */);
    } else {
      error('no matched routes');
      return next(new Error('no routes matched'));
    }
  }
};

module.exports = MessageRouter;
