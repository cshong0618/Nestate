const assert = require("assert");

class State {
    
    constructor(key, value) {
        this._key = key;
        this._value = value;

        this._fn = () => {};
        this._validFn = () => true;
    }

    set value(val) {
        this._value = val;

        if (this._validFn(this._value)) {
            this._fn(this._value);
        }
    }

    get value() {
        return this._value;
    }

    set key(key) {
        this._key = key;
    }

    get key() {
        return this._key;
    }

    set callback(fn) {
        this._fn = fn;
    }

    set valid(validFn) {
        this._validFn = validFn;
    }

    get valid() {
        return this._validFn();
    }
}

class StateGraphNode {
    constructor (state) {

        // May return null
        // Only take in valid states for now
        var argtype = state.__proto__.constructor.name;
        var _state = (() => {
            if(argtype === "State") {
                return state;
            } else {
                return null;
            }
        })();

        this.root = {
            parent: null,
            state: _state,
            next: null
        };
    }
    
    add(state) {
        var child = new StateGraphNode(state);
        child.addParent(this.root);

        if(this.root.state) {
            this.root.next = child;
        } else {
            this.root.state = child;
        }
    }

    addParent(state) {
        this.root.parent = state;
    }
}

class Nestate {
    constructor() {

    }


}

module.exports = {
    State: State,
    StateGraphNode: StateGraphNode,
    Nestate: Nestate
};