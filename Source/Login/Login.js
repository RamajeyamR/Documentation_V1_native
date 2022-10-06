import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator, Alert} from "react-native"
import React,{useEffect, useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Datas } from "../Context/Context";
import { auth, getData } from "../firebase";
import { createData, initialize } from "../Redux/Actions";
import { useDispatch } from "react-redux";


export const Login = () => {
    const { setpasserror, emailerror, passerror, trigger , setTrigger, setUserid, setAllusers} = React.useContext(Datas)

    const navigation = useNavigation();
    const dispatch = useDispatch();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, SetLoading] = useState(false)

    useEffect(() => {

      const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('LOGIN_INFO')
          if (jsonValue != null) {
            const LoginData = JSON.parse(jsonValue)
            console.log('LoginData =', LoginData)
            if (LoginData.isLoggedIn) {
              setUserid(LoginData.useruid);
              console.log('Disaptching Initialize with ID : ', LoginData.useruid);
              // setLoader(false)
            }else {
              // setLoader(false)
            }
          }
          else {
            // setLoader(false)
          }
        } catch(e) {
          // error reading value
        }
      }
      getData();

    },[]);

    const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('LOGIN_INFO', jsonValue)
      } catch (e) {
        // saving error
      }
    }

    const Navi = () => {
     
      const unsubscribe = auth.onAuthStateChanged(usered => {
        if (usered) {
          const getusers = (values) => {
            setAllusers(values);
            const useruid = auth.currentUser.uid;
            setUserid(useruid);
            console.log('Disaptching Initialize with ID : ', useruid);
            dispatch(initialize(values, useruid));
            dispatch(createData(useruid));
            storeData({isLoggedIn: true, useruid: useruid});
            navigation.navigate("Home");
          };
          getData(getusers);
        }
      })
  
      return unsubscribe()
    }

    
    const handleLogin = () => {
      SetLoading(true);
      auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
          SetLoading(false)
          setTrigger(!trigger)
          const user = userCredentials.user
          console.log('Logged in with:', user.email)
          setEmail("")
          setPassword("")
          setpasserror("") 
          Navi()
        })
        .catch(error => {
          SetLoading(false);
          if (error.code === 'auth/invalid-email') {
            setpasserror('Invalid-email !')
          }
      
          if (error.code === 'auth/user-not-found') {
            setpasserror('user-not-found ! Try Signup')
          }
          if (error.code === 'auth/wrong-password') {
            setpasserror('wrong-password')
          }
        })
    }


    
    return(
        <View style={styles.container}>
          {
            loading ? ( <ActivityIndicator  
              size="large" 
              color="#61dafb"
              style={{flex:1, justifyContent: 'center', alignItems:"center"}} 
          
            />) : (
            <>
              <Image style={styles.image} source={require("../Images/logo.png")} />
              <Text style={styles.header}>Welcome to React</Text>
          
            
              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Email"
                  value={email}
                  placeholderTextColor="#20232a"
                  onChangeText={(email) => setEmail(email)}
                />
                
              </View>
              {emailerror.length ?
                    <Text style={{color:"red", marginBottom: 10,}}>{emailerror}</Text> :  null
                  }
                  
          
              <View style={styles.inputView}>
                  <TextInput
                  style={styles.TextInput}
                  placeholder="Password"
                  value={password}
                  placeholderTextColor="#20232a"
                  secureTextEntry={true}
                  onChangeText={(password) => setPassword(password)}
                  />
                  
              </View>
              {passerror.length ?
                    <Text style={{color:"red", marginBottom: 10,}}>{passerror}</Text> :  null
                  }
          
              <TouchableOpacity
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
                  <Text style={styles.forgot_button}>Forgot Password?</Text>
              </TouchableOpacity>
          
              <TouchableOpacity style={styles.loginBtn} onPress={()=>handleLogin()}>
                  <Text style={styles.loginText}>LOGIN</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.regisBtn} onPress={()=>navigation.navigate("Register")}>
                  <Text style={[styles.loginText,{color:"white"}]}>SIGNUP</Text>
              </TouchableOpacity>
            </>
            )
          }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#20232a",
      alignItems: "center",
      justifyContent: "center",
    },
   
    image: {
    },
   
    inputView: {
      backgroundColor: "#fff",
      width: "70%",
      height: 45,
      marginBottom: 20,
    },
   
    TextInput: {
      height: 50,
      flex: 1,
      padding: 10,
    },
   
    forgot_button: {
      height: 30,
      marginBottom: 30,
      color:"white"
    },
   
    loginBtn: {
      width: "80%",
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "#61dafb",
    },
    header:{
      height: 30,
      marginBottom: 30,
      color:"white",
      fontSize:23
    },
    regisBtn: {
      width: "80%",
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      borderColor:"#61dafb",
      borderWidth:4
    },
    loginText:{
      fontSize:20,
      fontWeight:"bold"
    }
  });

