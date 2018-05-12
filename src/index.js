import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

const rehydrateNode = document.getElementById("rehydrate");
const rehydrateJson = JSON.parse(rehydrateNode.innerHTML);

console.log("rehydrateJson", rehydrateJson);

ReactDOM.render(
  <App content={rehydrateJson} />,
  document.getElementById("root")
);
