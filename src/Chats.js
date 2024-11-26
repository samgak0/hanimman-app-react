import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from './UserContext';
import API_CONFIG from './ApiConfig';
import { useNavigate } from 'react-router-dom';
import './Common.css';
import './Chats.css';

function Chats() {
    const { user: sender } = useContext(UserContext);
    const { userId: receiverId } = useParams();
    const [messages, setMessages] = useState([]);
    const [receiverName, setReceiverName] = useState(null);
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);
    const inputRef = useRef(null);
    const chatInputContainer = useRef(null);
    const chatContainerRef = useRef(null);
    const navigate = useNavigate();
    const fetchReceiver = useCallback(async () => {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.USERS}/${receiverId}`);
            if (response.ok) {
                const data = await response.json();
                setReceiverName(data.username);
            } else {
                console.error('상대방 사용자 정보를 가져오는 데 실패했습니다.');
            }
        } catch (error) {
            console.error('API 호출 중 오류 발생:', error);
        }
    }, [receiverId]);

    const fetchMessages = useCallback(async () => {
        try {
            if (!(sender.userId && receiverId)) return;

            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.MESSAGES}?senderId=${sender.userId}&receiverId=${receiverId}`);
            if (response.ok) {
                const data = await response.json();
                setMessages(data);
            } else {
                console.error('메시지 정보를 가져오는 데 실패했습니다.');
            }
        } catch (error) {
            console.error('API 호출 중 오류 발생:', error);
        }
    }, [receiverId, sender.userId]);

    const markMessagesAsRead = useCallback(async () => {
        const unreadMessages = messages.filter(message => !message.isRead && message.sender.id !== sender.userId);
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
                setMessages(prevMessages =>
                    prevMessages.map(m =>
                        unreadMessageIds.includes(m.id) ? { ...m, isRead: true } : m
                    )
                );
            } else {
                console.error('메시지 읽음 처리하는 데 실패했습니다.');
            }
        } catch (error) {
            console.error('읽음 처리 중 오류 발생:', error);
        }
    }, [messages, sender.userId]);

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
        console.log("scrollToBottom");
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    };

    const checkScrollPosition = useCallback(() => {
        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        console.log(`scrollHeight = ${scrollHeight}, scrollTop = ${scrollTop}, clientHeight = ${clientHeight}`);
        console.log(`(scrollHeight - scrollTop - clientHeight) = ${scrollHeight - scrollTop - clientHeight}`);

        const isBottom = ((scrollHeight - scrollTop - clientHeight) <= 44);
        setIsScrolledToBottom(isBottom);
    }, []);

    useEffect(() => {
        const handleViewportChange = () => {
            if (window.visualViewport) {
                const viewport = window.visualViewport;
                const onResize = () => {
                    if (chatContainerRef.current) {
                        chatContainerRef.current.style.height = `${viewport.height}px`;
                    }
                    scrollToBottom();
                };

                viewport.addEventListener('resize', onResize);
                return () => {
                    viewport.removeEventListener('resize', onResize);
                };
            }
        };

        handleViewportChange();
    }, []);

    useEffect(() => {
        fetchReceiver();
    }, [fetchReceiver]);

    useEffect(() => {
        if (receiverName) {
            fetchMessages();
        }
    }, [receiverName, fetchMessages]);

    useEffect(() => {
        if (messages.length > 0) {
            markMessagesAsRead();
        }
    }, [messages, markMessagesAsRead]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        window.addEventListener('scroll', checkScrollPosition);

        return () => {
            window.removeEventListener('scroll', checkScrollPosition);
        };
    }, [checkScrollPosition]);

    return (
        <div className="chat-container" ref={chatContainerRef}>
            <div className="chat-header">
                <button className="back-button" onClick={() => navigate(-1)}>&lt;</button>
                <h2 className="chat-header-title">{receiverName} 님과 대화</h2>
            </div>
            <div className="chat-message-container">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`chat-message ${message.sender.id === sender.userId ? 'chat-message-sent' : 'chat-message-received'}`}
                    >
                        <div className="chat-bubble">
                            <strong>{message.sender.id === sender.userId ? '나' : message.sender.username}:</strong> {message.content}
                        </div>
                        {message.sender.id === sender.userId && (
                            <span className="read-status">
                                {message.isRead ? '' : '안읽음'}
                            </span>
                        )}
                    </div>
                ))}
            </div>

            <button
                className={`scroll-to-bottom-button ${isScrolledToBottom ? 'hidden' : ''}`} onClick={scrollToBottom} >
                <img src="/button.svg" alt="아이콘" class="icon" />
            </button>

            <div className="chat-input-container" ref={chatInputContainer}>
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
