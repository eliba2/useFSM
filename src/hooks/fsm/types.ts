export type FSM_STATE<C> = {
    onEnter?: (context: C, param?: any) => object | void;
    onExit?: (context: C, param?: any) => object | void;
};

export type FSM_TRANSITION<T extends StateMap<C>, C> = {
    target: keyof T;
    action?: (context?: C, param?: any) => object | void;
};

export type FSM_TRANSITIONS<
    T extends StateMap<C>,
    E extends string,
    C
> = Record<E, Partial<Record<keyof T | "*", FSM_TRANSITION<T, C>>>>;

export type StateMap<C> = {
    [key: string]: FSM_STATE<C>;
}

export type InitFSM<
    T extends StateMap<C>,
    E extends string,
    C extends object
> = {
    states: T;
    events: FSM_TRANSITIONS<T, E, C>;
    initialState: keyof T;
    context?: C;
};
