import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';


export default function MainScreen({ navigation }) {

    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/plantinhas.png')} 
          style={styles.image}
        />
        
        <View style={styles.content}>
          <Text style={styles.title}>Plant</Text>
          <Text style={styles.title}>Paradise</Text>
          <Text style={styles.subtitle}>
            Find your favorite plants and help the environment
          </Text>
        </View>
  
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              //navigation.navigate('AuthStackNavigation'); 
              navigation.navigate('SingIn'); 
            }}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // navigation.navigate('AuthStackNavigation'); 
              navigation.navigate('SingUp'); 
            }}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
  
        <StatusBar style="auto" />
      </View>
    );
    
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    image: {
      width: '100%',
      height: '52%',
      resizeMode: 'cover',
    },
    content: {
      flex: 1,
      paddingTop: 40,
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    title: {
      color: '#000',
    fontFamily: 'Poppins',
    fontSize: 3.125 * 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 3.125 * 16,
    textAlign: 'left',
    marginLeft: 15,
    },
    subtitle: {
      color: '#000',
      fontFamily: 'Poppins',
      fontSize: 1 * 16,
      fontStyle: 'normal',
      fontWeight: '200',
      lineHeight: 1.25 * 16,
      textAlign: 'left',
      marginTop: 10,
      marginLeft: 15,
    },
    buttonContainer: {
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'flex-end', 
      paddingHorizontal: 20,
      paddingVertical: 40,
      flex: 1,
    },
    button: {
      width: 20.3125 * 16,
      height: 3 * 16,
      flexShrink: 0,
      borderRadius: 0.5 * 16,
      backgroundColor: '#418B64',
      marginVertical: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontFamily: 'Poppins',
      textAlign: 'center',
      lineHeight: 3 * 16,
    },
  });
  