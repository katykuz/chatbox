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

  componentWillMount(){
    var name = localStorage.getItem('name')
    if(name){
      this.setState({name})
    }
  }

  gotMessage = (text) => {
    var message = {
      text,
      from: this.state.name
    }
    var newMessagesArray = [message, ...this.state.messages]
    this.setState({messages: newMessagesArray})

  }

  setEditName = (editName) =>{
    if(!editName){
      localStorage.setItem('name', this.state.name)
    }
    this.setState({editName})
  }


  render() {
    var {editName, messages, name} = this.state
    return (
      <div className="App">
        <header className="header">
          <div><img src={logo} className="logo" alt="logo" />
          Chatbox</div>
        <NamePicker 
          name={name}
          editName={editName}
          changeName={name=> this.setState({name})}
          setEditName={this.setEditName} />
        </header>

        <main className="messages">
          {/* To write javaScript in html, start with curly braces*/}
          {messages.map((m, i)=>{
            /*Putting curly braces around m because m is javascript and div is html*/
            return <div key={i} className="bubble-wrap"
              from={m.from===name ? "me" : "you"}>
        
              {m.from!==name && <div className="bubble-name">{m.from}</div>}
              <div className="bubble">
              <span>{m.text}</span>
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


