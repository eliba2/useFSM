import { FSM_TRANSITIONS, InitFSM, StateMap } from "./types";

class FSM<T extends StateMap<C>, E extends string, C extends object> {
    private states: T;
    private transitions: FSM_TRANSITIONS<T, E, C>;
    private currentState: keyof T;
    private context: C;

    constructor(props: InitFSM<T, E, C>) {
        this.states = props.states;
        this.transitions = props.events;
        this.currentState = props.initialState;
        this.context = props.context || ({} as C);
    }

    transition(eventName: E): void {
        const stateTransitions = this.transitions[eventName];

        if (!stateTransitions) {
            throw new Error(`No transitions defined for event '${eventName}'`);
        }

        const transition = stateTransitions[this.currentState];

        if (!transition) {
            throw new Error(`No valid transition found for event '${eventName}' from state '${String(this.currentState)}'`);
        }

        // Execute onExit action for current state
        const onExit = this.states[this.currentState].onExit;
        if (onExit) {
            const returnValue = onExit(this.context);
            if (returnValue) {
                this.context = returnValue as C;
            }
        }

        // Perform the transition action if any and update the context
        if (transition.action) {
            const returnValue = transition.action(this.context);
            if (returnValue) {
                this.context = returnValue as C;
            }
        }

        // Update the current state
        this.currentState = transition.target;

        // Execute onEnter action for the new state
        const onEnter = this.states[this.currentState].onEnter;
        if (onEnter) {
            const returnValue = onEnter(this.context);
            if (returnValue) {
                this.context = returnValue as C;
            }
        }

        console.log(
            `Transitioned to '${String(this.currentState)}' on event '${eventName}'`
        );
    }

    getState(): keyof T {
        return this.currentState;
    }

    getContext(): C {
        return this.context;
    }
}

export default FSM;
