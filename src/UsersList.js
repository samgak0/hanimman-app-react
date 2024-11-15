import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';

function UsersList() {
    const [users, setUsers] = useState([]);
    const { user: currentUser } = useContext(UserContext);

    useEffect(() => {
        fetch('https://server.samgak.store/api/users')
            .then((response) => response.json())
            .then((data) => {
                const filteredUsers = data.filter((user) => user.id !== currentUser.userId);
                setUsers(filteredUsers);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    }, []);

    return (
        <div className="users-list">
            <h3>Available Users</h3>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <Link to={`/chats/${user.id}`}>{user.username}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UsersList;