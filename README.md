# useFSM

[Finite State Machine](https://en.wikipedia.org/wiki/Finite-state_machine) as a custom React hook.

## Quick Start

Use **npm start** to start the demo app. The app contains a client and a server components demostrating the usage of the effect.
The *useEffect* hook is available at **/src/hooks/fsm**. A typical usage is

```javascript
    import { useFSM } from "use-fsm";
    const [state, dispatch] = useFSM({
        states: {
            ...
        },
        events: {
            ...
        },
        context: {
            ...
        }
        initialState: "..."
    });
```

## Usage

### Setup

The *useFSM* hook receives a configuration object as its first argument which contains **states**, **events** *(=transitions)*, **context** and an **initial state**. The configuration object fully describes the state of the application.

**States**

All the possible states of the application. States are defined as an object with the keys representing the state name and the value if an object which optionally contains **lifecycle methods**, *onEnter* and *onExit*.
```javascript
    states: {
        one: {
            onExit: () => console.log("Exited one"),
        },
        two: {
            onEnter: () => console.log("Entered two"),
        },
        ...
    },
```

**Events**

Events represent the possible transitions between states. They are defined as an object with the keys representing the event name and the values are an object with a key representing the *source* state and the value is an object represnting the *target* state and a possible **action** method.

```javascript
    events: {
        next: {
            one: {
                target: "two"
            },
            two: {
                target: "one",
                action: () => console.log("Action on two"),
            }
        ...
```

It is possible to catch an event firing from all states by using the `*` wildcard:

```javascript
    events: {
        reset: {
            "*": {
                target: "one"
            }
        }
    }
```

Note that an attempt to transit to an unknown state will throw an error.


**Context**

Context is used for extended state, enabling to store and access an additional state in the state machine itself.

```javascript
    context: {
        name: 'John Doe',
        age: 30
    }
```

The context is available in both the **onExit**/**onEnter**/**action** methods where it is passed as the first argument. You might mutate it either by *returning a new* object or by *altering the existing object* itself.


**Initial State**

As the name suggests, it is the initial state of the FSM.

```javascript
    initialState: "one"
```

**Return Values**

The *useFSM* hook returns an array with (1) an object containing the **current state** and **context** (2) a function that can be used to **transition** to a new state.

```javascript
    const [state, transition] = useFSM({
        states: {
            one: {},
        },
        context: {
            name: 'John Doe',
        }
        initialState: "one",
    });

    console.log(state.currentState);
    console.log(state.context);
```


## Examples

### A Traffic Light 

Here's a basic example of a traffic light which changes color based on the state of the FSM. It does not use a context, and the transitions are setup outside of the FSM.

```javascript
    const [state, transition] = useFSM({
        states: {
            red: {},
            yellow: {},
            green: {},
            blinkingGreen: {},
        },
        events: {
            next: {
                red: { target: "yellow" },
                yellow: { target: "green" },
                green: { target: "red" },
            },
        },
        initialState: "red",
    });
```

In this case, the traffic light starts at a "red" state. This can be verified by using the returned *state* object.
```javascript
    console.log(state.currentState);
```
Which should output `"red"`.

When the "next" event is triggered, the FSM transits to the next state.

```javascript
    transition("next");
```

Quering the state should now output `"yellow"`.



### A Counter

Next is an example which uses an *extended* state to store a counter. The counter is incremented/decremented via transitions.

```javascript
    const [state, transition] = useFSM({
        states: {
            counting: {},
        },
        events: {
            increase: {
                counting: {
                    target: "counting",
                    action: (context) => {
                        return { ...context, count: context && context.count + 1 };
                    },
                },
            },
            decrease: {
                counting: {
                    target: "counting",
                    action: (context) => {
                        return { ...context, count: context && context.count - 1 };
                    },
                },
            },
        },
        context: { count: 0 },
        initialState: "counting",
    });
```

In this example the counter value is fully managed inside the FSM. The transition `action` is used to increment/decrement the counter; it receive two parameters: the *context* and an optional parameter that was passed when a transition was called.

The counter value can be accessed by using the returned `state` object:

```javascript
    console.log(state.context.count);
```

### Fetching Data Example

In this example we use the `useFSM` hook to fetch data from an API. 


```javascript
    const [properties, setProperties] = React.useState<Property[]>([]);
    const [fstate, setFstate] = useFSM({
        states: {
            idle: {},
            fetching: {
                onEnter: (_c, url) => {
                    setProperties([]);
                    fetchProperties(url);
                },
            },
            done: {
                onEnter: (_c, data) => {
                    setProperties(data);
                },
            },
            error: {
                onExit: () => {
                    setError("");
                },
                onEnter: (_c, err) => {
                    if (err) {
                        setError(err);
                    }
                },
            },
        },
        events: {
            fetch: {
                "*": {
                    target: "fetching",
                },
                fetching: {
                    target: "fetching",
                    action: () => {
                        console.log("already fetching");
                    },
                },
            },
            error: {
                "*": {
                    target: "error",
                },
            },
            done: {
                "*": {
                    target: "done",
                },
            },
        },
        initialState: "idle",
    });

```

This example uses the  `onEnter` and `onExit` lifecycle methods: Similar to the `action` methods, it receives two parameters: the *context* and an optional parameter that was passed when a transition was called. 

Note the usage of the `*` wildcard in the `events` object. This is a *catch-all* event that can be triggered from any state.


## Roadmap

- a Context hook
- Visualization
- Plugins [history, logs]


