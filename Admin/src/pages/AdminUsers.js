import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminUsers.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${API_URL}/auth/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Lỗi khi tải danh sách user");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";

    if (!window.confirm(`Bạn có chắc muốn đổi quyền thành ${newRole}?`)) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.put(
        `${API_URL}/auth/users/${userId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setSuccess(response.data.message);
        fetchUsers();
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Lỗi khi cập nhật quyền");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleStatusChange = async (userId, currentStatus) => {
    const newStatus = !currentStatus;

    if (
      !window.confirm(
        `Bạn có chắc muốn ${newStatus ? "kích hoạt" : "khóa"} tài khoản này?`
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.put(
        `${API_URL}/auth/users/${userId}/status`,
        { isActive: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setSuccess(response.data.message);
        fetchUsers();
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Lỗi khi cập nhật trạng thái");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleDeleteUser = async (userId, username, email) => {
    if (
      !window.confirm(
        `⚠️ CẢNH BÁO: Bạn có chắc muốn XÓA VĨNH VIỄN tài khoản:\n\nUsername: ${username}\nEmail: ${email}\n\nHành động này KHÔNG THỂ HOÀN TÁC!`
      )
    ) {
      return;
    }

    // Xác nhận lần 2
    if (!window.confirm("Xác nhận lần cuối: BẠN THỰC SỰ MUỐN XÓA?")) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.delete(`${API_URL}/auth/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setSuccess(response.data.message);
        fetchUsers();
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Lỗi khi xóa tài khoản");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setError("Mật khẩu mới phải có ít nhất 6 ký tự");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.post(
        `${API_URL}/auth/change-password`,
        {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setSuccess("Đổi mật khẩu thành công!");
        setShowPasswordModal(false);
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Lỗi khi đổi mật khẩu");
    }
  };

  const getRoleBadgeClass = (role) => {
    return role === "admin" ? "badge-admin" : "badge-user";
  };

  const getStatusBadgeClass = (isActive) => {
    return isActive ? "badge-active" : "badge-inactive";
  };

  if (loading) {
    return <div className="admin-users-loading">Đang tải...</div>;
  }

  return (
    <div className="admin-users-container">
      <div className="admin-users-header">
        <h1>Quản Lý Tài Khoản</h1>
        <button
          className="btn-change-password"
          onClick={() => setShowPasswordModal(true)}
        >
          <i className="fas fa-key"></i> Đổi Mật Khẩu
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="users-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-info">
            <h3>{users.length}</h3>
            <p>Tổng Tài Khoản</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon admin">
            <i className="fas fa-user-shield"></i>
          </div>
          <div className="stat-info">
            <h3>{users.filter((u) => u.role === "admin").length}</h3>
            <p>Admin</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon user">
            <i className="fas fa-user"></i>
          </div>
          <div className="stat-info">
            <h3>{users.filter((u) => u.role === "user").length}</h3>
            <p>User</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon active">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-info">
            <h3>{users.filter((u) => u.isActive).length}</h3>
            <p>Đang Hoạt Động</p>
          </div>
        </div>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Username</th>
              <th>Email</th>
              <th>Quyền</th>
              <th>Trạng Thái</th>
              <th>Ngày Tạo</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="user-info">
                    <i className="fas fa-user-circle"></i>
                    <span>{user.username}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge ${getRoleBadgeClass(user.role)}`}>
                    {user.role === "admin" ? "Admin" : "User"}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge ${getStatusBadgeClass(user.isActive)}`}
                  >
                    {user.isActive ? "Hoạt động" : "Đã khóa"}
                  </span>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString("vi-VN")}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className={`btn-role ${
                        user.role === "admin" ? "demote" : "promote"
                      }`}
                      onClick={() => handleRoleChange(user._id, user.role)}
                      title={
                        user.role === "admin" ? "Hạ xuống User" : "Thăng Admin"
                      }
                    >
                      <i
                        className={`fas ${
                          user.role === "admin"
                            ? "fa-arrow-down"
                            : "fa-arrow-up"
                        }`}
                      ></i>
                      {user.role === "admin" ? "Hạ User" : "Lên Admin"}
                    </button>
                    <button
                      className={`btn-status ${
                        user.isActive ? "lock" : "unlock"
                      }`}
                      onClick={() =>
                        handleStatusChange(user._id, user.isActive)
                      }
                      title={user.isActive ? "Khóa tài khoản" : "Mở khóa"}
                    >
                      <i
                        className={`fas ${
                          user.isActive ? "fa-lock" : "fa-unlock"
                        }`}
                      ></i>
                      {user.isActive ? "Khóa" : "Mở"}
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() =>
                        handleDeleteUser(user._id, user.username, user.email)
                      }
                      title="Xóa tài khoản vĩnh viễn"
                    >
                      <i className="fas fa-trash-alt"></i>
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowPasswordModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                <i className="fas fa-key"></i> Đổi Mật Khẩu
              </h2>
              <button
                className="modal-close"
                onClick={() => setShowPasswordModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handlePasswordChange}>
              <div className="form-group">
                <label>
                  <i className="fas fa-lock"></i> Mật khẩu hiện tại
                </label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      currentPassword: e.target.value,
                    })
                  }
                  required
                  placeholder="Nhập mật khẩu hiện tại"
                />
              </div>
              <div className="form-group">
                <label>
                  <i className="fas fa-key"></i> Mật khẩu mới
                </label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      newPassword: e.target.value,
                    })
                  }
                  required
                  placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                  minLength={6}
                />
              </div>
              <div className="form-group">
                <label>
                  <i className="fas fa-check"></i> Xác nhận mật khẩu
                </label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                  placeholder="Nhập lại mật khẩu mới"
                />
              </div>
              {error && <div className="alert alert-error">{error}</div>}
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowPasswordModal(false)}
                >
                  Hủy
                </button>
                <button type="submit" className="btn-submit">
                  <i className="fas fa-save"></i> Đổi Mật Khẩu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;
