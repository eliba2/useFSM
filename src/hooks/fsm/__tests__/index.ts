import { act, renderHook } from "@testing-library/react";
import useFSM from "../use-fsm";

describe("useFSM hook", () => {
    it("initial state and sample transition", () => {
        const { result } = renderHook(() =>
            useFSM({
                states: {
                    loggedIn: {},
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
    });
});
