import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from './UserContext';
import API_CONFIG from './apiConfig';

function Chats() {
    const { user: sender } = useContext(UserContext);
    const { userId: receiverId } = useParams();
    const [messages, setMessages] = useState([]);
    const [receiverName, setReceiverName] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const fetchReceiver = async () => {
            try {
                const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.USERS}${receiverId}`);
                if (response.ok) {
                    const data = await response.json();
                    setReceiverName(data.username); // 상대방 이름 설정

                    if (sender.userId && receiverId) {
                        fetchMessages();
                    }
                } else {
                    console.error('상대방 사용자 정보를 가져오는 데 실패했습니다.');
                }
            } catch (error) {
                console.error('API 호출 중 오류 발생:', error);
            }
        };

        const fetchMessages = async () => {
            try {
                const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.MESSAGES}?senderId=${sender.userId}&receiverId=${receiverId}`);
                if (response.ok) {
                    const data = await response.json();
                    setMessages(data); // 메시지 리스트 상태 업데이트
                } else {
                    console.error('메시지 정보를 가져오는 데 실패했습니다.');
                }
            } catch (error) {
                console.error('API 호출 중 오류 발생:', error);
            }
        };

        fetchReceiver();
    }, [receiverId, sender.userId]);

    const sendMessage = () => {
        const messageContent = inputRef.current.value.trim();
        if (messageContent) {
            const newMessage = {
                id: Date.now(),
                sender: {
                    id: sender.userId,
                    username: sender.username
                },
                content: messageContent,
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            inputRef.current.value = '';
            inputRef.current.focus();
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc' }}>
            <h2>1:1 채팅 (대화 상대: {receiverName})</h2>
            <div
                style={{
                    height: '300px',
                    overflowY: 'scroll',
                    border: '1px solid #ddd',
                    padding: '10px',
                    marginBottom: '10px',
                }}
            >
                {messages.map((message) => (
                    <div
                        key={message.id}
                        style={{
                            textAlign: message.sender.id === sender.userId ? 'left' : 'right', // 내가 보낸 메시지는 왼쪽, 상대방의 메시지는 오른쪽
                            marginBottom: '10px',
                        }}
                    >
                        <div
                            style={{
                                display: 'inline-block',
                                padding: '10px',
                                borderRadius: '10px',
                                backgroundColor: message.sender.id === sender.userId ? '#f1f0f0' : '#DCF8C6', // 내가 보낸 메시지는 회색, 상대방의 메시지는 연한 녹색
                                color: '#333',
                                maxWidth: '60%',
                            }}
                        >
                            <strong>{message.sender.id === sender.userId ? '나' : message.sender.username}:</strong> {message.content}
                        </div>
                    </div>
                ))}
            </div>
            <input
                type="text"
                ref={inputRef}
                onKeyDown={handleKeyDown}
                style={{ width: 'calc(100% - 70px)', marginRight: '10px' }}
            />
            <button onClick={sendMessage}>전송</button>
        </div>
    );
}

export default Chats;
