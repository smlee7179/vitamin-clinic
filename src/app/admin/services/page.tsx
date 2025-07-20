"use client";
import { useState, useEffect } from "react";

export default function AdminServices() {
  const [services, setServices] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // 데이터 불러오기
  useEffect(() => {
    fetch("/api/admin/services")
      .then(res => res.json())
      .then(setServices);
  }, []);

  // 추가
  const addService = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const res = await fetch("/api/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: input, title: input, order: services.length }),
    });
    const newService = await res.json();
    setServices([...services, newService]);
    setInput("");
    setLoading(false);
  };

  // 삭제
  const deleteService = async (id: string) => {
    setLoading(true);
    await fetch("/api/admin/services", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setServices(services.filter(s => s.id !== id));
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-primary-700 mb-4" aria-label="진료과목 관리">진료과목 관리</h1>
      <div className="flex mb-4 gap-2">
        <input
          className="flex-1 border-2 border-primary-300 rounded p-2 text-lg focus:outline focus:outline-2 focus:outline-primary-500 focus:shadow-primary-200 focus:scale-105 transition-all duration-200"
          placeholder="진료과목 입력"
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={loading}
          aria-label="진료과목 입력"
        />
        <button
          className="bg-primary-500 text-white px-4 py-2 rounded font-bold hover:bg-primary-600 active:scale-95 transition-all duration-150 focus:outline focus:outline-2 focus:outline-primary-700 text-lg shadow-md hover:shadow-lg"
          onClick={addService}
          disabled={loading}
          aria-label="진료과목 추가"
        >
          추가
        </button>
      </div>
      <ul className="divide-y">
        {services.map(s => (
          <li key={s.id} className="flex items-center justify-between py-2 group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white/80 rounded-lg px-2">
            <span className="text-lg text-neutral-800 group-hover:text-primary-600 transition-colors duration-200" tabIndex={0}>{s.title}</span>
            <button
              className="text-red-500 hover:underline text-lg ml-2 focus:outline focus:outline-2 focus:outline-red-500 active:scale-95 transition-all duration-150"
              onClick={() => deleteService(s.id)}
              disabled={loading}
              aria-label={`진료과목 ${s.title} 삭제`}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} 