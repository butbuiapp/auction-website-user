import React, { useState } from 'react';
import "../../css/components/chatbot/openAIChatbot.css";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const ChatbotSearch = ({loading, handleSubmit}) => {
    
    const [prompt, setPrompt] = useState("");
    const isDisabled = loading || prompt.length === 0;
    return (
        <div className="searchContainer">
            <textarea
                className="text-area"
                value={prompt}
                placeholder="Please ask to openai"
                onChange={(e) => {
                    setPrompt(e.target.value)
                }}
                onKeyUp={(e)=>{
                    if(e.keyCode === 13){
                        handleSubmit(prompt);
                        setPrompt("");
                    }
                }}
            >
            </textarea>
            
            <Button
                disabled={isDisabled}
                className={`reset-button ${isDisabled ? 'disabled' : 'enabled'}`}
                onClick={()=>{
                    setPrompt("");
                }}
                endIcon={<RestartAltIcon />}
            >
            
            </Button>

            <Button
                disabled={isDisabled}
                className={`send-button ${isDisabled ? 'disabled' : 'enabled'}`}
                onClick={()=>{
                    handleSubmit(prompt);
                    setPrompt("");
                }}
                endIcon={<SendIcon />}
            >
            
            </Button>
            
            </div>
            
    );
};    

export default ChatbotSearch;
