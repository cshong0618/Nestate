var Nestate = require("./Nestate");

var s1 = new Nestate.State("number42", 10);
s1.callback = (val) => {
    console.log("State is true now");
}

s1.valid = (val) => {
    return val === 42;
}

var s2 = new Nestate.State("number100", 20);
s2.callback = (val) => {console.log("State is true now")};
s2.valid = (val) => val === 100;

var graph = new Nestate.StateGraphNode(s1);
graph.add(s2);

console.log(graph);

var action = new Nestate.Action(() => {
    console.log("Both states are true");
});
action.compareBy("AND");
action.addParent(s1);
action.addParent(s2);
s1.value = 42;
s2.value = 100;

module.exports = Nestate;