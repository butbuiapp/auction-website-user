import OpenAI from "openai";
import "../../css/openAIChatbot.css";
import ChatbotSearch from "./ChatbotSearch";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import useOpenAIChatbot from "../../hooks/useOpenAIChatbot";
import ChatbotConfig from "./ChatbotConfig";

const limit = 10;

const OpenAIChatbot = ({
    isModal = false,
    isDelete = false,
    isConfig = false,
    setIsConfig,
    }) => {
    
    const openAI = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
    });
    const {
        prompt,
        setPrompt,
        apiResponse,
        setApiResponse,
        conversation,
        setConversation,
        loading,
        setLoading,
        mode,
        setMode,
        maxToken,
        setMaxToken,
        showConfig,
        setShowConfig,
        deleteConversation,
    } = useOpenAIChatbot(isDelete, isConfig, setIsConfig);
    const userName = "\nUser";
    const chatbotName = "\nChatbot";
    let chatGPTRes = chatbotName + ": ";

    // handle submit prompt to OpenAI
    const handleSubmit = async (prompt) => {
        if (conversation.length > limit) {
        alert("You exceeded limit request!!!");
        return true;
        }

        const reqDateTime = new Date().toLocaleString();
        setPrompt(`${userName}[${reqDateTime}]: ${prompt}`);
        setLoading(true);

        try {
        console.log("conversation.length", conversation.length, mode, maxToken);
        const stream = await openAI.completions.create({
            model: mode,
            prompt: prompt,
            max_tokens: maxToken,
            stream: true,
        });
        for await (const part of stream) {
            const text = part.choices[0].text;
            if (text !== "\n") {
            chatGPTRes += part.choices[0].text;
            setApiResponse(chatGPTRes);
            }
        }

        setApiResponse("");
        setPrompt("");
        setConversation([
            ...conversation,
            { req: `${userName}[${reqDateTime}]: ${prompt}`, res: `${chatGPTRes}` },
        ]);
        } catch (error) {
        if (error instanceof OpenAI.APIError) {
            console.error(error.status); // e.g. 401
            console.error(error.message); // e.g. The authentication token you passed was invalid...
            console.error(error.code); // e.g. 'invalid_api_key'
            console.error(error.type); // e.g. 'invalid_request_error'
        } else {
            // Non-API error
            console.log(error);
        }
        }
        setLoading(false);
    };

    const buildConversation = (message) => {
        if (message && message.req && message.res) {
        return (
            <>
            <p className="chatBotReq">
                <strong>
                <b>{message.req}</b>
                </strong>
            </p>
            <p className="chatBotRes">{message.res}</p>
            </>
        );
        }
        return null;
    };

    const ChatbotConfiguration = () => {
        return (
        (showConfig || !isModal) && (
            <ChatbotConfig
            mode={mode}
            setMode={setMode}
            maxToken={maxToken}
            setMaxToken={setMaxToken}
            showConfig={showConfig}
            setShowConfig={setShowConfig}
            />
        )
        );
    };

    const ChatbotConversation = () => {
        return <div className="conversationContainer">
                    <pre>
                        {conversation.map((message, index) => (
                            <div key={index}>{buildConversation(message)}</div>
                        ))}
                        {prompt && <p className="chatBotReq">{prompt}</p>}
                        {apiResponse && <p className="chatBotRes">{apiResponse}</p>}
                        </pre>
                </div>;
    };

    const ButtonDeleteConversation = () => {
        return (
        !isModal &&
        conversation &&
        conversation.length > 0 && (
            <Button
            className={`delete-button`}
            onClick={() => {
                deleteConversation();
            }}
            endIcon={<DeleteIcon />}
            >
            Clear Conversation
            </Button>
        )
        );
    };

    const ChatbotContent = () => {
        return (
        (!showConfig || !isModal) && (
            <>
                <ChatbotConversation />
                <ChatbotSearch loading={loading} handleSubmit={handleSubmit} />
                <ButtonDeleteConversation />
            </>
        )
        );
    };

    return (
        (conversation.length > limit ? (
        "You exceeded limit request!!!"
        ) : (
        <div className="openAIChatBotComponent">
            {!isModal && <h1>OpenAIChatbot Customer Support</h1>}
            <ChatbotConfiguration />
            <ChatbotContent />
        </div>
        ))
    );
};

export default OpenAIChatbot;
