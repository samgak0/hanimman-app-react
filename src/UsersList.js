import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import API_CONFIG from './ApiConfig';
import './Common.css';
import './UsersList.css';

function UsersList() {
    const [users, setUsers] = useState([]);
    const { user: currentUser, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.USERS}`)
            .then((response) => response.json())
            .then((data) => {
                const filteredUsers = data.filter((user) => user.id !== currentUser.userId);
                setUsers(filteredUsers);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    }, [currentUser.userId]);

    const changeCurrentUser = (user) => {
        setUser({
            userId: user.id,
            username: user.username,
        });
    };

    const goToPage = (userId) => {
        navigate(`/chats/${userId}`);
    };
    return (
        <div className="users-list-container">
            <div className="current-user-info card">
                <h3>👤 현재 로그인된 사용자</h3>
                <p>
                    <strong>Username:</strong> {currentUser.username} <br />
                    <strong>User ID:</strong> {currentUser.userId}
                </p>
            </div>

            <h3>💬 대화 가능한 사용자 목록</h3>
            <div className="users-grid">
                {users.map((user) => (
                    <div key={user.id} className="user-card card">
                        <h4>{user.username}</h4>
                        <div className="user-buttons">

                            <button className='button-chat' onClick={() => goToPage(user.id)}>
                                대화 시작
                            </button>
                            <button
                                className="button-change"
                                onClick={() => changeCurrentUser(user)}
                            >
                                사용자 전환
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}

export default UsersList;
