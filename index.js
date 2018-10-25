// trying to parse DOT files
/*
const DOTLexer = require('./lexer/DOTLexer.js');

console.log(DOTLexer);


window.DOTLexer = DOTLexer;
window.cluster = "digraph G {\n\n\tsubgraph cluster_0 {\n\t\tstyle=filled;\n\t\tcolor=lightgrey;\n\t\tnode [style=filled,color=white];\n\t\ta0 -> a1 -> a2 -> a3;\n\t\tlabel = \"process #1\";\n\t}\n\n\tsubgraph cluster_1 {\n\t\tnode [style=filled];\n\t\tb0 -> b1 -> b2 -> b3;\n\t\tlabel = \"process #2\";\n\t\tcolor=blue\n\t}\n\tstart -> a0;\n\tstart -> b0;\n\ta1 -> b3;\n\tb2 -> a3;\n\ta3 -> a0;\n\ta3 -> end;\n\tb3 -> end;\n\n\tstart [shape=Mdiamond];\n\tend [shape=Msquare];\n}";
*/

// playing w/ mobx-state tree
const { types, onSnapshot } = require('mobx-state-tree');


const NodeStyle = types.model("NodeStyle", {
  id: types.identifier,
  bg: types.string,
  fg: types.string,
});

const DEFAULTS = {
  nodeStyle: NodeStyle.create({
    id: "default",
    bg: "#fff",
    fg: "#000"
  }),
  nodeShape: "circle",
  edgeShape: "normal",
};

const Node = types.model("Node", {
  id: types.identifier,
  label: types.string,
  style: types.reference(NodeStyle),
  shape: types.enumeration("NodeShape", ["box", "polygon", "ellipse", "oval",
                                     "circle", "point", "egg", "triangle",
                                     "plaintext", "plain", "diamond", "trapezium",
                                     "parallelogram", "house", "pentagon", "hexagon",
                                     "septagon", "octagon", "doublecircle", "doubleoctagon",
                                     "tripleoctagon", "invtriangle", "invtrapezium", "invhouse",
                                     "Mdiamond", "Msquare", "Mcircle", "rect",
                                     "rectangle", "square", "star", "none",
                                     "underline", "cylinder", "note", "tab",
                                     "folder", "box3d", "component", "promoter",
                                     "cds", "terminator", "utr", "primersite",
                                     "restrictionsite", "fivepoverhang",
                                     "threepoverhang", "noverhang",
                                     "assembly", "signature", "insulator", "ribosite",
                                     "rnastab", "proteasesite", "proteinstab", "rpromoter",
                                     "rarrow", "larrow", "lpromoter"
                                    ]),

  //edgesFrom: types.map(types.reference(Edge)),
  //edgesTo: types.map(types.reference(Edge)),
}).actions(self => ({
  setStyle(style) {
    this.style = style;
  }
}));

const Edge = types.model("Edge", {
  id: types.identifier,
  source: types.reference(Node),
  target: types.reference(Node),
  label: types.string,
  shape: types.enumeration("EdgeShape", ["box", "crow", "diamond", "dot", "inv", "none", "normal", "tee", "vee", "curve"]),
});

const Store = types.model("Store", {
  nodes: types.map(Node),
  edges: types.map(Edge),
}).actions(self => ({
  addNode (id, label = id, style = DEFAULTS.nodeStyle, shape = DEFAULTS.nodeShape) {
    console.debug("addNode", id, label, style);
    self.nodes.put({ id, label, style, shape });
  },
  addEdge (source, target, label, shape = DEFAULTS.edgeShape) {
    console.debug("addEdge", id, source, target, label);
    const id = source.id + "->" + target.id;
    self.edges.put({ id, source, target, label, shape });
  },
}));

const store = Store.create({
  nodes: {},
  edges: {},
});

onSnapshot(store, snapshot => {
  console.dir(snapshot);
});

store.addNode("A");
store.addNode("B");
store.addEdge(store.nodes.get("B"), store.nodes.get("A"), "goes to");
store.addNode("B");










