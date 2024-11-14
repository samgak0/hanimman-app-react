import UsersList from "./UsersList";
import ChatsPage from "./ChatsPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/chats/:username" element={<ChatsPage />} />
      </Routes>
    </Router>
  );
}

export default App;