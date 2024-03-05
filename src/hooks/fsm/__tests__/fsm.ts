import { act, renderHook } from "@testing-library/react";
import useFSM from "../use-fsm";

describe("useFSM hook", () => {
    it("initial state and sample transition", () => {
        const { result } = renderHook(() =>
            useFSM({
                states: {
                    loggedIn: {
                        onEnter: (context) => {
                            return {
                                loginCount: context.loginCount + 1,
                            };
                        },
                        onExit: (context) => {
                            return {
                                ...context,
                                logoutCount: context.logoutCount + 1,
                            };
                        },
                    },
                    loggedOut: {},
                },
                events: {
                    login: {
                        loggedOut: {
                            target: "loggedIn",
                        },
                    },
                    logout: {
                        loggedIn: {
                            target: "loggedOut",
                        },
                    },
                    noevent: {},
                },
                context: {
                    loginCount: 0,
                    logoutCount: 0,
                },
                initialState: "loggedOut",
            })
        );
        expect(result.current[0].currentState).toEqual("loggedOut");
        act(() => {
            result.current[1]("login");
        });
        expect(result.current[0].currentState).toEqual("loggedIn");
        act(() => {
            result.current[1]("logout");
        });
        expect(result.current[0].currentState).toEqual("loggedOut");
        act(() => {
            expect(() => {
                result.current[1]("nosuchtransition");
            }).toThrow();
        });
        act(() => {
            expect(() => {
                result.current[1]("noevent");
            }).toThrow();
        });
    });

    it("context awareness. initiate a counter and change its value with a transition", () => {
        const { result } = renderHook(() =>
            useFSM({
                states: {
                    counting: {},
                },
                events: {
                    increase: {
                        counting: {
                            target: "counting",
                            action: (context) => {
                                return {
                                    ...context,
                                    count: context!.count + 1,
                                };
                            },
                        },
                    },
                    decrease: {
                        counting: {
                            target: "counting",
                            action: (context) => {
                                return {
                                    ...context,
                                    count: context!.count - 1,
                                };
                            },
                        },
                    },
                },
                context: { count: 0 },
                initialState: "counting",
            })
        );
        expect(result.current[0].currentState).toEqual("counting");
        act(() => {
            result.current[1]("increase");
        });
        act(() => {
            result.current[1]("increase");
        });
        act(() => {
            result.current[1]("decrease");
        });
        expect(result.current[0].context.count).toEqual(1);
    });
});
