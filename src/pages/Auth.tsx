import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAuth = async () => {
    try {
      if (isRegistering) {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', userCred.user.uid), {
          name,
          email,
          createdAt: new Date(),
        });
        dispatch(login({ name, email }));
        toast.success('🎉 Account created successfully!');
      } else {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        dispatch(login({ name: userCred.user.displayName || 'User', email }));
        toast.success('✅ Logged in successfully!');
      }
      navigate('/profile');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An unknown error occurred';
      toast.error(`⚠️ ${message}`);
    }
  };

  return (
    <div className="profile-page">
      <h2>{isRegistering ? '📝 Register' : '🔐 Login'}</h2>
      <div className="profile-card">
        {isRegistering && (
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className="profile-button" onClick={handleAuth}>
          {isRegistering ? '📩 Sign Up' : '➡️ Login'}
        </button>

        <button
          className="profile-button"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? '👤 Already have an account?' : '🆕 Create an account'}
        </button>
      </div>

      <ToastContainer position="bottom-center" autoClose={2000} />
    </div>
  );
};

export default Auth;
