import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
      <DndProvider backend={HTML5Backend}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </DndProvider>
  </React.StrictMode>,
  document.getElementById("root")
);