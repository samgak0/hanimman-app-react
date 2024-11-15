import UsersList from "./UsersList";
import Chats from "./Chats";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from "./UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<UsersList />} />
          <Route path="/chats/:userId" element={<Chats />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;