/* eslint-disable react-native/no-inline-styles */

import React, {useContext, useEffect} from 'react';
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,  ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useDispatch } from 'react-redux';

import { Navbar } from '../../Navbar';
import { Datas } from '../../Context/Context';
import HomeData from './HomeData.json';
import { updateuser } from '../../Redux/Actions';

export const Components = (props) => {
    const { navigation } = props;
    const {setnumber, userid} = useContext(Datas);
    const dispatch = useDispatch();

    const completed = 1;
    const name = 'Overall_Basics';
    const Basic = HomeData.filter(obj => obj.id < 21);
    const Android = HomeData.filter(obj => (obj.id > 20) && (obj.id < 23));
    const IOS = HomeData.filter(obj => obj.id > 22);



    useEffect(()=>{
      console.log('Dispatching Action : {1}');
       dispatch(updateuser(userid, completed, name));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Navbar navigation={navigation}/>
            <View style={{flex:1}}>
                <ScrollView >
                  <Text style={styles.heading }>{`Core 
Components 
and APIs`}</Text>
                  <Text style={{fontSize:18, margin:9, marginLeft:20 }}>
                    React Native provides a number of built-in Core Components ready for you to use in your app.
                    You can find them all in the left sidebar (or menu above, if you are on a narrow screen).
                    If you're not sure where to get started, take a look at the following categories:
                  </Text>

                  <Text style={[styles.heading,{marginLeft:0}] }> Basic Components :</Text>

                    <View style={{backgroundColor:'#f2f2f2', margin:25, marginBottom:20}}>
                    <Text style={{fontSize:18, margin:9, marginLeft:20 }}>Most apps will end up using one of these basic components.</Text>
                    { Basic.map((obj, index)=> (
                      <TouchableOpacity key={index} onPress={()=> { setnumber(obj.id); navigation.navigate('Comp1');}}>
                        <View style={styles.cardstyle}>
                          <View style={styles.innercard1}><Text style={styles.innertext1}>{obj.title}</Text></View>
                          <View style={styles.innercard2}><Text style={styles.innertext2}>{obj.desc}</Text></View>
                        </View>
                      </TouchableOpacity>
                  )) }

                   </View>

                 <Text style={[styles.heading,{marginLeft:0}] }> Android Components :</Text>

                  <View style={{backgroundColor:'#f2f2f2', margin:25, marginBottom:20}}>
                    <Text style={{fontSize:18, margin:9, marginLeft:20 }}>Many of the following components provide wrappers for commonly used Android classes.</Text>
                    { Android.map((obj, index)=> (
                      <TouchableOpacity key={index} onPress={()=> { setnumber(obj.id); navigation.navigate('Comp1');}}>
                        <View style={styles.cardstyle}>
                          <View style={styles.innercard1}><Text style={styles.innertext1}>{obj.title}</Text></View>
                          <View style={styles.innercard2}><Text style={styles.innertext2}>{obj.desc}</Text></View>
                        </View>
                      </TouchableOpacity>
                  )) }
                  </View>

                  <Text style={[styles.heading,{marginLeft:0}] }> iOS Components :</Text>

                  <View style={{backgroundColor:'#f2f2f2', margin:25, marginBottom:100}}>
                    <Text style={{fontSize:18, margin:9, marginLeft:20 }}>Many of the following components provide wrappers for commonly used UIKit classes.</Text>
                    { IOS.map((obj, index)=> (
                      <TouchableOpacity key={index} onPress={()=> { setnumber(obj.id); navigation.navigate('Comp1');}}>
                        <View style={styles.cardstyle}>
                          <View style={styles.innercard1}><Text style={styles.innertext1}>{obj.title}</Text></View>
                          <View style={styles.innercard2}><Text style={styles.innertext2}>{obj.desc}</Text></View>
                        </View>
                      </TouchableOpacity>
                  )) }
                  </View>

                </ScrollView>
            </View>

      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    // top:35
  },
  heading:{
    color:'black',
    fontSize:35,
    fontWeight:'bold',
    marginLeft:15,
    marginBottom:10,
    marginTop:20,
    lineHeight:50,
  },
  cardstyle:{
    padding:20,
    backgroundColor:'#f2f2f2',
  },
  innercard1:{
    backgroundColor:'#61dafb',
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
  },
  innertext1:{
    color:'white',
    fontSize:20,
    margin:10,
  },
  innertext2:{
    fontSize:12,
    margin:10,
  },
  innercard2:{
    backgroundColor:'white',
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
  },
});
