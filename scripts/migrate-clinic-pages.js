const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function migrateClinicPages() {
  console.log('Starting clinic pages data migration...');

  try {
    // Fetch all clinic pages
    const clinicPages = await prisma.clinicPage.findMany();

    console.log(`Found ${clinicPages.length} clinic pages to migrate`);

    for (const page of clinicPages) {
      console.log(`\nMigrating ${page.clinicType}...`);

      // Combine introText1 and introText2 into description
      const description = [
        page.introText1 || '',
        page.introText2 || ''
      ]
        .filter(text => text.trim().length > 0)
        .join('\n\n');

      console.log(`  - Description length: ${description.length} characters`);

      // Update the page
      await prisma.clinicPage.update({
        where: { id: page.id },
        data: {
          description: description || '클리닉 설명을 입력해주세요.'
        }
      });

      console.log(`  ✓ Successfully migrated ${page.clinicType}`);
    }

    console.log('\n✓ All clinic pages migrated successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

migrateClinicPages();
