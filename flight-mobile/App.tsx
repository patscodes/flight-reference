import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Example from './components/Example';
import { Provider } from 'react-redux'; 
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux'
import { MessagesReducer } from './store/MessagesReducer'; 

const store = createStore(MessagesReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <Example />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'red',
    borderWidth: 10
  },
});
