import { View, Pressable } from 'react-native'
import { Headline, TextInput, Text,Button } from 'react-native-paper';
import React,{useState} from 'react';
import StyleSheet from '../styles/Styles';
import { firebase, USERS } from '../firebase/Config';


export default function Registration({ navigation }) {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registration = async () => {
    try {
      if (nickname.trim() !== '') {
        if (email.trim()!=='') {
          if (password.trim()!=='') {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            const currentUser = firebase.auth().currentUser;
            firebase.firestore().collection(USERS)
            .doc(currentUser.email)
            .set({
              nickname: nickname
            })
            navigation.navigate('Login');
          }
        }
      }
    } catch (err) {
      console.log('Registration failed',err);
    }
  }

  return (
    <View style={StyleSheet.container}>
      <View style={StyleSheet.form}>
        <Headline style={StyleSheet.headline}>Sign up</Headline>
        <TextInput  
          label="Nickname"
          mode="outlined"
          left={<TextInput.Icon name="account" />}
          style={StyleSheet.textInput}
          value={nickname}
          onChangeText={setNickname}
        />
        <TextInput  
          label="Email"
          mode="outlined"
          left={<TextInput.Icon name="email" />}
          style={StyleSheet.textInput}
          value={email}
          onChangeText={setEmail}
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
        <Button mode="contained" onPress={registration} style={StyleSheet.button}>Submit</Button>
        <View style={StyleSheet.signUp}>
            <Text style={StyleSheet.signUpText}>Already have an account?</Text>
            <Pressable onPress={() => navigation.navigate('Registration')}>
              <Text style={[StyleSheet.signUpLink,StyleSheet.signUpText]}> Sign in</Text>
            </Pressable>
          </View>   
      </View>
    </View>
  )
}