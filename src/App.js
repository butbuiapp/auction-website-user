import './App.css';
import router from './router';
import { RouterProvider } from 'react-router-dom';
import AuthProvider from './services/AuthProvider';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'; 
import ChatbotModal from './components/chatbot/ChatbotModal';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
      <ToastContainer/>
      <ChatbotModal />
    </div>
  );
}

export default App;
