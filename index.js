// trying to parse DOT files
/*
const DOTLexer = require('./lexer/DOTLexer.js');

console.log(DOTLexer);


window.DOTLexer = DOTLexer;
window.cluster = "digraph G {\n\n\tsubgraph cluster_0 {\n\t\tstyle=filled;\n\t\tcolor=lightgrey;\n\t\tnode [style=filled,color=white];\n\t\ta0 -> a1 -> a2 -> a3;\n\t\tlabel = \"process #1\";\n\t}\n\n\tsubgraph cluster_1 {\n\t\tnode [style=filled];\n\t\tb0 -> b1 -> b2 -> b3;\n\t\tlabel = \"process #2\";\n\t\tcolor=blue\n\t}\n\tstart -> a0;\n\tstart -> b0;\n\ta1 -> b3;\n\tb2 -> a3;\n\ta3 -> a0;\n\ta3 -> end;\n\tb3 -> end;\n\n\tstart [shape=Mdiamond];\n\tend [shape=Msquare];\n}";
*/

// playing w/ mobx-state tree
const { types, onSnapshot } = require('mobx-state-tree');

const Node = types.model("Node", {
  id: types.identifier,
  label: types.string,
  shape: types.enumeration("Shape", ["square", "circle"]),
  bg: types.string,
  fg: types.string,
}).actions(self => ({
  setForeground(fg) {
    self.fg = fg;
  },
  setBackground(bg) {
    self.bg = bg;
  }
}));

const Edge = types.model("Edge", {
  source: types.reference(Node),
  target: types.reference(Node),
  label: types.string,
});

const Store = types.model("Store", {
  nodes: types.array(Node),
  edges: types.array(Edge),
}).actions(self => ({
  addNode (label, bg = "#fff", fg = "#000") {
    self.nodes.push({ id: label, label, shape: "circle",  bg, fg });
  },
  addEdge (source, target, label) {
    self.edges.push({ source, target, label });
  },
}));

const store = Store.create({
  nodes: [
    { id: "A", label: "A", shape: "circle", bg: "#fff", fg: "#000" }
  ],
  edges: [
  ]
});

onSnapshot(store, snapshot => {
  console.dir(snapshot);
});

store.addNode("B");
store.addEdge(store.nodes[0].id, store.nodes[1].id, "goes to");
console.log(store.edges[0].source.label);









