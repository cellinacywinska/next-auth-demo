'use client'
import React, { useEffect } from 'react';
import { signIn, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const { data: session } = useSession();


  const router = useRouter();

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
      }
      );


      if (res?.error) {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.log(error);
    }
  }

  useEffect(() => {
    if (session == null || session.user == null) {
      return;
    }

    if ('Patient' in session.user && session.user['Patient'] != null) {
      router.replace("dashboard");
    } else {
      router.replace("dietitianDashboard")
    }
  }, [session])


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(event) => setEmail(event.target.value)}
        type="text" value={email}
        placeholder="Email"
      />
      <input
        onChange={(event) => setPassword(event.target.value)}
        type="password" value={password}
        placeholder="Password"
      />
      <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2" type="submit">
        Login
      </button>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      <Link href={"/register"}>
        Don't have an account? <span className="underline">Register</span>
      </Link>
    </form>
  );

};
