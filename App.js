import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';
import AppContainer from './MainNavigation';
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <AppContainer />;
  }
}
