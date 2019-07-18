/* Importing other code files */
import React from 'react';
import './App.css';
import logo from './logo.png'
import TextInput from './TextInput'
import NamePicker from './NamePicker'
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage"
import Camera from 'react-snap-pic'
import Div100vh from 'react-div-100vh'


/* Creating the page and what is in the page */
class App extends React.Component {
  state = {
    messages: [],
    name: '',
    editName: false,
    showCamera: false,
  }

  componentWillMount() {
    var name = localStorage.getItem('name')
    if (name) {
      this.setState({ name })
    }
    /* <=========================> */
    firebase.initializeApp({
      apiKey: "AIzaSyB3slNJIq3gZ3cCy18QgxsqmcEi4ph1AZU",
      authDomain: "summer-project-438.firebaseapp.com",
      databaseURL: "https://summer-project-438.firebaseio.com",
      projectId: "summer-project-438",
      storageBucket: "summer-project-438.appspot.com",
    });
    this.db = firebase.firestore();

    this.db.collection("messages").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          //console.log(change.doc.data())
          this.receive(change.doc.data())
        }
      })
    })
  }

  receive = (m) => {
    const messages = [m, ...this.state.messages]
    messages.sort((a, b) => b.ts - a.ts)
    this.setState({ messages })
  }

  send = (m) => {
    this.db.collection("messages").add({
      ...m,
      from: this.state.name || 'No name',
      ts: Date.now()
    })
  }


  setEditName = (editName) => {
    if (!editName) {
      localStorage.setItem('name', this.state.name)
    }
    this.setState({ editName })
  }
  /* Send picture to Firebase storage and send reference to image*/
  takePicture = async (img) => {
    this.setState({ showCamera: false })
    const imgID = Math.random().toString(36).substring(7);
    var storageRef = firebase.storage().ref();
    var ref = storageRef.child(imgID + '.jpg');
    await ref.putString(img, 'data_url') //await states to wait for line to complete before beginning to run the next line//
    this.send({ img: imgID })
  }

  render() {
    var { editName, messages, name } = this.state
    return (
      <Div100vh className="App">
        {this.state.showCamera && <Camera takePicture={this.takePicture} />}
          <header className="header">
            <div className="iconwrapper"><img src={logo} className="logo" alt="logo" />
              {editName ? '' : 'Chatbox'} </div>
            <NamePicker
              name={name}
              editName={editName}
              changeName={name => this.setState({ name })}
              setEditName={this.setEditName}
            //{editName= ? ''::'logo'} 
            />
          </header>


          <main className="messages">
            {/* To write javaScript in html, start with curly braces*/}
            {messages.map((m, i) => {
              /*Putting curly braces around m because m is javascript and div is html*/
              return <Message key={i} m={m} name={name} />
            })}

          </main>

          <TextInput
            sendMessage={text => this.send({ text })}
            showCamera={() => this.setState({ showCamera: true })}
          />
        </Div100vh>

    )
  }
}


export default App;
const bucket = 'https://firebasestorage.googleapis.com/v0/b/summer-project-438.appspot.com/o/'
const suffix = '.jpg?alt=media'

function Message(props) {
  var {m, name} = props
  return(<div className="bubble-wrap"
          from={m.from === name ? "me" : "you"}>

          {m.from !== name && <div className="bubble-name">{m.from}</div>}
          <div className="bubble">
            <span>{m.text}</span>
            {m.img && <img alt='pic' src={bucket + m.img + suffix} />}
          </div>
        </div>)
        }
        
        
