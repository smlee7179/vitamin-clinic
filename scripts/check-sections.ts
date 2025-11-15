import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const sections = await prisma.hospitalContent.findMany({
    select: {
      section: true,
      updatedAt: true,
    }
  });

  console.log('\n데이터베이스의 모든 섹션:');
  console.log('====================');
  sections.forEach(s => {
    console.log(`- ${s.section} (업데이트: ${s.updatedAt})`);
  });
  console.log(`\n총 ${sections.length}개 섹션`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
