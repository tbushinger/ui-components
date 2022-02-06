import React from "react";
import createPanelClient, { PanelClient } from "./extension-utils/panel-client";

export default function App(): any {
    const client: PanelClient = createPanelClient();

    console.log(client);

    return <h1>Hello from React</h1>;
}