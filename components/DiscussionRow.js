import { View, Text, Pressable } from 'react-native';
import React,{useState,useEffect,useRef} from 'react';
import StyleSheet from '../styles/Styles';
import { firebase,DISCUSSIONS,MESSAGES,USERS } from '../firebase/Config';
import { convertFirebaseTimeStampToJS, getNickNameForEmail } from '../helpers/Functions';

export default function DiscussionRow({navigation, discussion_id,toEmail}) {
  const [message, setMessage] = useState(null);
  const nickname = useRef('');
  // This ref variable is used to get rid of warning related to catn perform state update on unmounted component.
  const isMounted = useRef(false);
  
  useEffect(() => {
    isMounted.current=true;
    (async() => {
      nickname.current = await getNickNameForEmail(toEmail);      
      firebase.firestore().collection(DISCUSSIONS).doc(discussion_id).collection(MESSAGES)
      .orderBy('created','desc')
      .limit(1)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
       
          //firebase.firestore().collection(USERS).doc(toEmail).get().then(userSnapshot => {   
          //  nickname.current = userSnapshot.data().nickname;
            
          if (isMounted.current) {
            setMessage({id: discussion_id,lastEntry: documentSnapshot.data().created,text: documentSnapshot.data().text,from: nickname.current});
          }
          //});
            
          
        });
      });
    })();
    return () => (isMounted.current = false);
  }, [])
  
  //if (message !== null) {
    return (
      <View style={StyleSheet.discussionContainer}>
        <Pressable onPress={() => {
          navigation.navigate('Messages',{
            id: discussion_id,
            showBack: true,
            backRoute: 'Home',
            toEmail: toEmail,
            title: nickname.current
          })
        }}>
          <View style={StyleSheet.discussionRow}>
            <Text style={StyleSheet.discussionFrom}>{message?.from}</Text>
            <Text style={StyleSheet.discussionTime}>{convertFirebaseTimeStampToJS(message?.lastEntry)}</Text>
          </View>
          <View>
            <Text>{message?.text}</Text>
          </View>
        </Pressable>
      </View>
    )
/*   } else {
    return <></>
  } */
}