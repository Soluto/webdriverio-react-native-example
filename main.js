import React, { Component } from 'react';
import {TextInput, View, NativeModules} from 'react-native';
import styled from 'styled-components/native';

const DeviceIdProvider = NativeModules.DeviceIdProvider

export default class PerfectoExample extends Component {
  constructor() {
      super();
      this.state = {deviceId: null}
  }

  componentDidMount() {
      DeviceIdProvider.get().then((deviceId => this.setState({deviceId})));
  }

  render() {
    return (
      <View>
        <Container>
            <InputText        
                  placeholder={"Waiting for Device ID"}                        
                  value={this.state.deviceId}                  
                  testID={"device-id"} accessible={true} accessibilityLabel={"device-id"}
                  underlineColorAndroid='transparent'
            />
        </Container>
      </View>
    );
  }
}

const Container = styled.View`
    margin-top:100;
    flex-direction: row;
    padding: 10;
`;

const InputText = styled.TextInput`
    height: 40;
    flex: 75;
`;