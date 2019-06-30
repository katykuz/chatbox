import React from 'react';
import './App.css';
import logo from './logo.png'
import TextInput from './TextInput'

function App() {
  return (
    <div className="App">
      <header className="header">
        <img src={logo} className="logo" alt="logo" />
        Chatbox
        </header>

        <div className="container">
            <p>Hello. How are you today?</p>
            </div>

        <div class="container darker">
           <p>Hey! I'm fine. Thanks for asking!</p>
        </div>
      
        <TextInput />

    </div>
  );
}

export default App;


