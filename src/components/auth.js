import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router';

export default function Auth() {
  const history = useHistory();
  const { isLogin, setIsLogin, mutation } = useAuth();
  const [authenticate, { data, loading, error }] = useMutation(mutation);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log(data);
    if (data && data.login !== 'Incorrect Username or Password') {
      localStorage.setItem('token', data?.login || data?.signup);
      history.push('/home');
    };
  }, [data, history]);


  // need new determining factor for login error
  // if (error) return `Submission Failed ${error.message}`;

  const handleToggle = () => {
    setIsLogin(prev => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticate({ variables: { username, password } });
    
  };

  return (
    <div className={container}>
      <form className={formStyle}>
        <label className={labelStyle}>
      Username
          <input 
            className={inputStyle}
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}/>
        </label>
        <label className={labelStyle}>
        Password
          <input 
            className={inputStyle}
            type="text"
            value={password}
            onChange={e => setPassword(e.target.value)}/>
        </label>
        <button 
          className={buttonStyle} 
          onClick={handleSubmit}
        >
          {isLogin ? 'Log In' : 'Sign Up'}</button>
      </form>
      <button onClick={handleToggle}>{isLogin ? 'Need to sign up?' : 'Already have an account?'}</button>
    </div>
  );
}

const container = `
flex
flex-col`;

const formStyle = `
flex 
bg-gray-200 
flex-col 
w-6/12 
h-40
p-4
items-center
justify-evenly
m-40
rounded
`;

const labelStyle = `
w-max
flex
justify-evenly
`;

const inputStyle = `
border
w-2/4
`;


const buttonStyle = `
bg-green-300
rounded
w-1/4
`;