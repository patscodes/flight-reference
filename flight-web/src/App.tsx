import React, { Component } from "react";
import Game from "./Game";
import UI from "./UI";
import { Provider } from "react-redux";
import { Button } from 'react-bootstrap';

import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div
          style={{
            display: "flex",
            alignContent: "left",
            justifyContent: "left",
            flexDirection: "row",
            height: "100vh"
          }}
        >
          <UI />
          <Game />
        </div>
        
        <input type="text" id="orderID"/>
        <select id="airline">
        </select>
        <Button id="btnSend" variant="success" name="btnSend" block>
          Send
        </Button>
      </Provider>
    );
  }
}

export default App;
