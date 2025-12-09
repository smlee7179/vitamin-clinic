const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function migrateTreatmentPages() {
  console.log('Starting treatment pages data migration...');

  try {
    // Fetch all treatment pages
    const treatmentPages = await prisma.treatmentPage.findMany();

    console.log(`Found ${treatmentPages.length} treatment pages to migrate`);

    for (const page of treatmentPages) {
      console.log(`\nMigrating ${page.treatmentType}...`);

      // Combine introText1 and introText2 into description
      const description = [
        page.introText1 || '',
        page.introText2 || ''
      ]
        .filter(text => text.trim().length > 0)
        .join('\n\n');

      console.log(`  - Description length: ${description.length} characters`);

      // Update the page
      await prisma.treatmentPage.update({
        where: { id: page.id },
        data: {
          description: description || '치료 설명을 입력해주세요.'
        }
      });

      console.log(`  ✓ Successfully migrated ${page.treatmentType}`);
    }

    console.log('\n✓ All treatment pages migrated successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

migrateTreatmentPages();
