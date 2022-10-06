import React from 'react';
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, StatusBar  } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';



export const Navbar = ({navigation}) => {

    return (
        <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.navbar}>
          <Ionicons
            name="ios-menu"
            size={36}
            color="white"
            onPress={() => navigation.toggleDrawer()}
          />
          <TouchableWithoutFeedback
            onPress={()=> {navigation.closeDrawer(); navigation.navigate('Home');}}
          >
            <View style={styles.navbar}>
              <Image style={{height:35, width:35}} resizeMode="cover" source={require('../Images/logo.png')}/>
              <Text style={styles.headertext}>React Native</Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.searchicon}>
            <Ionicons
                name="search"
                size={26}
                onPress={() => navigation.navigate('Search')}
            />
          </View>
          <View style={styles.logout}>
          <Ionicons
                  name="person-circle-outline"
                  size={35}
                  color="white"
                  onPress={() => navigation.navigate('User')}
              />
          </View>

        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex:0.08,
  },
  headertext:{
    color:'white',
    fontSize:20,
    left:5,
    fontWeight:'bold',
  },
  navbar:{
    flex:1,
    flexDirection:'row',
    backgroundColor:'#20232a',
    width:'auto',
    alignItems:'center',
    paddingLeft:10,
  },
  searchicon:{
    width:35,
    height:30,
    backgroundColor:'white',
    marginLeft:100,
    alignItems:'center',
    borderRadius:7,

  },
  logout:{
    color:'white',
    marginLeft:15,
    marginRight:5,
  },
});
