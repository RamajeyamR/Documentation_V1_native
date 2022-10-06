import React, {useEffect, useContext} from 'react';
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Dimensions, TouchableHighlight, Alert, StatusBar  } from 'react-native';
import { useDispatch } from 'react-redux';

import { Navbar } from './Navigations/Navbar';
import { Datas } from './Context/Context';
import { auth, getData } from './firebase';
import { createData, initialize } from './Redux/Actions';


export const Home = (props) => {

    const { navigation } = props;
    const { trigger, setUserid, setAllusers } = useContext(Datas);

    const dispatch = useDispatch();

    // useEffect(()=>{
    //   const unsubscribe = auth.onAuthStateChanged(user => {
    //     if (user) {
    //       const getusers = (values) => {
    //         setAllusers(values);
    //         const useruid = auth.currentUser.uid;
    //         setUserid(useruid);
    //         console.log('Disaptching Initialize with ID : ', useruid);
    //         dispatch(initialize(values, useruid));
    //         dispatch(createData(useruid));
    //       };
    //       // getData(getusers);

    //     }
    //   });

    //   return unsubscribe;

    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[trigger]);

    React.useEffect(
      () => navigation.addListener('beforeRemove', (e) => {
          const action = e.data.action;
          e.preventDefault();
          Alert.alert(
            'Are You sure want to Logout !',
            '',
            [
              { text: 'Cancel', style: 'cancel', onPress: () => {} },
              {
                text: 'Logout',
                style: 'destructive',
                onPress: () => navigation.dispatch(action),
              },
            ]
          );
        }),[navigation] );

    return (
      <View style={styles.container}>

        <StatusBar style="auto" />
        <Navbar navigation={navigation}/>
        <View style={{flex:1, justifyContent: 'center', marginBottom: 75  }}>
                <Image style={{height:250, width: Dimensions.width, marginBottom: 25 }} resizeMode="cover" source={require('./Images/image1.png')}/>
                <Text style={{color:'white', fontSize:30, marginLeft: 20}}>Learn once, </Text>
                <Text style={{color:'white', fontSize:30, marginLeft: 20}}>write anywhere.</Text>
                <TouchableHighlight
                  style={styles.start_btn}
                  underlayColor="#f6affb"
                  onPress={()=>navigation.navigate('Guides')}
                  >
                  <Text>GET STARTED</Text>
                </TouchableHighlight>
        </View>
      </View>

    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222',

  },
  start_btn:{
    backgroundColor:'#61dafb',
    width: '90%',
    height: 50,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'center',
  },
  learn_btn:{
    width: '90%',
    height: 50,
    alignSelf:'center',
    alignItems: 'center',
    justifyContent: 'center',

  },
});
