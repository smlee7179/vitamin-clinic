"use client";
import { useState, useEffect } from "react";

const SECTION_LABELS: Record<string, string> = {
  director: "원장님 소개",
  gallery: "시설 갤러리",
};

export default function AdminAbout() {
  // 섹션별 데이터
  const [sections, setSections] = useState<any>({ director: [], gallery: [] });
  const [loading, setLoading] = useState(false);
  // 원장님 소개
  const [showDirectorForm, setShowDirectorForm] = useState(false);
  const [directorForm, setDirectorForm] = useState({ title: "", content: "", image: "" });
  const [directorImgFile, setDirectorImgFile] = useState<File | null>(null);
  // 시설 갤러리
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [galleryForm, setGalleryForm] = useState({ title: "", content: "", image: "" });
  const [galleryImgFile, setGalleryImgFile] = useState<File | null>(null);

  // 데이터 불러오기
  useEffect(() => {
    fetch("/api/admin/about")
      .then(res => res.json())
      .then(arr => {
        const bySection: any = { director: [], gallery: [] };
        arr.forEach((item: any) => {
          if (bySection[item.section]) bySection[item.section].push(item);
        });
        setSections(bySection);
      });
  }, []);

  // 원장님 등록
  const saveDirector = async () => {
    setLoading(true);
    let imageUrl = directorForm.image;
    if (directorImgFile) {
      const formData = new FormData();
      formData.append("file", directorImgFile);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      imageUrl = data.url;
    }
    const res = await fetch("/api/admin/about", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "director", title: directorForm.title, content: directorForm.content, image: imageUrl, order: sections.director.length, fontSize: "normal" }),
    });
    const saved = await res.json();
    setSections((prev: any) => ({ ...prev, director: [...prev.director, saved] }));
    setDirectorForm({ title: "", content: "", image: "" });
    setDirectorImgFile(null);
    setShowDirectorForm(false);
    setLoading(false);
  };
  // 원장님 삭제
  const deleteDirector = async (id: string) => {
    setLoading(true);
    await fetch("/api/admin/about", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setSections((prev: any) => ({ ...prev, director: prev.director.filter((d: any) => d.id !== id) }));
    setLoading(false);
  };

  // 시설 갤러리 등록
  const saveGallery = async () => {
    setLoading(true);
    let imageUrl = galleryForm.image;
    if (galleryImgFile) {
      const formData = new FormData();
      formData.append("file", galleryImgFile);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      imageUrl = data.url;
    }
    const res = await fetch("/api/admin/about", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "gallery", title: galleryForm.title, content: galleryForm.content, image: imageUrl, order: sections.gallery.length, fontSize: "normal" }),
    });
    const saved = await res.json();
    setSections((prev: any) => ({ ...prev, gallery: [...prev.gallery, saved] }));
    setGalleryForm({ title: "", content: "", image: "" });
    setGalleryImgFile(null);
    setShowGalleryForm(false);
    setLoading(false);
  };
  // 시설 갤러리 삭제
  const deleteGallery = async (id: string) => {
    setLoading(true);
    await fetch("/api/admin/about", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setSections((prev: any) => ({ ...prev, gallery: prev.gallery.filter((d: any) => d.id !== id) }));
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-bold text-primary-600 mb-4">병원 소개 관리</h1>
      {/* 원장님 소개 리스트 */}
      <div className="mb-4 flex items-center justify-between">
        <div className="font-bold text-primary-700">{SECTION_LABELS.director}</div>
        <button
          className="bg-primary-500 text-white px-3 py-1 rounded font-bold hover:bg-primary-600 text-sm"
          onClick={() => setShowDirectorForm(v => !v)}
          disabled={loading}
        >
          {showDirectorForm ? "취소" : "추가"}
        </button>
      </div>
      {showDirectorForm && (
        <div className="mb-6 p-4 bg-white rounded shadow">
          <input
            className="w-full border rounded p-2 mb-2"
            placeholder="이름/직함"
            value={directorForm.title}
            onChange={e => setDirectorForm(f => ({ ...f, title: e.target.value }))}
            disabled={loading}
          />
          <textarea
            className="w-full border rounded p-2 mb-2"
            placeholder="소개 내용"
            value={directorForm.content}
            onChange={e => setDirectorForm(f => ({ ...f, content: e.target.value }))}
            disabled={loading}
          />
          <input
            type="file"
            accept="image/*"
            onChange={e => setDirectorImgFile(e.target.files?.[0] || null)}
            disabled={loading}
          />
          <button
            className="bg-primary-500 text-white px-4 py-2 rounded font-bold hover:bg-primary-600 mt-2"
            onClick={saveDirector}
            disabled={loading}
          >
            등록
          </button>
        </div>
      )}
      <ul className="divide-y">
        {sections.director.map((d: any) => (
          <li key={d.id} className="flex items-center gap-4 py-4">
            <img src={d.image || "/director.jpg"} alt="프로필" className="w-20 h-20 object-cover rounded-xl border" />
            <div className="flex-1">
              <div className="font-bold text-lg text-primary-700">{d.title}</div>
              <div className="text-neutral-700 text-sm" dangerouslySetInnerHTML={{ __html: d.content }} />
            </div>
            <button
              className="text-red-500 hover:underline text-sm ml-2"
              onClick={() => deleteDirector(d.id)}
              disabled={loading}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
      {/* 시설 갤러리 리스트 */}
      <div className="mb-4 flex items-center justify-between mt-8">
        <div className="font-bold text-primary-700">{SECTION_LABELS.gallery}</div>
        <button
          className="bg-primary-500 text-white px-3 py-1 rounded font-bold hover:bg-primary-600 text-sm"
          onClick={() => setShowGalleryForm(v => !v)}
          disabled={loading}
        >
          {showGalleryForm ? "취소" : "추가"}
        </button>
      </div>
      {showGalleryForm && (
        <div className="mb-6 p-4 bg-white rounded shadow">
          <input
            className="w-full border rounded p-2 mb-2"
            placeholder="시설명/설명 제목"
            value={galleryForm.title}
            onChange={e => setGalleryForm(f => ({ ...f, title: e.target.value }))}
            disabled={loading}
          />
          <textarea
            className="w-full border rounded p-2 mb-2"
            placeholder="설명"
            value={galleryForm.content}
            onChange={e => setGalleryForm(f => ({ ...f, content: e.target.value }))}
            disabled={loading}
          />
          <input
            type="file"
            accept="image/*"
            onChange={e => setGalleryImgFile(e.target.files?.[0] || null)}
            disabled={loading}
          />
          <button
            className="bg-primary-500 text-white px-4 py-2 rounded font-bold hover:bg-primary-600 mt-2"
            onClick={saveGallery}
            disabled={loading}
          >
            등록
          </button>
        </div>
      )}
      <ul className="divide-y">
        {sections.gallery.map((d: any) => (
          <li key={d.id} className="flex items-center gap-4 py-4">
            <img src={d.image || "/device.jpg"} alt="시설" className="w-20 h-20 object-cover rounded-xl border" />
            <div className="flex-1">
              <div className="font-bold text-lg text-primary-700">{d.title}</div>
              <div className="text-neutral-700 text-sm" dangerouslySetInnerHTML={{ __html: d.content }} />
            </div>
            <button
              className="text-red-500 hover:underline text-sm ml-2"
              onClick={() => deleteGallery(d.id)}
              disabled={loading}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} 