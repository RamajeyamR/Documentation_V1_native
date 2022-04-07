/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { Navbar } from '../../Navbar';
import { auth } from '../../firebase';

const Profile = () => {

    const navigation = useNavigation();
    const user = useSelector(state => state.userData);

    const name1 = user.map(obj => obj.name);
    const name = name1.toString();
    const email1 = user.map(obj => obj.email);
    const email = email1.toString();

    const handleSignOut = () => {
        auth
          .signOut()
          .then(() => navigation.navigate('Login'))
          .catch(error => Alert.alert(error.message));
      };

  return (
    <View style={styles.container1}>
        <StatusBar style="auto" />
        <Navbar navigation={navigation}/>
        <View style={{flex:1}}>
        <View style={styles.container2}>
            <Ionicons
                name="person-circle-outline"
                size={250}
                color="#20232a"
            />
        </View>
        <View style={styles.container3}>
            <View>
                <Text style={styles.text}>{name}</Text>
                <Text style={styles.text2}>{email}</Text>
            </View>
            <TouchableOpacity
                style={[styles.regisBtn,{backgroundColor:'#61dafb'}]}
                onPress={()=>Alert.alert(
                    'Please Wait for future Updates !',
                    "Current version Doesn't support This Feature",
                    [
                      {
                        text: 'Ok',
                        style: 'destructive',
                        onPress: () =>{},
                      },
                    ]
                    )}
            >
                  <Text style={[styles.loginText,{fontWeight:'normal'}]}>CHANGE PASSWORD</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.regisBtn,{backgroundColor:'#ff3333'}]}
                onPress={()=>handleSignOut()}
            >
                  <Text style={[styles.loginText,{color:'white', fontSize:20}]}>LOGOUT</Text>
              </TouchableOpacity>
        </View>
        </View>

    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
    container1:{
        flex:1,
        // top:35,
        backgroundColor:'#ffffff',
    },
    text:{
        color:'#00b8e6',
        fontSize:40,
        alignSelf:'center',
        marginBottom: 8,
        fontWeight:'bold',
    },
    text2:{
        color:'#20232a',
        fontSize:15,
        alignSelf:'center',
    },
    container2: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',

    },
    innercircle:{
        backgroundColor:'#61dafb',
        borderRadius: 50,
    },
    line : {
        flex:0.01,
        width : '90%',
        backgroundColor:'black',
        alignSelf:'center',
        borderRadius:5,
    },
    container3: {
        flex:1,
        width: '90%',
        backgroundColor:'#e6e6e6',
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        margin: 10,
        marginBottom: 90,
        borderRadius:30,
        borderColor:'#00e600',
        borderWidth:4,
    },
    regisBtn: {
        width: '70%',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        backgroundColor: '#9966ff',
        borderColor:'#000000',
        borderWidth:1,
      },

    loginText:{
        fontSize:15,
        fontWeight:'bold',
        color:'black',
      },
});
