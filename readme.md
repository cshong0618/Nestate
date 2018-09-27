# Nestate
A simple state observing mechanism that only fires when the stored value is compared to true.

## Components
### State
Contains a callback function that fires depending on the truthfulness of `validFn`. 

### Action
Contains a callback function that fires depending on the truthfulness of the parent state.

## Usage
### `var states = new Nestate()`
Creates a new group of `State` and `Action`.

---

### `Nestate.addState(key, value, options:{callbackFn?, validFn?})`
Adds a new state into the group. Throws new `Error` when the key already exists.

#### `key`
The key of the state

#### `value`
The value of the state

#### `options`
Contains `callbackFn` and `validFn`.
Defaults to:
```js
options = {
    callbackFn: (val)=>{}, 
    validFn: (val)=>true
}
```

##### `options.callbackFn`
The callback function when `validFn` returns `true`.

##### `options.validFn`
State validity check function.

---

### `Nestate.updateState(key, value)`
Updates the value of the state by the key. Throws new `Error` when key is not found.

---

### `Nestate.setStateCallback(key, callbackFn)`
To be developed.

---

### `Nestate.setStateValidFunction(key, validFn)`
To be developed.

---

### `Nestate.getState(key)`
Returns the value of the state by key. Throws new `Error` when key is not found.

---

### `Nestate.addAction(key, fn, dependsOn=[], options={})`
Adds a new action depeding on the `dependsOn` array of states.

#### options.type
`"AND"` or `"OR"`.
|Flag|Effect|
|---|---|
|`"AND"`|All parents' validity must be true to fire the action|
|`"OR"`|Only requires one of the parents' validity to be true to fire the action|

---