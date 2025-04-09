import React, { useState } from 'react';
import './Profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { login, logout, updateProfile } from '../redux/userSlice';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    if (!name.trim() || !email.trim()) {
      toast.error('⚠️ Name and email cannot be empty');
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('⚠️ Please enter a valid email address');
      return;
    }
  
    dispatch(updateProfile({ name, email }));
    setEditing(false);
    toast.success('✅ Profile updated successfully!');
  };

  const handleLogin = () => {
    const mockUser = {
      name: 'User',
      email: 'user@example.com'
    };
    dispatch(login(mockUser));
    setName(mockUser.name);
    setEmail(mockUser.email);
  };

  const handleLogout = () => {
    dispatch(logout());
    setName('');
    setEmail('');
    setEditing(false);
  };

  return (
    <div className="profile-page">
      <h2>👤 My Profile</h2>

      <div className="profile-card">
        <img
          src="https://i.pravatar.cc/100"
          alt="User Avatar"
          className="profile-avatar"
        />
        <div className={`profile-info ${editing ? 'editing' : ''}`}>
          {editing ? (
            <>
              <p><strong>Name:</strong>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </p>
              <p><strong>Email:</strong>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </p>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {user.name || 'Not logged in'}</p>
              <p><strong>Email:</strong> {user.email || 'Not available'}</p>
            </>
          )}
          <p><strong>Member Since:</strong> Jan 2024</p>
        </div>
      </div>

      <div className="profile-actions">
      {user.name && !editing && (
        <button onClick={() => setEditing(true)} className="profile-button">
          ✏️ Edit
        </button>
)}

      {editing && (
        <button onClick={handleSave} className="profile-button">
          💾 Save
        </button>
      )}

      {user.name ? (
        <button onClick={handleLogout} className="profile-button">
          📕 Logout
        </button>
      ) : (
        <button onClick={handleLogin} className="profile-button">
          🔐 Log In
        </button>
      )}

      <Link to="/" className="profile-button">
        🏬 Back to Store
      </Link>
      <ToastContainer position="bottom-center" autoClose={2000} />
      </div>
    </div>
  );
};

export default Profile;
