import React, { useState } from 'react';
import './Profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { login, logout } from '../redux/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signOut, deleteUser } from 'firebase/auth';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState('');
  const [editing, setEditing] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !email.trim()) {
      toast.error('⚠️ Name and email cannot be empty');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('⚠️ Please enter a valid email address');
      return;
    }

    try {
      const uid = auth.currentUser?.uid;
      if (uid) {
        await updateDoc(doc(db, 'users', uid), { name, email });
        dispatch(login({ name, email }));
        toast.success('✅ Profile updated in Firestore!');
        setEditing(false);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      toast.error(`❌ Error updating profile: ${message}`);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('⚠️ Email and password are required.');
      return;
    }

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      dispatch(login({ name: userCred.user.displayName || 'User', email }));
      toast.success('✅ Logged in successfully!');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      toast.error(`❌ ${message}`);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logout());
    setName('');
    setEmail('');
    setPassword('');
    setEditing(false);
  };

  const handleDeleteAccount = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    try {
      await deleteUser(auth.currentUser!);
      await deleteDoc(doc(db, 'users', uid));
      dispatch(logout());
      setName('');
      setEmail('');
      toast.success('🗑️ Account deleted successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      toast.error(`❌ Failed to delete account: ${message}`);
    }
  };

  return (
    <div className="profile-page">
      <h2>👤 My Profile</h2>

      <div className="profile-card">
        <img src="https://i.pravatar.cc/100" alt="User Avatar" className="profile-avatar" />
        <div className={`profile-info ${editing ? 'editing' : ''}`}>
          {editing ? (
            <>
              <p>
                <strong>Name:</strong>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </p>
              <p>
                <strong>Email:</strong>
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
          <>
            <button onClick={handleLogout} className="profile-button">
              📕 Logout
            </button>
            <button
              onClick={handleDeleteAccount}
              className="profile-button"
              style={{ backgroundColor: '#dc3545' }}
            >
              ❌ Delete Account
            </button>
          </>
        ) : (
          <>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="profile-input"
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="profile-input"
            />
            <button onClick={handleLogin} className="profile-button">
              🔐 Log In
            </button>
          </>
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
