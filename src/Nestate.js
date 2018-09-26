const assert = require("assert");

class State {
    
    constructor(key, value) {
        this._key = key;
        this._value = value;

        this._fn = () => {};
        this._graphFn = () => {};
        this._validFn = () => true;
    }

    set value(val) {
        this._value = val;

        if (this._validFn(this._value)) {
            this._fn(this._value);
            this._graphFn(this._value);
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
        return this._validFn(this._value);
    }
}

class Action {
    constructor (fn) {
        this.TYPES = {
            AND: (_parents) => {
                return !_parents.some(val => val.valid === false);
            },
            OR: (_parents) => {
                return _parents.some(val => val.valid === true);
            },
        };

        // Use callback else no-op;
        this._compare = this.TYPES["AND"];
        
        this._fn = fn;
        this._parents = [];
        this._next = null;

        this.callback = () => {
            if(this._compare(this._parents)) {
                this._fn();
            }
        }
    }

    addParent(state) {
        state._graphFn = this.callback;
        this._parents.push(state);
    }

    get execute() {
        return this._fn;
    }

    compareBy(type) {
        this._compare = this.TYPES[type] || this.TYPES["AND"];
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

        _state._graphFn = (value) => {
            this._callback(value);
        };

        this.root = {
            parent: [],
            state: _state,
            next: null
        };

        this._callback = (value) => {

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
        this.root.parent.push(state);
    }
}

class Nestate {
    constructor() {

    }


}

module.exports = {
    Action: Action,
    State: State,
    StateGraphNode: StateGraphNode,
    Nestate: Nestate
};