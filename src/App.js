import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const signupUser = async (userId, password, email) => {
  try {
    const response = await axios.post(`${SERVER_URL}/api/user/signup`, {
      userId,
      password,
      email,
    });
    if (response.status === 200) {
      alert('회원가입이 완료되었습니다.');
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert('이미 사용 중인 아이디입니다.');
    } else {
      alert('회원가입 실패: ' + (error.response ? error.response.data : error.message));
    }
  }
};

export const loginUser = async (userId, password) => {
  try {
    const response = await axios.post(`${SERVER_URL}/api/user/login`, {
      userId,
      password,
    });
    if (response.status === 200) {
      alert(`로그인 성공, 사용자 고유 id: ${response.data.userId}`);
    }
  } catch (error) {
    alert('로그인 실패: ' + (error.response ? error.response.data : error.message));
  }
};

const App = () => {
  const [signupUserId, setSignupUserId] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');

  const [loginUserId, setLoginUserId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signupUser(signupUserId, signupPassword, signupEmail);
    } catch (error) {
      alert('회원가입 처리 중 오류가 발생했습니다.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(loginUserId, loginPassword);
    } catch (error) {
      alert('로그인 처리 중 오류가 발생했습니다.');
    }
  };

  return (
     <div>
        <h2>회원가입</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="아이디"
            value={signupUserId}
            onChange={(e) => setSignupUserId(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
          <input
            type="email"
            placeholder="이메일"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
            required
          />
          <button type="submit" className="submit-btn">회원가입 완료</button>
        </form>

        <h2>로그인</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="아이디"
            value={loginUserId}
            onChange={(e) => setLoginUserId(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <button type="submit" className="submit-btn">로그인 완료</button>
        </form>
    </div>
  );
};

export default App;
