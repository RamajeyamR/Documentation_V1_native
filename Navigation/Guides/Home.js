/* eslint-disable react-native/no-inline-styles */
import React,{ useContext, useEffect, useState } from 'react';
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,  ScrollView, Dimensions, Image, TouchableHighlight, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch } from 'react-redux';

import { Navbar } from '../../Navbar';
import { Datas } from '../../Context/Context';
import { updateuser } from '../../Redux/Actions';


export const Guides = (props) => {

    const { navigation } = props;
    const { userid } = useContext(Datas);
    const dispatch = useDispatch();

    const view1height = ( Math.round(Dimensions.get('screen').height) / 3);
    const view1width = ( Math.round(Dimensions.get('screen').width) - 25);

    const [intro, setIntro] = useState(10);

    const name = 'Intro';
    const name2 = 'Overall_Basics';
    const overall = 0;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( ()=>{ dispatch(updateuser(userid, intro, name)); },[]);

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
      const paddingToBottom = 30;
      return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Navbar navigation={navigation}/>
            <View style={{flex:1}}>
                <ScrollView

                  onScroll={({nativeEvent})=>{
                    if (isCloseToBottom(nativeEvent)){
                      setIntro(100, dispatch(updateuser(userid, intro, name)) );
                      dispatch(updateuser(userid, overall, name2 ));

                    }
                    }}
                >
                  <Text style={{ color:'black', fontSize:50, fontWeight:'bold', marginLeft:15, marginBottom:20, marginTop:20 }}>Introduction</Text>

                  <View style={{ height: view1height , width:view1width, backgroundColor:'#54c7ec', alignSelf:'center', flexDirection:'row'}}>
                    <View style={{flex:0.7, alignSelf:'center', alignItems:'center'}}>
                      <Text style={{fontSize:18, paddingLeft:7 }}>Welcome to the very start of your React Native journey!
                        If you're looking for environment setup instructions, they've moved to their own section.
                          Continue reading for an introduction to the documentation, Native Components, React, and more!
                      </Text>
                    </View>
                    <View style={{flex:0.4, alignSelf:'center'}}>
                      <Image style={{height:150, width:150}} source={require('./Images/image1.png')} />
                    </View>
                  </View>

                  <Text style={{ color:'black', fontSize:50, fontWeight:'bold', marginLeft:15, marginTop:20, marginBottom:20 }}>Interactive examples</Text>

                  <Text style={{fontSize:18, margin:15}}>This introduction lets you get started immediately
                    in your browser with interactive examples like this one :</Text>

                      <View style={{height:500, margin:20 , flexDirection:'row', marginBottom:20 }}>
                      <WebView
                        source={{ uri: 'https://snack.expo.dev/@ramajeyam/hello-world' }}
                        style={{marginTop:0 }}
                      />
                      </View>
                    <Text style={{fontSize:18, margin:15, marginBottom:20}}>The above is a Snack Player. It’s a handy tool created by Expo to embed and run React Native projects and share how they render in platforms like Android and iOS.
                       The code is live and editable, so you can play directly with it in your browser. Go ahead and try changing the "Try editing me!" text above to "Hello, world!"</Text>

                       <TouchableHighlight
                        style={styles.learn_btn}
                        onPress={()=>navigation.navigate('Components')}
                        >
                        <Text style={{ color:'#61dafb', fontSize: 20}}>{'Learn Basics >'}</Text>
                      </TouchableHighlight>
                </ScrollView>


            </View>

      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // top:35
  },
  learn_btn:{
    width: '90%',
    height: 50,
    alignSelf:'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#222222',
    marginBottom:100,

  },
});
