/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Title, Caption, Drawer } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { auth } from './firebase';


 function DrawerContent(props) {

    const navigation = useNavigation();
    const user = useSelector(state => state.userData);

    const name1 = user.map(obj => obj.name);
    const name = name1.toString();
    const email1 = user.map(obj => obj.email);
    const email = email1.toString();


    const handleSignOut = () => {
        auth
          .signOut()
          .then(() => {props.navigation.closeDrawer(); navigation.navigate('Login');})
          .catch(error => Alert.alert(error.message));
      };


    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>

                <View style={styles.drawerContent}>
                    <Drawer.Section >
                    <View style={[styles.userInfoSection, {backgroundColor:'#bfbfbf'}]}>
                        <View style={{flexDirection:'row',marginTop: 15, marginBottom:15}}>
                            <Ionicons
                                name="person-circle-outline"
                                size={50}
                                color="white"
                                onPress={() => navigation.navigate('User')}
                            />

                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{name}</Title>
                                <Caption style={styles.caption}>{email}</Caption>
                            </View>
                        </View>
                    </View>
                    </Drawer.Section>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                             icon={({color, size}) => (
                                <Ionicons
                                    name="home"
                                    size={size}
                                    color={color}
                                    onPress={() => { props.navigation.closeDrawer(); navigation.navigate('Home'); }}
                                />
                            )}

                            label="Home"
                            onPress={() => { props.navigation.closeDrawer(); navigation.navigate('Home'); }}
                        />
                        <DrawerItem
                           icon={({color, size}) => (
                            <Ionicons
                                name="book"
                                size={size}
                                color={color}
                                onPress={() => { props.navigation.closeDrawer(); navigation.navigate('Guides'); }}
                            />
                        )}
                            label="Guides"
                            onPress={() => { props.navigation.closeDrawer(); navigation.navigate('Guides');}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Ionicons
                                    name="library"
                                    size={size}
                                    color={color}
                                    onPress={() => {props.navigation.closeDrawer(); navigation.navigate('Components'); }}
                                />
                            )}
                            label="Components"
                            onPress={() => {props.navigation.closeDrawer(); navigation.navigate('Components'); }}
                        />
                        {/* <DrawerItem
                            label="Api"
                            onPress={() => {navigation.navigate('Api')}}
                        />
                        <DrawerItem
                            label="Architecture"
                            onPress={() => {navigation.navigate('Architecture')}}
                        />
                        <DrawerItem
                            label="Blog"
                            onPress={() => {navigation.navigate('Blog')}}
                        /> */}
                        <DrawerItem
                            icon={({color, size}) => (
                                <Ionicons
                                    name="logo-github"
                                    size={size}
                                    color={color}
                                    onPress={() => {props.navigation.closeDrawer(); navigation.navigate('Github'); }}
                                />
                            )}
                            label="Github"
                            onPress={() => {props.navigation.closeDrawer(); navigation.navigate('Github'); }}
                        />

                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color, size}) => (
                        <Ionicons
                            name="log-out-outline"
                            size={size}
                            color={color}
                            onPress={() => handleSignOut()}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => handleSignOut()}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    drawerSection: {
      marginTop: 15,
      marginLeft:10,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });

  export default DrawerContent;
