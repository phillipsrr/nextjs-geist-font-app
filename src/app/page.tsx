"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const action = isRegister ? "register" : "login";
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, fullName, action }),
    });
    const data = await response.json();
    if (response.ok) {
      setMessage(data.message);
      if (action === "login") {
        // Redirect to tasks page after successful login
        router.push("/tasks");
      }
    } else {
      setMessage(data.error || "Error occurred");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black font-sans p-4">
      <h1 className="text-3xl font-bold mb-6">Task Management App</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        {isRegister && (
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        )}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          {isRegister ? "Register" : "Login"}
        </button>
      </form>
      <button
        onClick={() => {
          setIsRegister(!isRegister);
          setMessage("");
        }}
        className="mt-4 text-sm underline"
      >
        {isRegister ? "Already have an account? Login" : "New user? Register"}
      </button>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
