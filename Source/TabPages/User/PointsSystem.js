/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, FlatList, StatusBar } from 'react-native';
import React from 'react';
// import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import { useSelector } from 'react-redux';

import { Navbar } from '../../Navigations/Navbar';
import Data from '../Components/HomeData.json';


const MyProgress = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.userData);
  const filters = user.map(obj => obj.Datas.Basics);
  const names = Data.map(obj => obj.title);

  let object1;
  let array1 = [];
  let array2 = [];

  for (let keys in filters){
     object1 = filters[keys];

    for (let keys1 in object1){
      names.forEach(obj => {
        if (obj === keys1){
          array2 = [...array2, obj];
          array1 = [ {...array1[0] , [obj] : object1[keys1]} ];
        }

      });
   }
  }

  const topic = ({ item }) => {
    return (
      <>
      {
        array2.map((obj1, index) => (
          <View style={[styles.card]}  key={index}>
              <View >
                <Text style={[styles.cardText,{ color:'#61dafb', marginBottom:10}]}>{obj1} :</Text>
              </View>
              <View style={{flexDirection:'row'}}  >

                <View style={{alignSelf:'center'}}>
                  <Progress.Bar
                    progress={((item[obj1]) / 100)}
                    width={200}
                    color={item[obj1] === 30 ? '#ff0000' : (item[obj1] === 60 ? '#ff5c33' : (item[obj1] === 90 ? '#00cc66' : '#ffff') )  }
                  />
                </View>

                <View style={{alignSelf:'flex-end'}}>
                  <Text  style={[styles.cardText,{ marginLeft:30}]}>{item[obj1]} %</Text>
                </View>

              </View>
          </View>
        ))
      }
      </>
    );
  };

  return (
    <View style={styles.container1}>
      <StatusBar style="auto" />
      <Navbar navigation={navigation}/>
      <View style={{flex:1}}>
        <View style={styles.container2}>
          <Text style={styles.heading}>MY PROGRESS</Text>

          <FlatList
              data={array1}
              keyExtractor={(item, index) => index}
              renderItem={({ item, index }) => topic({ item, index })}
          />
        </View>
      </View>

    </View>
  );
};

export default MyProgress;

const styles = StyleSheet.create({
    container1:{
      flex:1,
      // top:38,
      backgroundColor:'black',
    },
    heading:{
      color:'black',
      fontSize:30,
      alignSelf:'center',
      marginTop:10,
      fontWeight:'bold',
    },
    container2:{
      flex:1,
      justifyContent:'center',
      borderWidth:4,
      borderColor:'#262626',
      margin:10,
      marginBottom:50,
      borderRadius:25,
      backgroundColor:'#61dafb',
      paddingBottom:10,
    },
    card1:{
      borderWidth:4,
      borderColor:'#ffff',
      padding:10,
      borderRadius:25,
      justifyContent:'center',
      margin:20,
      backgroundColor:'#333333',

    },
    h1:{
      color:'white',
      fontSize:20,
    },
    card:{
      flexDirection:'column',
      justifyContent:'space-between',
      paddingLeft:20,
      paddingRight:50,
      borderWidth:3,
      borderColor:'black',
      borderRadius:30,
      padding: 5,
      marginBottom: 5,
      marginTop:10,
      width:'90%',
      alignSelf:'center',
      backgroundColor:'#000000',
    },
    cardText :{
      fontWeight:'bold',
      fontSize:20,
      color:'white',
    },
});
