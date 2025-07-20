"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // 간단한 하드코딩 인증 (실제 서비스 시 DB/암호화 필요)
    if (email === "admin@vitamin.com" && password === "vitamin1234") {
      localStorage.setItem("admin-auth", "true");
      router.push("/admin");
    } else {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold text-primary-600 mb-6 text-center">관리자 로그인</h2>
        <label className="block mb-2 text-sm font-medium text-neutral-700">이메일</label>
        <input type="email" className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-300" value={email} onChange={e => setEmail(e.target.value)} required />
        <label className="block mb-2 text-sm font-medium text-neutral-700">비밀번호</label>
        <input type="password" className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-300" value={password} onChange={e => setPassword(e.target.value)} required />
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <button type="submit" className="w-full bg-primary-500 text-white py-2 rounded font-semibold hover:bg-primary-600 transition">로그인</button>
      </form>
    </div>
  );
} 