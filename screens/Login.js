import { View,Pressable,Text } from 'react-native'
import { Headline, TextInput, Button } from 'react-native-paper';
import React,{useState} from 'react';
import { firebase, USERS } from '../firebase/Config';
import StyleSheet from '../styles/Styles';
import { setUser } from '../helpers/Functions';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('jouni.juntunen@oamk.fi');
  const [password, setPassword] = useState('test123');

  const login = async () => {
    try {
      if (email.trim()!=='') {
        if (password.trim()!=='') {
          await firebase.auth().signInWithEmailAndPassword(email,password);
          const currentUser = firebase.auth().currentUser;
          firebase.firestore().collection(USERS).doc(currentUser.email).get().then(documentSnapshot => {
            if (documentSnapshot.exists) {
              const nickname = documentSnapshot.data().nickname;
              const userJson = JSON.stringify({
                "email" : currentUser.email,
                "nickname" : nickname
              });
              setUser(userJson);
            }
          });
        
          navigation.navigate('Home');
        }
      }
    } catch (err) {
      console.log("Login failed. ",err.message);
    }
  }

  return (
    <>
      <View style={StyleSheet.container}>
        <View style={StyleSheet.form}>
          <Headline style={StyleSheet.headline}>Sign in</Headline>
          <TextInput  
            label="Email"
            mode="outlined"
            left={<TextInput.Icon name="email" />}
            style={StyleSheet.textInput}
            onChangeText={setEmail}
            value={email}
            keyboardType='email-address'
          />
          <TextInput  
            label="Password"
            mode="outlined"
            left={<TextInput.Icon name="lock" />}
            style={StyleSheet.textInput}
            value={password}
            onChangeText={setPassword}
          />
          <Button mode="contained" onPress={login} style={StyleSheet.button}>Login</Button>
          <View style={StyleSheet.signUp}>
            <Text style={StyleSheet.signUpText}>Do not have an account?</Text>
            <Pressable onPress={() => navigation.navigate('Registration')}>
              <Text style={[StyleSheet.signUpLink,StyleSheet.signUpText]}> Sign up</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  )
}