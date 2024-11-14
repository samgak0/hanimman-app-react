import React from 'react';
import { useParams } from 'react-router-dom';

function ChatsPage() {
    const { username } = useParams();

    return (
        <div className="chats-page">
            <h2>Chat with {username}</h2>
            {/* 여기에 채팅 UI나 로직을 추가합니다 */}
        </div>
    );
}

export default ChatsPage;