import { StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  headline: {
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  form: {
    alignSelf: 'stretch',
    marginLeft: 10,
    marginRight: 10,
  },
  textInput: {
    backgroundColor: '#fff',
    marginBottom: 8
  },
  signUp: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
    marginTop: 20,
  },
  signUpText: {
    fontSize: 16,
  },
  signUpLink: {
    color: '#018766'
  },
  discussionContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  discussionRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  discussionFrom: {
    fontWeight: '700',
    alignSelf: 'flex-start'
  },
  discussionTime: {
    fontSize: 12,
    color: '#888',
    alignSelf: 'flex-end'
  },
  discussionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  userRowContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  userRowText: {
    fontSize: 16,
    marginLeft: 10,
  },
  messageContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  messageRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  messageTime: {
    fontSize: 12,
    color: '#888',
    alignSelf: 'flex-end'
  },
  messageText: {
    fontSize: 16,
    marginLeft: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    flex: 1
  }
});