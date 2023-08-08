'use client'
import React from 'react';
import {signIn} from "next-auth/react"
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // prevent reload
    event.preventDefault();
    console.log('email', email);
    console.log('password:', password);

    try {
        const res = await signIn("credentials", {
             email,
             password,
             redirect: false,
        });

    } catch (error){

    }
    }


  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
        onChange={(event) => setEmail(event.target.value)}
         type="text" value={email} />
      </label>
      <label>
        Password:
        <input 
        onChange={(event) => setPassword(event.target.value)}
        type="password" value={password} />
      </label>
      <button className="login-button" type="submit">Login</button>
    </form>
  );
  
};
