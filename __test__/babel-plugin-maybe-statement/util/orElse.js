var astUtil = require("./ast");
const ATTRIBUTES = { OR_ELSE: "orElse" };

module.exports.getOrElseExpression = function (node, errorInfos = {}) {
  var orElse = astUtil.getAttributeMap(node)[ATTRIBUTES.OR_ELSE];

  if (orElse) {
    return astUtil.getExpression(orElse);
  }
};
