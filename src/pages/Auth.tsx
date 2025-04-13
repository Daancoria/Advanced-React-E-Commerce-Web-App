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
  // State management for form inputs and registration mode
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between login and registration
  const [email, setEmail] = useState(''); // Email input state
  const [password, setPassword] = useState(''); // Password input state
  const [name, setName] = useState(''); // Name input state (only for registration)

  // Redux dispatch and navigation hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle authentication (login or registration)
  const handleAuth = async () => {
    try {
      if (isRegistering) {
        // Registration logic
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", userCred.user.uid), {
          name,
          email,
          createdAt: new Date(),
        });
        dispatch(login({ name, email })); // Update Redux state with user info
        toast.success('🎉 Account created successfully!'); // Show success toast
      } else {
        // Login logic
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        dispatch(login({ name: userCred.user.displayName || 'User', email })); // Update Redux state
        toast.success('✅ Logged in successfully!'); // Show success toast
      }
      navigate('/profile'); // Redirect to the profile page after successful login/registration
    } catch (error: any) {
      // Handle errors and show error toast
      toast.error(`⚠️ ${error.message}`);
    }
  };

  return (
    <div className="profile-page">
      {/* Page Header */}
      <h2>{isRegistering ? '📝 Register' : '🔐 Login'}</h2>

      {/* Authentication Form */}
      <div className="profile-card">
        {/* Name input (only visible during registration) */}
        {isRegistering && (
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        )}

        {/* Email input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {/* Submit button for login or registration */}
        <button className="profile-button" onClick={handleAuth}>
          {isRegistering ? '📩 Sign Up' : '➡️ Login'}
        </button>

        {/* Toggle button to switch between login and registration */}
        <button
          className="profile-button"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? '👤 Already have an account?' : '🆕 Create an account'}
        </button>
      </div>

      {/* Toast notifications */}
      <ToastContainer position="bottom-center" autoClose={2000} />
    </div>
  );
};

export default Auth;
