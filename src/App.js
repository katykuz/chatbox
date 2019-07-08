/* Importing other code files */
import React from 'react';
import './App.css';
import logo from './logo.png'
import TextInput from './TextInput'
import NamePicker from './NamePicker'


/* Creating the page and what is in the page */
class App extends React.Component {
  state = {
    messages: [],
    name:'',
    editName: false,
  }

  gotMessage = (m) => {
    const message = {
      text: m,
      from: this.state.name
    }
    /* ... is a separator*/
    var newMessagesArray = [...this.state.messages, m]
    this.setState({messages: newMessagesArray})
  }

  setEditName = (boolian) => {
    var editName = boolian
    this.setState({editName})
  }


  render() {
    var {messages} = this.state
    return (
      <div className="App">
        <header className="header">
          <div><img src={logo} className="logo" alt="logo" />
          Chatbox</div>
          <div className="name-input">
        <NamePicker 
          name={this.state.name}
          editName={this.state.editName}
          changeName={name=> this.setState({name})}
          setEditName={editName => this.setState({editName})} />
          </div>
        </header>

        <div className="container">
          <p>Hello. How are you today?</p>
        </div>

        <div className="container darker">
          <p>Hey! I'm fine. Thanks for asking!</p>
    </div>

        <main className="messages">
          {/* To write javaScript in html, start with curly braces*/}
          {messages.map((m, i)=>{
            /*Putting curly braces around m because m is javascript and div is html*/
            return <div key={i} className="bubble-wrap">
              <div className="bubble">
              <span>{m}</span>
              </div>
            </div>
          })}

        </main>

        <TextInput sendMessage={this.gotMessage} />

      </div>
      
    );
  }
}


export default App;


