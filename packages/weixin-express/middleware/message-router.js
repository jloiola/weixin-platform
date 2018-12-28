const debug = require('debug');
class MessageRouter {
  constructor(routeDefintions=[]) {
    this.routes = routeDefintions;
    return this.middleware;
  }

  match(message) {
    return this.routes.find((route) => (
      this.matcher(route.filter, message)
    ));
  }

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

  middleware(req, res, next) {
    const matchedRoute = this.match(req.body);
    if(matchedRoute) {
      return matchedRoute.handler(req, res, req.isEncrypted /* TODO: will be removed */)
    } else {
      return next(new Error('no routes matched'))
    }
  }
};

module.exports = MessageRouter;
