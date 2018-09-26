var Nestate = require("./Nestate");

var s1 = new Nestate.State("number42", 10);
s1.callback = (val) => {
    console.log("State is true now");
}

s1.valid = (val) => {
    return val === 42;
}

console.log(s1);
s1.value = 42;
module.exports = Nestate;