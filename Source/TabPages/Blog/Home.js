
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,  ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Navbar } from '../../Navbar';
import WebView from 'react-native-webview';

export const Blog = (props) => {
    const { navigation } = props
    const loading = () => {
      return(
        <ActivityIndicator  
          size="large" 
          color="#61dafb"
          style={{flex: 1, justifyContent: 'center'}} 
        
        />
      )
    }

    return(
        <View style={styles.container}>
            <StatusBar style="auto" />
            {/* <Navbar navigation={navigation}/> */}
            <TouchableOpacity
             onPress={()=>navigation.navigate("Home")}
             style={{borderColor:"black", borderWidth:2, width:100, height:30, backgroundColor:"#61dafb"}}
            >
              <Text style={{marginLeft:10, color:"black", fontSize:18, fontWeight:'bold'}}>{`<< Home`}</Text>
            </TouchableOpacity>
            <View style={{flex:1}}>

                  <WebView 
                    source={{ uri: 'https://reactnative.dev/blog' }} 
                    style={{ marginTop: 20 }} 
                    renderLoading={loading}
                    startInLoadingState={true}
                
                  />
                  
            </View>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#333333',
    top:35
  },
});
