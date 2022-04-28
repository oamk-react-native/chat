import { View, ScrollView,Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import React,{useState,useEffect,useRef} from 'react';
import StyleSheet from '../styles/Styles';
import { firebase, DISCUSSIONS, MESSAGES } from '../firebase/Config';
import { getUser } from '../helpers/Functions';
import uuid from 'react-native-uuid';
import { convertFirebaseTimeStampToJS } from '../helpers/Functions';

/*
https://stackoverflow.com/questions/51846914/add-timestamp-in-firestore-documents
*/
export default function Messages({ route }) {
  const [ messages, setMessages ] = useState([]);
  const [ message,setMessage ] = useState('');
  const [discussion_id,setDiscussion_id] = useState(0);
  const user = useRef(null);

  const { id,toEmail } = route.params;

  useEffect(() => {

    if (id !==undefined ) {
      setDiscussion_id(id);
    }

    (async() => {
      user.current = await getUser();   
    })();
   
  /*     (async() => {
        user.current = await getUser();   
      
        subscriber = firebase.firestore()
        .collection(DISCUSSIONS)
        //.doc(discussion_id.current)
        .doc(discussion_id);
        .collection(MESSAGES)
        .orderBy('created','desc')
        .onSnapshot(querySnapshot => {
          const tempMessages = [];
          querySnapshot.forEach(documentSnapshot => {
            tempMessages.push(documentSnapshot.data());
          })
          setMessages(tempMessages);
        })
      })(); */
    //return() => subscriber();
  }, [])  

  useEffect(() => {
    if (discussion_id !== 0) { 
      const subscriber = firebase.firestore()
      .collection(DISCUSSIONS)
      //.doc(discussion_id.current)
      .doc(discussion_id)
      .collection(MESSAGES)
      .orderBy('created','desc')
      .onSnapshot(querySnapshot => {
        const tempMessages = [];
        querySnapshot.forEach(documentSnapshot => {
          tempMessages.push(documentSnapshot.data());
        })
        setMessages(tempMessages);
      })
    
      return() => subscriber();
    }
  }, [discussion_id])
  

  const save = async () => {
    let saveId;
    const now = firebase.firestore.FieldValue.serverTimestamp();

    if (discussion_id === 0) {
      saveId = await saveDiscussion(now);
    } else {
      saveId = discussion_id;

      firebase.firestore()
        .collection(DISCUSSIONS)
        .doc(saveId)
        .update({
          lastEntry: now,
        });
    }
    await saveMessage(saveId); 
    setDiscussion_id(saveId);
  }

  // TODO. transaktio.
  const saveMessage = async (saveId) => {
    const now = firebase.firestore.FieldValue.serverTimestamp();
    try {
      await firebase.firestore().collection(DISCUSSIONS).doc(saveId).collection(MESSAGES)
      .add({
        "by": user.current.email,
        //"to": toEmail,
        "created": now,
        "text": message
      })
      setMessage('');
    } catch (err) {
      console.log('Adding new message failed',err);
    }
  }

  const saveDiscussion =  async (now) => {
    try {
      const doc = await firebase.firestore().collection(DISCUSSIONS)
      .add({
        lastEntry: now,
        participants: [
          toEmail,
          user.current.email
        ],
      })
      return doc.id;
    } catch (err) {
      console.log('Adding new discussion failed',err);
    }
  }


  return (
    <View style={StyleSheet.container}>
      <ScrollView style={StyleSheet.messageContainer}>
        {messages.map((message)=> (
          <View key={uuid.v4()} style={StyleSheet.messageRow}> 
            <Text style={StyleSheet.messageText}>{message.text}</Text>
            <Text style={StyleSheet.messageTime}>{convertFirebaseTimeStampToJS(message.created)}</Text> 
          </View>
        ))}
      </ScrollView>
      <View style={StyleSheet.form}>
        <TextInput  
          label="Message"
          mode="outlined"
          style={StyleSheet.textInput}
          value={message}
          onChangeText={setMessage}
          returnKeyType='done'
          onSubmitEditing={() => save()}
        />
      </View>
    </View>
  )
}