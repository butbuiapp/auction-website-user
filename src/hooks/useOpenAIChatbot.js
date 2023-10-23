import { useEffect, useState } from "react";

function useOpenAIChatbot(isDelete=false, isConfig=false,setIsConfig){
    
    const [prompt, setPrompt] = useState("");
    const [apiResponse, setApiResponse] = useState(`\nChatbot: Hello! How may I assist you today?`);
    const [conversation, setConversation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mode, setModeState] = useState("text-davinci-003");
    const [maxToken, setMaxTokenState] = useState(100);
    const [showConfig,setShowConfig] = useState(false);

    const setMaxToken = (value)=>{
        console.log("localStorage saving...", JSON.stringify({
            mode, maxToken:value
        }));
        localStorage.setItem("chatbotConfigValues",JSON.stringify({
            mode, maxToken:value
        }));
        setMaxTokenState(value);
    }

    const setMode = (value)=>{
        console.log("localStorage saving...", JSON.stringify({
            mode, maxToken:value
        }));
        localStorage.setItem("chatbotConfigValues",JSON.stringify({
            mode:value, maxToken
        }));
        setModeState(value);
    }
    useEffect(()=>{
        if(isConfig){      
            setShowConfig(isConfig);
        }
    },[isConfig])

    useEffect(()=>{
        if(setIsConfig && !showConfig){
            setIsConfig(showConfig);
        }
    },[showConfig])

    useEffect(()=>{
        if(isDelete){
            deleteConversation();
        }
    },[isDelete])

    const deleteConversation = () => {
        setApiResponse(`\nChatbot: Hello! How may I assist you today?`);
        setPrompt("");
        setConversation([]);
        localStorage.removeItem(
        process.env.REACT_APP_LOCAL_STORAGE_OPEN_AI_HISTORY
        );
    };

    const scrollToBottom = () => {
        window.scrollTo(0, document.body.scrollHeight);
    };

    useEffect(() => {
        const conversationLocal = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_OPEN_AI_HISTORY)
        );
        console.log("conversationLocal",conversationLocal)
        if (conversationLocal && conversationLocal.length > 0) {
            setConversation(conversationLocal);
        }

        const chatbotConfigValues = localStorage.getItem("chatbotConfigValues");
        if(chatbotConfigValues){
            const values = JSON.parse(chatbotConfigValues);
            setMaxToken(values.maxToken || 50);
            setMode(values.mode || "text-davinci-003");
        }
        scrollToBottom();
    }, []);

    useEffect(() => {
        if (conversation && conversation.length > 0) {
            localStorage.setItem(
                process.env.REACT_APP_LOCAL_STORAGE_OPEN_AI_HISTORY,
                JSON.stringify(conversation)
            );
        }
        scrollToBottom();
    }, [conversation]);

    return {
                prompt,setPrompt,apiResponse,setApiResponse,conversation,setConversation,loading,setLoading,
                mode,setMode,maxToken,setMaxToken,showConfig,setShowConfig, deleteConversation
            };
}

export default useOpenAIChatbot;