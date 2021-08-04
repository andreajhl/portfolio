/* Base on https://github.com/AlexGilleran/jsx-control-statements/blob/master/src/ifStatement.js */
var astUtil = require("./util/ast");
var conditionalUtil = require("./util/conditional");
const orElseUtil = require("./util/orElse");

var ELEMENTS = {
  MAYBE: "Maybe",
};

function getBlocks(nodes, rootNode) {
  var result = {
    ifBlock: nodes,
    elseBlock: [],
  };
  const orElseExpression = orElseUtil.getOrElseExpression(rootNode);

  if (orElseExpression) {
    result.elseBlock.push(orElseExpression);
  }
  return result;
}

module.exports = function MaybeStatement(babel) {
  var types = babel.types;

  return function (node, file) {
    var ifBlock;
    var elseBlock;
    var errorInfos = { node: node, file: file, element: ELEMENTS.MAYBE };
    var condition = conditionalUtil.getConditionExpression(node, errorInfos);
    var key = astUtil.getKey(node);
    var children = astUtil.getChildren(types, node);
    var blocks = getBlocks(children, node);

    ifBlock = astUtil.getSanitizedExpressionForContent(
      types,
      blocks.ifBlock,
      key
    );
    elseBlock = astUtil.getSanitizedExpressionForContent(
      types,
      blocks.elseBlock,
      key
    );
    return types.ConditionalExpression(condition, ifBlock, elseBlock);
  };
};
