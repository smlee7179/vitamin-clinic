/**
 * localStorage 데이터를 데이터베이스로 마이그레이션하는 유틸리티
 */

export async function migrateMarqueeNotices() {
  const saved = localStorage.getItem('marqueeNotices');
  if (!saved) {
    console.log('No marquee notices to migrate');
    return;
  }

  try {
    const data = JSON.parse(saved);
    const response = await fetch('/api/migrate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'marquee', data }),
    });

    if (!response.ok) {
      throw new Error('Migration failed');
    }

    console.log('✅ Marquee notices migrated successfully');
    return true;
  } catch (error) {
    console.error('❌ Error migrating marquee notices:', error);
    return false;
  }
}

export async function migrateTreatments() {
  const saved = localStorage.getItem('treatments');
  if (!saved) {
    console.log('No treatments to migrate');
    return;
  }

  try {
    const data = JSON.parse(saved);
    const response = await fetch('/api/migrate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'treatments', data }),
    });

    if (!response.ok) {
      throw new Error('Migration failed');
    }

    console.log('✅ Treatments migrated successfully');
    return true;
  } catch (error) {
    console.error('❌ Error migrating treatments:', error);
    return false;
  }
}

export async function migrateFAQs() {
  const saved = localStorage.getItem('faqs');
  if (!saved) {
    console.log('No FAQs to migrate');
    return;
  }

  try {
    const data = JSON.parse(saved);
    const response = await fetch('/api/migrate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'faqs', data }),
    });

    if (!response.ok) {
      throw new Error('Migration failed');
    }

    console.log('✅ FAQs migrated successfully');
    return true;
  } catch (error) {
    console.error('❌ Error migrating FAQs:', error);
    return false;
  }
}

export async function migrateHospitalContent() {
  const saved = localStorage.getItem('hospitalContent');
  if (!saved) {
    console.log('No hospital content to migrate');
    return;
  }

  try {
    const data = JSON.parse(saved);
    const response = await fetch('/api/migrate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'content', data }),
    });

    if (!response.ok) {
      throw new Error('Migration failed');
    }

    console.log('✅ Hospital content migrated successfully');
    return true;
  } catch (error) {
    console.error('❌ Error migrating hospital content:', error);
    return false;
  }
}

export async function migrateAllData() {
  console.log('🚀 Starting migration from localStorage to database...');

  const results = await Promise.all([
    migrateMarqueeNotices(),
    migrateTreatments(),
    migrateFAQs(),
    migrateHospitalContent(),
  ]);

  const successCount = results.filter(Boolean).length;
  console.log(`✅ Migration complete: ${successCount}/4 successful`);

  return results.every(Boolean);
}

export function backupLocalStorage() {
  const backup = {
    marqueeNotices: localStorage.getItem('marqueeNotices'),
    treatments: localStorage.getItem('treatments'),
    faqs: localStorage.getItem('faqs'),
    hospitalContent: localStorage.getItem('hospitalContent'),
    timestamp: new Date().toISOString(),
  };

  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `localStorage-backup-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  console.log('✅ LocalStorage backup downloaded');
}
