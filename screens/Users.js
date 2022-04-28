import { View, SafeAreaView, ScrollView, Text, Pressable } from 'react-native';
import React,{useState,useEffect,useRef} from 'react';
import StyleSheet from '../styles/Styles';
import { firebase, USERS,DISCUSSIONS } from '../firebase/Config';
import { getUser } from '../helpers/Functions';

export default function Users({ navigation }) {
  const [users, setUsers] = useState([]);
  const user = useRef(null);

  useEffect(() => {
    (async() => {
      user.current = await getUser();
      firebase.firestore().collection(USERS).get().then(querySnapshot => {
        const tempUsers = [];
        querySnapshot.forEach(documentSnapshot => {
          // Logged in user is not listed to the users (there is no point to sent message to yourself).
          if (user.current.email !== documentSnapshot.id) {
            // Merge email (key) to user object.
            const user = {...documentSnapshot.data(),"email" : documentSnapshot.id};
            //setUsers(users => [...users,user]);
            tempUsers.push(user);
          }
        });
        setUsers(tempUsers);
      });
      })();   
  }, [])
  

  const toMessages = (to) => {
    navigation.navigate('Messages',{
      title: to.nickname,
      showBack: true,
      backRoute: 'Home',
      toEmail: to.email,
      discussion_id: 0
    })
  }

  /* const saveDiscussion =  (to) => {
    //TODO: Etsi, onko tämän vastaanottajan kanssa jo aloitettu keskustelu.
    try {
      firebase.firestore().collection(DISCUSSIONS)
      .add({
        lastEntry: firebase.firestore.FieldValue.serverTimestamp(),
        participants: [
          to.email,
          user.current.email
        ],
        //to: to.nickname
      }).then((doc) => {
        navigation.navigate('Messages',{
          title: to.nickname,
          showBack: true,
          backRoute: 'Home',
          //fromNickname: user.current.nickname,
          //toNickname: to.nickname,
          toEmail: to.email,
          //nickname: to.nickname,
          discussion_id: doc.id
        })
      })
    } catch (err) {
      console.log('Adding new discussion failed',err);
    }
  }

 */
  return (
    <SafeAreaView style={StyleSheet.container}>
      <ScrollView>
        {users.map((to)=> (
          <Pressable key={to.email} onPress={() => {toMessages(to)}}>
            <View style={StyleSheet.userRowContainer}>
              <Text style={StyleSheet.userRowText}>{to.nickname}</Text>
            </View>
          </Pressable>
      ))}
      </ScrollView>
    </SafeAreaView>
  )
}