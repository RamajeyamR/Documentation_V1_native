
import React,{useContext, useEffect} from "react"
import { View, Text, StyleSheet } from "react-native"
import { useDispatch } from "react-redux"

import Data from './Item1data.json'
import { Datas } from "../../../../Context/Context"
import { updateuser } from "../../../../Redux/Actions"


export const Item1 = () => {
    const { number, userid} = useContext(Datas)
    const dispatch = useDispatch()
    const temp = Data.filter(obj => obj.id === number );
    const name1 = temp.map(obj => obj.name);
    const percent = 30
    const name = name1.toString()

    useEffect(()=>{
      console.log(`Dispatching Action : ${name}`)
       dispatch(updateuser(userid, percent, name))
    },[])

    return(
      
      <View style={styles.container1}>
        {temp.map((obj, index) => (
            <React.Fragment key={index} >
                <Text style={{color:"#61dafb", fontSize:30, marginBottom:10}}>{obj.name}</Text>
                <View style={styles.container2}>
                 
                    <Text style={{color:"black", fontSize:20,}}>{obj.content}</Text>
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
    container2:{
      flex:1, 
      alignContent:"center",
      alignSelf:"center", 
      backgroundColor:"white", 
      padding:10, 
      borderRadius:15,  
      alignItems:"center", 
      justifyContent:"center",
      borderColor:"#61dafb",
      borderWidth:4
    }
  });