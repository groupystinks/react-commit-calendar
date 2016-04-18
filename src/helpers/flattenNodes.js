export default function flattenNodes(root) {
  const flattenedNodes = [];

  function recurse(name, node) {
    if (node.children) {
      node.children.forEach(child => recurse(node.name, child));
    } else {
      flattenedNodes.push({ packageName: name, className: node.name, size: node.size });
    }
  }
  recurse(null, root);

  return { children: flattenedNodes };
}
