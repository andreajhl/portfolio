/* Base on https://github.com/AlexGilleran/jsx-control-statements/blob/master/src/index.js */
var transformMaybe = require("./maybeStatement");

/**
 * This plugin transform <Maybe /> component in just a ternary operator.
 * It allows testing matchers to work properly.
 */
module.exports = function maybeStatementPlugin(babel) {
  var nodeHandlers = {
    Maybe: transformMaybe(babel),
  };

  var visitor = {
    JSXElement: function (path) {
      var nodeName = path.node.openingElement.name.name;
      var handler = nodeHandlers[nodeName];

      if (handler) {
        path.replaceWith(handler(path.node, path.hub.file));
      }
    },
  };

  return {
    visitor: visitor,
  };
};
