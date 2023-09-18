import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignIn() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (!email && !password) {
      alert("Digite algo");
      return;
    }
    navigation.navigate('AppTabNavigation');
  };

   const handleSignUp = ()=>{
    navigation.navigate('SingUp')
   }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>E-MAIL</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Type your e-mail address"
        />

        <Text style={styles.label}>PASSWORD</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Type your password"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSignIn}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={handleSignUp}
        >
          <Text style={styles.buttonText}>Don't have account? Register!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    alignItems: 'center', 
  },
  label: {
    color: '#969595',
    fontFamily: 'Poppins',
    fontSize: 0.9375 * 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 1 * 16,
    letterSpacing: 0.01875 * 16,
  },
  input: {
    width: 20.4375 * 16,
    height: 3 * 16,
    flexShrink: 0,
    borderRadius: 0.625 * 16,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#FFF',
    marginBottom: 16,
    paddingHorizontal: 8,
    fontSize: 0.9375 * 16,
    fontFamily: 'Poppins',
  },
  button: {
    width: 20.3125 * 16,
    height: 3 * 16,
    flexShrink: 0,
    borderRadius: 0.5 * 16,
    backgroundColor: '#418B64',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRegister: {
    width: 20.3125 * 16,
    marginTop: 14,
    height: 3 * 16,
    flexShrink: 0,
    borderRadius: 0.5 * 16,
    backgroundColor: '#418B64',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
