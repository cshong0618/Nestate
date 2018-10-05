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

class Nestate {
    constructor() {
        this.states = {};
        this.actions = {};
    }

    addState(key, value, 
        options = {
            callbackFn: (val)=>{}, 
            validFn: (val)=>true
        }) {
        var state = new State(key, value);
        state.callback = options.callbackFn;
        state.valid = options.validFn;

        if(key in this.states) {
            throw new Error("State already exists. Use updateState to change the state");
        } else {
            this.states[key] = state;
        }
    }

    updateState(key, updatedValue) {
        if (key in this.states) {
            this.states[key].value = updatedValue;
        } else {
            throw new Error("State does not exist.");
        }
    }

    setStateCallback(key, callbackFn) {
        if (key in this.states) {
            this.states[key].callback = callbackFn;
        } else {
            throw new Error("State does not exist.");
        }
    }

    setStateValidFunction(key, validFn) {
        if (key in this.states) {
            this.states[key].valid = validFn;
        } else {
            throw new Error("State does not exist.");
        }
    }

    getState(key) {
        if (key in this.states) {
            return this.states[key].value;
        } else {
            throw new Error("State does not exist.");
        }
    }

    addAction(key, fn, dependsOn=[], options={}) {
        if(dependsOn.length === 0) {
            throw new Error("Action must depend on State.")
        }

        if (key in this.actions) {
            throw new Error("Action already exists.");
        }

        var action = new Action(fn);
        dependsOn
            .filter(key => key in this.states)
            .forEach(key => action.addParent(this.states[key]));

        if(Object.keys(options).length > 0) {
            if("type" in options) {
                action.compareBy(options.type);
            }
        }

        this.actions[key] = action;
    }
}

module.exports = Nestate;