import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        <View style={styles.circle}></View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>fulano123@gmail.com</Text>
        </View>
      </View>
      <View style={styles.horizontalLine}></View>
      <View style={styles.logoutContainer}>
        <Text style={styles.logoutText}>Sair</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 20,
  },
  circle: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#969595',
    opacity: 0.4,
  },
  textContainer: {
    marginLeft: 20,
  },
  name: {
    color: '#000',
    fontFamily: 'Poppins',
    fontSize: 1.5 * 16, 
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 1.5 * 16,
  },
  email: {
    color: '#969595',
    fontFamily: 'PoppinsL',
    fontSize: 0.875 * 16, 
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 0.875 * 16,
  },
  horizontalLine: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#969595',
    opacity: 0.4,
  },
  logoutContainer: {
    position: 'absolute',
    top: 110,
    left: 20,
  },
  logoutText: {
    color: '#000',
    fontFamily: 'PoppinsL',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 24,
  },
});

export default Profile;
