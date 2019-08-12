import * as React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { Message, GET_ORDER } from '../store/Types'
import { connect } from 'react-redux';
import axios from 'axios';
const apiUrl = "http://10.0.3.2:8080/retrieve?orderID=";

interface Props {
    onSendMessage;
}

interface State {
    messages: [ 
        Message
    ],
};


export class Example extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            messages: [
                {
                    _id: 1,
                    text: 'Welcome to Flight Mobile App! Enter Order ID.',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'Administrator',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
            ],
        };
        
  }


  handleSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    } as State))
    this.props.onSendMessage(messages);
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.handleSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }
}

function mapStateToProps(state) {
    return { messages: state.messages };
} 

const mapDispatchToProps = dispatch => {
    return {
      onSendMessage: (messages: Message[]) => dispatch(fetchGithubData(messages[0].text))
    };
  }; 

  export const fetchGithubData = (orderID) => {
    return (dispatch) => {
      return axios.get(apiUrl + orderID)
        .then(
          response => {
          dispatch(fetchData(response))
        })
        .catch(error => {
          throw(error);
        });
    };
  };
  
  
  export const fetchData = (response) => {  
    var object = response.data;
    console.log(object);
    alert("Airline is: " + object["Airline"]);
  };
  

export default connect(mapStateToProps, mapDispatchToProps)(Example); 



  