import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import './UsersList.css'; // 추가된 CSS 파일 import

function UsersList() {
    const [users, setUsers] = useState([]);
    const { user: currentUser, setUser } = useContext(UserContext); // setUser 사용

    useEffect(() => {
        fetch('https://server.samgak.store/api/users')
            .then((response) => response.json())
            .then((data) => {
                // 현재 사용자는 목록에서 제외한 후 나머지 사용자만 상태에 저장
                const filteredUsers = data.filter((user) => user.id !== currentUser.userId);
                setUsers(filteredUsers);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    }, [currentUser.userId]);

    // 로그인된 사용자 변경 함수
    const changeCurrentUser = (user) => {
        setUser({
            userId: user.id,
            username: user.username,
        });
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
                        <Link to={`/chats/${user.id}`} className="chat-link">
                            💌 대화 시작
                        </Link>
                        <button
                            className="change-user-button"
                            onClick={() => changeCurrentUser(user)}
                        >
                            🔄 로그인으로 설정
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UsersList;
