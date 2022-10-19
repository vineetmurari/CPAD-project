import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class Prescription extends Component {
  render() {
    return (
      <WebView
        source={{
          uri: 'http://192.168.1.8:3100'
        }}
        style={{ marginTop: 20 }}
      />
    );
  }
}

export default Prescription;