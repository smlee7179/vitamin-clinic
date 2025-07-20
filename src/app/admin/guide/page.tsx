"use client";
import { useEffect, useState } from "react";
import { marked } from "marked";

export default function AdminGuidePage() {
  const [html, setHtml] = useState("");
  useEffect(() => {
    async function fetchGuide() {
      const res = await fetch("/admin-guide.md");
      const md = await res.text();
      setHtml(marked.parse(md));
    }
    fetchGuide();
  }, []);
  return (
    <section className="prose max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
      <h1 className="text-2xl font-bold text-primary-700 mb-4">관리자페이지 사용 가이드</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  );
} 