import { ScrollView, SafeAreaView } from 'react-native';
import React,{useState,useEffect,useRef} from 'react';
import StyleSheet from '../styles/Styles';
import { FAB } from 'react-native-paper';
import { firebase, DISCUSSIONS ,USERS} from '../firebase/Config';
import { getUser } from '../helpers/Functions';
import DiscussionRow from '../components/DiscussionRow';
import uuid from 'react-native-uuid';

export default function Home({ navigation }) {
  const [discussions, setDiscussions] = useState([]);
  const user = useRef(null);

  useEffect(() => {
    let subscriber;
    (async() => {
      user.current = await getUser();

      // Retrieve discussions that user has participated.
      subscriber = firebase.firestore()
        .collection(DISCUSSIONS)
        .where('participants','array-contains-any',[user.current.email]) // Add groups later?
        .orderBy('lastEntry','desc')
        .onSnapshot(querySnapshot => {
          const tempDiscussions = [];
          querySnapshot.forEach(documentSnapshot => {
            console.log(documentSnapshot);
            let toEmail = '';
            // Get message receiver email.
            if (documentSnapshot.data().participants[0] === user.current.email) {
              toEmail = documentSnapshot.data().participants[1];
            } else {
              toEmail = documentSnapshot.data().participants[0];
            }

            const discussion = {...documentSnapshot.data(),"id" : documentSnapshot.id,"toEmail": toEmail};
            tempDiscussions.push(discussion);
            setDiscussions(discussions => [...discussions,discussion]);
            
   /*          firebase.firestore().collection(USERS).doc(userEmail).get().then(userSnapshot => {
              
              if (userSnapshpt.exists) {
             
                const discussion = {...documentSnapshot.data(),"id" : documentSnapshot.id, "from" : userSnapshpt.data().nickname};
                //tempDiscussions.push(discussion);
                //console.log(tempDiscussions);
                setDiscussions(discussions => [...discussions,discussion]);
              }
            }); */
          
    
          })

          setDiscussions(tempDiscussions);




          /* querySnapshot.forEach(discussionSnapshot => {
            firebase.firestore()
              .collection(DISCUSSIONS).doc(discussionSnapshot.id).collection(MESSAGES)
              .orderBy('created','desc')
              .limit(1)
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(messageSnapshot => {
                  if (messageSnapshot.exists) {
                    const discussion = {id: discussionSnapshot.id,lastEntry: discussionSnapshot.data().lastEntry,from: messageSnapshot.data().from,text: messageSnapshot.data().text}
                    setDiscussions(discussions => [...discussions,discussion]);
                  }
                });
              }) 
          });*/
         
        })
        
      })();
    return() => subscriber();
  }, [])

  return (
    <SafeAreaView style={StyleSheet.container}>
      <ScrollView>
        {discussions.map((discussion)=>(
          <DiscussionRow navigation={navigation} key={uuid.v4()} discussion_id={discussion.id} toEmail={discussion.toEmail}/>
        ))}
      </ScrollView>
      <FAB 
        style={StyleSheet.fab}
        small={false}
        icon="pencil"
        onPress = {() => {
          navigation.navigate('Users',{
            title: 'New message',
            showBack: true,
            backRoute: 'Home',
          })
        }}
      />
    </SafeAreaView>
  )
}

