"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = flattenNodes;
function flattenNodes(root) {
  var flattenedNodes = [];

  function recurse(name, node) {
    if (node.children) {
      node.children.forEach(function (child) {
        return recurse(node.name, child);
      });
    } else {
      flattenedNodes.push({ packageName: name, className: node.name, size: node.size });
    }
  }
  recurse(null, root);

  return { children: flattenedNodes };
}