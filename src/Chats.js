import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from './UserContext';
import API_CONFIG from './apiConfig';
import './Chats.css';

function Chats() {
    const { user: sender } = useContext(UserContext);
    const { userId: receiverId } = useParams();
    const [messages, setMessages] = useState([]);
    const [receiverName, setReceiverName] = useState(null);
    const inputRef = useRef(null);
    const messagesRef = useRef(null);

    const fetchMessages = useCallback(async () => {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.MESSAGES}?senderId=${sender.userId}&receiverId=${receiverId}`);
            if (response.ok) {
                const data = await response.json();
                setMessages(data);
                setTimeout(() => { scrollToBottom(); }, 500);
                setTimeout(() => { scrollToBottom(); }, 1000);
            } else {
                console.error('메시지 정보를 가져오는 데 실패했습니다.');
            }
        } catch (error) {
            console.error('API 호출 중 오류 발생:', error);
        }
    }, [receiverId, sender.userId]);

    const markMessagesAsRead = useCallback(async () => {
        const unreadMessages = messages.filter(message => !message.read && message.sender.id !== sender.userId);
        const unreadMessageIds = unreadMessages.map(message => message.id);

        if (unreadMessageIds.length === 0) return;

        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.MESSAGES}/mark-read`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messageIds: unreadMessageIds }),
            });

            if (response.ok) {
                setMessages(prevMessages => prevMessages.map(m =>
                    unreadMessageIds.includes(m.id) ? { ...m, read: true } : m
                ));
            } else {
                console.error('메시지들을 읽음 처리하는 데 실패했습니다.');
            }
        } catch (error) {
            console.error('읽음 처리 중 오류 발생:', error);
        }
    }, [messages, sender.userId]);


    useEffect(() => {
        const fetchReceiver = async () => {
            try {
                const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.USERS}${receiverId}`);
                if (response.ok) {
                    const data = await response.json();
                    setReceiverName(data.username);
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

        fetchReceiver();

        const intervalId = setInterval(() => {
            fetchMessages();
        }, 5000);

        return () => clearInterval(intervalId);
    }, [receiverId, sender.userId, fetchMessages]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                markMessagesAsRead();
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        if (document.visibilityState === 'visible') {
            markMessagesAsRead();
        }

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [messages, markMessagesAsRead]);

    const sendMessage = async () => {
        const messageContent = inputRef.current.value.trim();
        if (messageContent) {
            const newMessage = {
                content: messageContent,
                sender: sender.userId,
                receiver: receiverId,
                read: false,
            };

            try {
                const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.MESSAGES}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newMessage),
                });

                if (response.ok) {
                    const savedMessage = await response.json();
                    setMessages((prevMessages) => [...prevMessages, savedMessage]);
                    scrollToBottom();
                } else {
                    console.error('메시지를 보내는 데 실패했습니다.');
                }
            } catch (error) {
                console.error('메시지 전송 중 오류 발생:', error);
            }

            inputRef.current.value = '';
            inputRef.current.focus();
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    const scrollToBottom = () => {
        if (messagesRef.current) {
            messagesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        if (messages.length > 0) {
            scrollToBottom();
            markMessagesAsRead();
        }
    }, [messages, markMessagesAsRead]);

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2>1:1 채팅 (대화 상대: {receiverName})</h2>
            </div>
            <div className="chat-messages">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`chat-message ${message.sender.id === sender.userId ? 'chat-message-sent' : 'chat-message-received'}`}
                    >
                        <div className="chat-bubble">
                            <strong>{message.sender.id === sender.userId ? '나' : message.sender.username}:</strong> {message.content}
                        </div>
                    </div>
                ))}
                <div ref={messagesRef} />
            </div>
            <div className="chat-input-container">
                <input
                    type="text"
                    ref={inputRef}
                    onKeyDown={handleKeyDown}
                    placeholder="메시지를 입력하세요..."
                    className="chat-input"
                />
                <button onClick={sendMessage} className="chat-send-button">전송</button>
            </div>
        </div>
    );
}

export default Chats;
