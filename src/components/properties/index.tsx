import React from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Properties, Property } from "../../../server/models/types";
import { Divider } from "primereact/divider";
import { Message } from "primereact/message";
import useFSM from "../../hooks/fsm/use-fsm";

enum FetchUrls {
    Properties = "/properties",
    BadProperties = "/badproperties",
}

const PropertiesComponent: React.FC = () => {
    const [properties, setProperties] = React.useState<Property[]>([]);
    const [error, setError] = React.useState<string>("");
    const [ignore, setIgnore] = React.useState(false);
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

    React.useEffect(() => {
        setIgnore(false);
        return () => {
            console.log("setting ignore");
            setIgnore(true);
        };
    }, []);

    const fetchProperties = (url: FetchUrls) => {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("can't get houses");
                }
                return response.json();
            })
            .then((json) => {
                if (!ignore) {
                    setProperties(json as unknown as Properties);
                    setFstate("done", json);
                }
            })
            .catch((e) => {
                setFstate("error", e.message);
            });
    };

    return (
        <div>
            <Button
                label="Fetch"
                onClick={() => setFstate("fetch", FetchUrls.Properties)}
            />
            <Button
                label="FetchError"
                onClick={() => setFstate("fetch", FetchUrls.BadProperties)}
            />
            <Divider />
            {error && <Message severity="error" text={error} />}
            <DataTable value={properties}>
                <Column field="city" header="City"></Column>
                <Column field="address" header="Address"></Column>
                <Column field="rooms" header="Rooms"></Column>
                <Column field="price" header="Price"></Column>
            </DataTable>
        </div>
    );
};

export default PropertiesComponent;
