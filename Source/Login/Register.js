/* eslint-disable react-native/no-inline-styles */
import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { Datas } from '../Context/Context';
import { auth, getData } from '../firebase';
import { add_user, initialize } from '../Redux/Actions';

const Register = () => {

  const { setUserid ,setpasserror,  passerror, trigger , setTrigger} = React.useContext(Datas);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [user , setUser ] = useState([]);
    const [loading, SetLoading] = useState(false);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const getusers = (users) => setUser(users);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{ dispatch(initialize(user)); },[user]);

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(user2 => {
          if (user2) {
            navigation.navigate('Home');
            setEmail('');
            setPassword('');
            getData(getusers);


          }
          else {navigation.navigate('Register');}
        });

        return unsubscribe;

      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    const handleSignUp = () => {
      SetLoading(true);
        auth
          .createUserWithEmailAndPassword(email, password )
          .then(userCredentials => {
            SetLoading(false);
            const user1 = userCredentials.user;
            const useruid = auth.currentUser.uid;
            dispatch(add_user(useruid, name, email));
            setUserid(useruid);
            setTrigger(!trigger);
            setpasserror('');
            console.log('Registered with:', user1.email);
          })
          .catch(error => {
            SetLoading(false);
            if (error.code === 'auth/email-already-in-use') {
              setpasserror('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
              setpasserror('That email address is invalid!');
            }
            if (error.code === 'auth/weak-password') {
              setpasserror('weak-password');
            }

          });
      };

  return (
    <View style={styles.container1}>
      {
            loading ? ( <ActivityIndicator
              size="large"
              color="#61dafb"
              style={{flex:1, justifyContent: 'center', alignItems:'center'}}

            />) : (
            <>
        <StatusBar style="auto" />
        <Text style={styles.header}>Register</Text>


        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Name"
            placeholderTextColor="#20232a"
            onChangeText={(name1) => setName(name1)}
          />

        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#20232a"
            onChangeText={(email1) => setEmail(email1)}
          />

        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#20232a"
            secureTextEntry
            onChangeText={(password1) => setPassword(password1)}
          />

        </View>
        {passerror.length ?
                   <Text style={{color:'red', marginBottom: 10}}>{passerror}</Text> :  null
                }
        <TouchableOpacity style={styles.loginBtn} onPress={()=>handleSignUp()}>
                <Text style={styles.loginText}>SIGNUP</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>navigation.navigate('Login')}>
                <Text style={styles.forgot_button}>Back to Login Page</Text>
            </TouchableOpacity>
             </>
             )
           }
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
    container1:{
      flex:1,
      // top:38,
      backgroundColor:'#20232a',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header:{
      height: 30,
      marginBottom: 30,
      color:'white',
      fontSize:23,

    },
    inputView:{
        backgroundColor: '#fff',
          width: '70%',
          height: 45,
          marginBottom: 20,

    },
    TextInput:{
        height: 50,
        flex: 1,
        padding: 10,

    },
    loginBtn: {
        width: '70%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom:20,
        backgroundColor: '#61dafb',
      },
      loginText:{
        fontSize:20,
        fontWeight:'bold',
      },
      forgot_button: {
        height: 30,
        marginBottom: 30,
        color:'white',
      },
});
