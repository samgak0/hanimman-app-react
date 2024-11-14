import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UsersList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://server.samgak.store/api/users')
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
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
                        <Link to={`/chats/${user.username}`}>{user.username}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UsersList;