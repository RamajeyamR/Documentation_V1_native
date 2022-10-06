import React, {useContext, useEffect} from "react"
import { View, Text, StyleSheet, Linking, TouchableOpacity, ActivityIndicator } from "react-native"
import { useDispatch } from "react-redux"
import WebView from "react-native-webview"

import Data from './Item2data.json'
import Data1 from '../Item1/Item1data.json'
import { Datas } from "../../../../Context/Context"
import { updateuser } from "../../../../Redux/Actions"

export const Item2 = () => {

  const { number, userid} = useContext(Datas)
  const dispatch = useDispatch()

  const temp = Data.filter(obj => obj.id === number )
  const temp1 = Data1.filter(obj => obj.id === number )
  const name1 = temp1.map(obj => obj.name)
  const percent = 60
  const name = name1.toString()

 useEffect(()=>{
  console.log(`Dispatching Action : ${name}`)
   dispatch(updateuser(userid, percent, name))
},[])

  const loading = () => {
    return(
      <ActivityIndicator  
        size="large" 
        color="#61dafb"
        style={{flex:0.5, justifyContent: 'center', alignItems:"center"}} 
      
      />
    )
  }
    return(
      
      <View style={styles.container1}>
        {temp.map((obj, index) => (
          <React.Fragment key={obj.id}>
            <Text  style={{color:"white", fontSize:20, marginBottom:10}}>{obj.name}</Text>
            <View style={styles.container2}>
              <WebView
                    source={{ uri: obj.link }}
                    renderLoading={loading}
                    startInLoadingState={true}
                  />
            </View>
            
            <View style={styles.container3}>
              <TouchableOpacity onPress={()=>Linking.openURL(obj.link)} >
                <Text style={{color:"black", fontSize:20}}>Try Out Example</Text>
              </TouchableOpacity>
            </View>
          </React.Fragment>
        ))}
        
      </View>

    )
  }

  const styles = StyleSheet.create({
    container1 : {
      height: 550,
      backgroundColor: '#333333', 
      margin:5, 
      borderRadius:20, 
      padding:20,
      
    },
    container2: { 
      flex:1, 
      backgroundColor:"white", 
      borderRadius:15, 
      borderColor:"#61dafb",
      borderWidth:4
  },
  container3:{
    height:50, 
    width: "90%", 
    alignSelf:"center" ,
    backgroundColor:"#61dafb", 
    marginTop:15, 
    alignItems:"center", 
    justifyContent:"center"
  }
  });