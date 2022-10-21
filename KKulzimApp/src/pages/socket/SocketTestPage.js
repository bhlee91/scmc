// import React, { useState, useEffect, useRef } from 'react';
// import {
//   StyleSheet, 
//   View,
//   Text,
//   FlatList, 
//   TextInput,
//   Pressable,
// } from 'react-native';
// import io from 'socket.io-client';

// import Stomp from 'stompjs';
// import SockJS from 'sockjs-client';

// function SocketTestPage({ navigation, route }) {
//   // const [messageText, setMessageText] = useState('')
//   // const [serverMessages, setServerMessages] = useState([])
//   // const serverMessagesList = []
//   // const webSocket = useRef(null)
//   // const [user, setUser] = useState('')

//   // useEffect(() => {
//   //   setUser(route.params.user)
//   //   webSocket.current = io(`http://10.0.2.2:8080/socket/test`, {transports: ['websocket']})
//   //   webSocket.current.on('connect', () => {
//   //     let message = {
//   //       type: 'Welcome',
//   //       user: route.params.user,
//   //       message: `${route.params.user} 님이 입장하셨습니다.`,
//   //       room: route.params.room,
//   //     }

//   //     webSocket.current.emit('welcome', message)
//   //     console.log('Connected Server')
//   //   })

//   //   webSocket.current.on('message', e => {
//   //     console.log(route.params.user, 'message', e)
//   //     serverMessagesList.push(e)
//   //     setServerMessages([...serverMessagesList])
//   //   })

//   //   webSocket.current.on('welcome', e => {
//   //     console.log('welcome', e);
//   //     serverMessagesList.push(e);
//   //     setServerMessages([...serverMessagesList])
//   //   })

//   //   webSocket.current.on('leave', e => {
//   //     serverMessagesList.push(e);
//   //     setServerMessages([...serverMessagesList])
//   //   })

//   //   webSocket.current.on('error', e => {
//   //     console.log(e.message)
//   //   })

//   //   webSocket.current.on('disconnect', e => {
//   //     console.log('Disconnected. Check internet or server.')
//   //   })

//   //   return () => {
//   //     let message = {
//   //       type: 'Leave',
//   //       user: route.params.user,
//   //       message: `${route.params.user} 님이 퇴장하셨습니다.`,
//   //       room: route.params.room,
//   //     }
//   //     webSocket.current.emit('leave', message)
//   //     webSocket.current.disconnect()
//   //   }
//   // }, [])

//   // const sendMessage = () => {
//   //   let message = {
//   //     type: 'Chat',
//   //     user: user,
//   //     message: messageText,
//   //     room: route.params.room,
//   //   };
//   //   console.log(message)
//   //   webSocket.current.emit('message', message)
//   //   setMessageText('')
//   // }

//   const sock = new SockJS('http://10.0.2.2:8080/soc')
//   const ws = Stomp.over(sock)

//   useEffect(() => {
//     wsConnectSubscribe()

//     return () => { wsDisConnectUnsubscribe() }
//   }, [ws])

//   const wsConnectSubscribe = () => {
//     try {
//       ws.connect({}, () => {
//         ws.subscribe(
//           `/sub/request`,
//           (data) => {
//             console.log(data)
//             const newMessage = JSON.parse(data.body)
//             console.log(newMessage)
//           },
//         )
//       })
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   // 연결해제, 구독해제
//   const wsDisConnectUnsubscribe = () => {
//     try {
//       ws.disconnect(
//         () => {
//           ws.unsubscribe()
//         },
//       );
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   // 웹소켓이 연결될 때 까지 실행하는 함수
//   function waitForConnection(ws, callback) {
//     setTimeout(
//       () => {
//         // 연결되었을 때 콜백함수 실행
//         if (ws.ws.readyState === 1) {
//           callback()
//           // 연결이 안 되었으면 재호출
//         } else {
//           waitForConnection(ws, callback)
//         }
//       },
//       1 // 밀리초 간격으로 실행
//     );
//   }

//   // 메시지 보내기
//   function sendMessage() {
//     try {
//       // token이 없으면 로그인 페이지로 이동
//       if (!token) {
//         alert('토큰이 없습니다. 다시 로그인 해주세요.');
//         navigation.reset({ 
//           index: 0, 
//           routes: [{ 
//             name: '/LogIn'
//           }]
//         })
//       }
//       // send할 데이터
//       const data = {
//         type: 'TALK',
//         roomId: roomId,
//         sender: sender,
//         message: messageText,
//       };
//       // 빈문자열이면 리턴
//       if (messageText === '') {
//         return;
//       }
//       // 로딩 중
//       // dispatch(chatActions.isLoading());
//       waitForConnection(ws, function () {
//         ws.send(
//           '/pub/api/chat/message',
//           { token: token },
//           JSON.stringify(data)
//         );
//         console.log(ws.ws.readyState);
//         // dispatch(chatActions.writeMessage(''));
//       });
//     } catch (error) {
//       console.log(error);
//       console.log(ws.ws.readyState);
//     }
//   }

//   return (
//     <View>
//       <View
//         style={{
//           padding: 5,
//           flexGrow: 1,
//         }}>
//         {/* <FlatList
//           style={styles.list}
//           contentContainerStyle={{paddingBottom: 50}}
//           data={serverMessages}
//           keyExtractor={(item, index) => item.message + index}
//           renderItem={({item}) =>
//             item.type == 'Welcome' || item.type == 'Leave' ? (
//               <Text style={styles.welcomeChat}>{item.message}</Text>
//             ) : item.user == user ? (
//               <Text style={styles.myChat}>{item.message}</Text>
//             ) : (
//               <Text style={styles.otherChat}>{item.message}</Text>
//             )
//           }
//         /> */}
//       </View>
//       <View style={styles.bottomContainer}>
//         {/* <TextInput
//           style={styles.input}
//           placeholder={'Add Message'}
//           onChangeText={text => {
//             setMessageText(text);
//           }}
//           value={messageText}></TextInput>
//         <Pressable onPress={sendMessage} disabled={messageText == ''}>
//           <Text style={styles.send}>Send</Text>
//         </Pressable> */}
//       </View>
//     </View>
//   )
// }

// export default SocketTestPage;

// const styles = StyleSheet.create({
//   mainView: {
//     backgroundColor: '#EEEEEE',
//   },

//   container: {
//     flex: 1,
//     paddingTop: 30,
//     padding: 8,
//   },
//   welcomeChat: {
//     alignSelf: 'center',
//     padding: 10,
//     color: 'white',
//     backgroundColor: '#212124',
//     fontSize: 16,
//     borderRadius: 20,
//     marginVertical: 10,
//   },
//   myChat: {
//     alignSelf: 'flex-end',
//     padding: 10,
//     color: 'white',
//     backgroundColor: 'yellow',
//     fontSize: 16,
//     borderRadius: 20,
//     marginVertical: 10,
//   },
//   otherChat: {
//     alignSelf: 'flex-start',
//     padding: 10,
//     color: 'white',
//     backgroundColor: 'gray',
//     fontSize: 16,
//     borderRadius: 20,
//     marginVertical: 10,
//   },
//   input: {
//     width: '70%',
//     borderWidth: 1,
//     borderColor: 'black',
//     padding: 10,
//     marginRight: 30,
//   },
//   send: {
//     backgroundColor: 'black',
//     color: 'white',
//     padding: 20,
//     textAlign: 'center',
//     textAlignVertical: 'center',
//   },
//   bottomContainer: {
//     marginHorizontal: 10,
//     flexDirection: 'row',
//     marginBottom: 80,
//   },
//   list: {
//     height: '80%',
//   },
// });
