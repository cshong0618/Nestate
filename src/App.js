var Nestate = require("./Nestate");

var machine = new Nestate();

machine.addState("mustbe42", 10, {
    callbackFn: (val) => console.log(`Conditional is hit. ${val}`),
    validFn: (val) => val === 42
});

machine.addState("mustbe100", 10, {
    callbackFn: (val) => console.log(`Conditional is hit. ${val}`),
    validFn: (val) => val === 100
});

machine.addAction("fire_when_42_and_100", (val) => {
    console.log("State 'mustbe42' and 'mustbe100' are hit")
}, ["mustbe42", "mustbe100"]);

machine.updateState("mustbe42", 42);
machine.updateState("mustbe100", 100);

module.exports = Nestate;