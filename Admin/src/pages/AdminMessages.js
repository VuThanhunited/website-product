import React, { useState, useEffect } from "react";
import { getContactMessages, deleteContactMessage } from "../services/api";
import {
  FaTrash,
  FaEnvelope,
  FaEnvelopeOpen,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import "./AdminMessages.css";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await getContactMessages();
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      alert("Lỗi khi tải danh sách tin nhắn");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa tin nhắn này?")) {
      try {
        setLoading(true);
        await deleteContactMessage(id);
        alert("✅ Xóa tin nhắn thành công!");
        fetchMessages();
        if (selectedMessage?._id === id) {
          setSelectedMessage(null);
        }
      } catch (error) {
        console.error("Error deleting message:", error);
        alert("❌ Lỗi khi xóa tin nhắn");
      } finally {
        setLoading(false);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="admin-messages-page">
      <div className="page-header">
        <h1>
          <FaEnvelope /> Tin Nhắn Liên Hệ
        </h1>
        <div className="message-stats">
          <span className="stat-badge">
            Tổng: <strong>{messages.length}</strong>
          </span>
        </div>
      </div>

      <div className="messages-layout">
        <div className="messages-list">
          {loading ? (
            <div className="loading">⏳ Đang tải...</div>
          ) : messages.length === 0 ? (
            <div className="no-data">📭 Chưa có tin nhắn nào</div>
          ) : (
            messages.map((message) => (
              <div
                key={message._id}
                className={`message-item ${
                  selectedMessage?._id === message._id ? "active" : ""
                }`}
              >
                <div
                  className="message-content-wrapper"
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="message-icon">
                    {selectedMessage?._id === message._id ? (
                      <FaEnvelopeOpen />
                    ) : (
                      <FaEnvelope />
                    )}
                  </div>
                  <div className="message-preview">
                    <div className="message-header">
                      <h4>{message.name}</h4>
                      <span className="message-date">
                        {new Date(message.createdAt).toLocaleDateString(
                          "vi-VN"
                        )}
                      </span>
                    </div>
                    <div className="message-subject">{message.subject}</div>
                    <div className="message-snippet">
                      {message.message.substring(0, 60)}...
                    </div>
                  </div>
                </div>
                <button
                  className="btn-delete-small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(message._id);
                  }}
                  disabled={loading}
                  title="Xóa tin nhắn"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="message-detail">
          {selectedMessage ? (
            <>
              <div className="detail-header">
                <h2>{selectedMessage.subject}</h2>
              </div>

              <div className="detail-body">
                <div className="detail-info">
                  <div className="info-item">
                    <FaUser />
                    <div>
                      <label>Người gửi</label>
                      <p>{selectedMessage.name}</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <FaEnvelope />
                    <div>
                      <label>Email</label>
                      <p>
                        <a href={`mailto:${selectedMessage.email}`}>
                          {selectedMessage.email}
                        </a>
                      </p>
                    </div>
                  </div>

                  {selectedMessage.phone && (
                    <div className="info-item">
                      <FaPhone />
                      <div>
                        <label>Số điện thoại</label>
                        <p>
                          <a href={`tel:${selectedMessage.phone}`}>
                            {selectedMessage.phone}
                          </a>
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="info-item">
                    <div>
                      <label>Thời gian gửi</label>
                      <p>{formatDate(selectedMessage.createdAt)}</p>
                    </div>
                  </div>
                </div>

                <div className="message-content">
                  <h3>Nội dung tin nhắn</h3>
                  <p>{selectedMessage.message}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="no-selection">
              <FaEnvelope />
              <p>Chọn một tin nhắn để xem chi tiết</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
