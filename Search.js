/* eslint-disable react-native/no-inline-styles */
import React,{useState, useContext, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Modal, Center, NativeBaseProvider } from "native-base";
import Voice, { SpeechResultsEvent, SpeechErrorEvent} from '@react-native-voice/voice';


import Data from './Navigation/Components/HomeData.json';
import { Datas } from './Context/Context';


const Search = () => {
    const { setnumber } = useContext(Datas);
    const [search, setSearch] = useState();
    const [FilteredData, setFilteredData] = useState([]);
    const [result, setResult] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [results, setResults] = useState([]);
    const [isListening, setIsListening] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
      function onSpeechResults(e: SpeechResultsEvent) {
        setResults(e.value ?? [], console.log("results :", results));
      }
      function onSpeechError(e: SpeechErrorEvent) {
        // console.error("error is thrown",e);
        async function callthis() {
          try {
            console.log("Wltimate try", isListening)
            if (isListening) {
              console.log("inside try")
              // await Voice.stop()
              setIsListening(false, console.log("setIsListening False"));
              setShowModal(false, console.log("setShowModal false")); 
              // searchFilterFunction('');   
            } 
          
          } catch (e1) {
            console.error("error inside callthis",e1);
            setIsListening(false, console.log("setIsListening False"));
            setShowModal(false, console.log("setShowModal false")); 
          }
        }
        callthis();
      }
      Voice.onSpeechError = onSpeechError;
      Voice.onSpeechResults = onSpeechResults;
      return function cleanup() {
        Voice.destroy().then(Voice.removeAllListeners);
      };
    }, []);

    useEffect(()=>{
      async function voicesearch (){

        for(let datas in results){
          Data.map(obj => {
            obj.title.toUpperCase() === results[datas].toUpperCase() ? searchFilterFunction(results[datas]) : null
          
          })
        }

        setShowModal(false, console.log("setShowModal useeffect[results] false")); 
        try {
          if (isListening) {
            await Voice.stop();
            setIsListening(false, console.log("setIsListening useeffect[results] False"));
          }
        } catch (e) {
          console.error(e);
        }
      }
      voicesearch();
    },[results])

    async function toggleListening() {
      try {
        if (isListening) {
          await Voice.stop();
          setIsListening(false, console.log("setIsListening False"));
          setShowModal(false, console.log("setShowModal false")); 
        } else {
          setResults([]);
          await Voice.start('en-US');
          setShowModal(true, console.log("setShowModal True")); 
          setIsListening(true, console.log("setIsListening True"));
        }
      } catch (e) {
        console.error(e);
      }
    }

    

    const searchFilterFunction = (text) => {
      console.log("text :", text)
        if (text) {
          const newData = Data.filter( item => {
              const itemData = item.title ? item.title.toUpperCase()  : ''.toUpperCase();
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;
            }
          );
          setFilteredData(newData);
          setResult('');
          setSearch(text);
        } else {
          setFilteredData([]);
          setResult('No Results Found...');
          setSearch(text);
        }
      };

      const ItemView = ({item}) => {
        return (
          <TouchableOpacity  onPress={()=> { setnumber(item.id); navigation.navigate('Comp1');}}>
                <View style={styles.cardstyle}>
                    <View style={styles.innercard1}><Text style={styles.innertext1}>{item.title}</Text></View>
                    <View style={styles.innercard2}><Text style={styles.innertext2}>{item.desc}</Text></View>
                </View>
            </TouchableOpacity>

        );
      };

      const Modals = () => {
        
        return <Center>
            <Modal 
              isOpen={showModal}
              style={{ backgroundColor: "#f5f5dc99",}}
              >
              <Modal.Content maxWidth="400px">
                <Modal.Body>
                  <Ionicons
                    name="mic-outline"
                    size={50}
                    color="black"
                    style={{alignSelf:"center", padding:70,}}
                  />
                </Modal.Body>
              </Modal.Content>
            </Modal>
          </Center>
      };



  return (
    <NativeBaseProvider>
      <View style={styles.container1}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Search"
            value={search}
            placeholderTextColor="#20232a"
            onChangeText={(text) => searchFilterFunction(text)}
          />
          <Ionicons
            name="mic-outline"
            size={30}
            color="black"
            onPress={() => toggleListening()}
          />
        </View>
        <View style={{flex:1}}>
          <Center flex={1} >
            <Modals />
          </Center>
          {
            !result ? 
              <FlatList
                data={FilteredData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={ItemView}
              /> 
              : <Text>{result}</Text>
          }
        </View>
      </View>
    </NativeBaseProvider>
    
  );
};

export default Search;

const styles = StyleSheet.create({
    container1:{
        flex:1,
        backgroundColor:'#222222',
    },
    inputView: {
        top:35,
        backgroundColor: '#fff',
        borderRadius: 30,
        width: '80%',
        height: 45,
        marginBottom: 50,
        flexDirection:'row',
        alignItems: 'center',
        alignSelf:'center',
        padding:7,
      },

      TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
      },
      cardstyle:{
        padding:20,
      },
      innercard1:{
        backgroundColor:'#61dafb',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
      },
      innertext1:{
        color:'white',
        fontSize:20,
        margin:10,
      },
      innertext2:{
        fontSize:12,
        margin:10,
      },
      innercard2:{
        backgroundColor:'white',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
      },
});
