/* eslint-disable react-native/no-inline-styles */

// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,  View, ActivityIndicator, StatusBar } from 'react-native';
import WebView from 'react-native-webview';

import { Navbar } from '../../Navbar';


export const Github = (props) => {

    const { navigation } = props;

    const loading = () => {
      return (
        <ActivityIndicator
          size="large"
          color="#61dafb"
          style={{flex: 1, justifyContent: 'center'}}

        />
      );
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Navbar navigation={navigation}/>
            <View style={{flex:1}}>

                  <WebView
                    source={{ uri: 'https://github.com/facebook/react-native' }}
                    style={{ marginTop: 0 }}
                    renderLoading={loading}
                    startInLoadingState={true}

                    />

            </View>

      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
    // top:35
  },
});
