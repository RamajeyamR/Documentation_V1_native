/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Pressable, TouchableHighlight, StatusBar  } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Navbar } from '../../../Navbar';
import { Item1 } from './Item1/Item1';
import { Item2 } from './Item2/Item2';
import { Item3 } from './Item3/Item3';


export const Comp1 = (props) => {
    const { navigation } = props;
    const [page, setPage] = useState(0);

    return (
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Navbar navigation={navigation}/>
          <View style={{flex:0.06, width:50}}>
            <Pressable

                    onPress={()=> navigation.navigate('Components')}
                    >
                    <Ionicons name="arrow-back" size={40} color="white" />
                  </Pressable>
            </View>

            <View style={{flex:1, justifyContent:'center'}}>

                  { page === 0 ? <Item1/>
                    : (page === 1 ? <Item2/>
                      : (page === 2 ? <Item3/>
                        : null)) }

                <View style={{ flex:0.6,flexDirection:'row', margin:10,justifyContent:'space-between' }}>
                  {page === 0 ? null : <View >
                  <TouchableHighlight
                    style={{backgroundColor:'#333333', borderRadius:40 }}
                    onPress={()=>{page === 0 ? setPage(0) : setPage(page - 1);}}
                    underlayColor="#61dafb"
                    >
                    <Ionicons name="arrow-back" size={50} color="white" />
                  </TouchableHighlight>
                  </View>}
                  {page === 2 ? null : <View >
                  <TouchableHighlight
                    style={{backgroundColor:'#333333', borderRadius:40  }}
                    onPress={()=>{page === 2 ? setPage(2) : setPage(page + 1);}}
                    underlayColor="#61dafb"
                    >
                    <Ionicons name="arrow-forward" size={50} color="white"  />
                  </TouchableHighlight>
                  </View>}
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // top:35,
    backgroundColor: '#333333',
  },
  container2 : {
    height: 550,
    backgroundColor: '#333333',
    margin:20,
    borderRadius:20,
    padding:20,

  },
});
