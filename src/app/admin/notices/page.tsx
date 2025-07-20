"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function AdminNotices() {
  const [notices, setNotices] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  // 데이터 불러오기
  useEffect(() => {
    fetch("/api/admin/notices")
      .then(res => res.json())
      .then(setNotices);
  }, []);

  // 추가
  const addNotice = async () => {
    if (!title.trim() || !content.trim()) return;
    setLoading(true);
    const res = await fetch("/api/admin/notices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, imageUrl }),
    });
    const newNotice = await res.json();
    setNotices([newNotice, ...notices]);
    setTitle("");
    setContent("");
    setImageUrl("");
    setLoading(false);
  };

  // 삭제
  const deleteNotice = async (id: string) => {
    setLoading(true);
    await fetch("/api/admin/notices", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setNotices(notices.filter(n => n.id !== id));
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-primary-700 mb-4" aria-label="공지사항 관리">공지사항 관리</h1>
      <div className="mb-4">
        <input
          className="w-full border-2 border-primary-300 rounded p-2 mb-2 text-lg focus:outline focus:outline-2 focus:outline-primary-500 focus:shadow-primary-200 focus:scale-105 transition-all duration-200"
          placeholder="제목"
          value={title}
          onChange={e => setTitle(e.target.value)}
          disabled={loading}
          aria-label="공지 제목 입력"
        />
        <label className="block mb-2 text-base font-bold text-primary-700">내용</label>
        <ReactQuill
          value={content}
          onChange={setContent}
          theme="snow"
          className="mb-2 bg-white text-lg"
          aria-label="공지 내용 입력"
        />
        <input
          type="file"
          accept="image/*"
          onChange={async e => {
            const file = e.target.files?.[0];
            if (!file) return;
            const formData = new FormData();
            formData.append("file", file);
            const res = await fetch("/api/upload", {
              method: "POST",
              body: formData,
            });
            const data = await res.json();
            setImageUrl(data.url);
          }}
          disabled={loading}
          aria-label="공지 이미지 업로드"
        />
        {imageUrl && <img src={imageUrl} alt="공지 이미지 미리보기" className="w-32 h-24 object-cover mb-2 rounded border-2 border-primary-300 focus:outline focus:outline-2 focus:outline-primary-500" tabIndex={0} />}
        <button
          className="bg-primary-500 text-white px-4 py-2 rounded font-bold hover:bg-primary-600 active:scale-95 transition-all duration-150 focus:outline focus:outline-2 focus:outline-primary-700 text-lg shadow-md hover:shadow-lg"
          onClick={addNotice}
          disabled={loading}
          aria-label="공지 등록"
        >
          등록
        </button>
      </div>
      <ul className="divide-y">
        {notices.map(n => (
          <li key={n.id} className="py-2 flex items-center justify-between group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white/80 rounded-lg px-2">
            <div>
              <div className="font-semibold text-lg text-neutral-800 group-hover:text-primary-600 transition-colors duration-200" tabIndex={0}>{n.title}</div>
              <div className="text-sm text-neutral-500 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: n.content }} />
              {n.imageUrl && <img src={n.imageUrl} alt="공지 이미지" className="w-32 h-24 object-cover mt-2 rounded border-2 border-primary-300" tabIndex={0} />}
            </div>
            <button
              className="text-red-500 hover:underline text-lg ml-4 focus:outline focus:outline-2 focus:outline-red-500 active:scale-95 transition-all duration-150"
              onClick={() => deleteNotice(n.id)}
              disabled={loading}
              aria-label={`공지 ${n.title} 삭제`}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} 