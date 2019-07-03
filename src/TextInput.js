import React from 'react'
import { FiSend } from "react-icons/fi";

/* Inserting Text Input Box */
class TextInput extends React.Component{

    state={
        text:""
    }

    send = () => {
        this.props.sendMessage(this.state.text)
        this.setState({text:""})
    }

    keyPress = (e) => {
        if(e.key==='Enter'){
            this.send()
        }
    }

    render(){
        return(<div className = "text-input">
            {/* Places instruction text into input, value prop controls the input */}
            <input value={this.state.text}
            /*Placeholder is temporary and once you type, it disappears*/
            placeholder="Write your message here..."
            /* Gives function to text input, e stands for event (can be a different letter) */
            onChange={e=> this.setState({text: e.target.value})}
            /* No fat arrow bellow (onKeyPress) because we made our own KeyPress function that included the fat arrow*/
            onKeyPress={this.keyPress}
            />
            <button disabled={!this.state.text} onClick={this.send} >
            < FiSend style={{height:12, width:12}}/> 
            </button>
            </div>)
            }

            }
            
            export default TextInput
            
