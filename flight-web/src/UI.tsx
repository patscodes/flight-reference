import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useTransition, animated } from "react-spring";
import axios from 'axios';
import { GAME_WIDTH, API_CREATE_URL } from "./config";


interface IUIProps {
  showUi: boolean;
  orderID: string;
  airline: string;
}

function calculateLeftOffset() {
  return window.innerWidth / 2 - GAME_WIDTH / 2;
};

function UI({ showUi, orderID, airline }: IUIProps) {
  const [leftOffset, setLeftOffset] = useState(calculateLeftOffset());

  function handleResize() {
    setLeftOffset(calculateLeftOffset);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const transitions = useTransition(showUi, null, ({
    from: { marginTop: -100 },
    enter: { marginTop: 0 },
    leave: { marginTop: -100 },
  }));


  const createOrder = () => {
    console.log("Creating Order: " + orderID + "," + airline);
    return axios.post(API_CREATE_URL, {
      "Item": {
        "OrderId": orderID,
        "Airline": airline,
        "Status": "New"
      }
    })
      .then(response => {
        console.log("RESPONSE: " + response)
      })
      .catch(error => {
        console.log("ERROR: " + error)
      });
  };
  
  createOrder();

  return (
    <div>
      {/* Top */}
      <div>
        {transitions.map(({ item, key, props }) => item &&
          <animated.div
            key={key}
            style={{
              ...props,
              position: "absolute",
              width: GAME_WIDTH,
              height: 180,
              top: 0,
              backgroundColor: "#000000"
            }}>
              <div id="roboto">
                <p>
                  The Flight Reference Project is a starter project utilizing the following: 
                </p>
                <ul>
                  <li>Web Front-End: React Native Expo / Redux / Gifted Chat</li>
                  <li>Mobile Front-End: React / Redux / Typescript / Axios / Phaser</li>
                  <li>API Gateway: Mulesoft ESB, HTTP Listener, DataWeave, AWS S3, SQS, SNS, DynamoDB Connectors</li>
                </ul>
                Access the source code here: <a href="https://github.com/patscodes/flight-reference">Github</a>
              </div>
          </animated.div>
        )}
>
      </div>
    </div>
  );

  
}

const mapStateToProps = ({ showUi, orderID, airline }: { showUi: boolean, orderID: string, airline: string }) => ({
  showUi, orderID, airline
});

export default connect(mapStateToProps)(UI);





