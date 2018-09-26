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
}

class StateGraphNode {
    constructor (state) {

        // May return null
        // Only take in valid states for now
        
        var _state = (() => {
            if(typeof(state) === "State") {
                return state;
            } else {
                return null;
            }
        })();

        this.root = {
            state: _state,
            next: null
        };
    }
    
    add(state) {
        var child = new StateGraphNode(state);

        if(this.root.state) {
            this.root.next = child;
        } else {
            this.root.state = child;
        }
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