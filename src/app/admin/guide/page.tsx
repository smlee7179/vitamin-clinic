import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

export default async function AdminGuidePage() {
  // docs/admin-guide.md 파일을 읽어와서 마크다운을 HTML로 변환
  const filePath = path.join(process.cwd(), 'docs', 'admin-guide.md');
  const markdown = fs.readFileSync(filePath, 'utf-8');
  const html = marked.parse(markdown);
  return (
    <section className="prose max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
      <h1 className="text-2xl font-bold text-primary-700 mb-4">관리자페이지 사용 가이드</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  );
} 