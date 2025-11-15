/**
 * Diagnostic Script: Check Hero Data Flow
 *
 * This script verifies:
 * 1. Database contains hero data with backgroundImage URL
 * 2. API endpoint returns correct data structure
 * 3. Image URL is properly formatted and accessible
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('\n🔍 =================================================================');
  console.log('🔍 DIAGNOSTIC: Hero Section Image Persistence Issue');
  console.log('🔍 =================================================================\n');

  try {
    // Step 1: Check if hero section exists in database
    console.log('📊 Step 1: Checking database for hero section...\n');

    const heroContent = await prisma.hospitalContent.findUnique({
      where: { section: 'hero' }
    });

    if (!heroContent) {
      console.log('❌ ERROR: No hero section found in database!');
      console.log('   → This means data was never saved.');
      console.log('   → Check HeroEditor save function.\n');
      return;
    }

    console.log('✅ Hero section found in database');
    console.log('   ID:', heroContent.id);
    console.log('   Section:', heroContent.section);
    console.log('   Updated At:', heroContent.updatedAt);
    console.log('   Data (raw):', heroContent.data.substring(0, 100) + '...\n');

    // Step 2: Parse the JSON data
    console.log('📊 Step 2: Parsing JSON data...\n');

    let parsedData;
    try {
      parsedData = JSON.parse(heroContent.data);
      console.log('✅ JSON parsing successful');
      console.log('   Parsed data keys:', Object.keys(parsedData));
      console.log('   Full parsed data:', JSON.stringify(parsedData, null, 2));
    } catch (error) {
      console.log('❌ ERROR: Failed to parse JSON!');
      console.log('   Error:', error);
      console.log('   Raw data:', heroContent.data);
      return;
    }

    // Step 3: Check backgroundImage field
    console.log('\n📊 Step 3: Checking backgroundImage field...\n');

    if (!parsedData.backgroundImage) {
      console.log('❌ ERROR: backgroundImage field is missing or empty!');
      console.log('   → Image URL was not saved to database.');
      console.log('   → Check HeroEditor state before save.');
      console.log('   Available fields:', Object.keys(parsedData));
    } else {
      console.log('✅ backgroundImage field exists');
      console.log('   URL:', parsedData.backgroundImage);
      console.log('   URL Length:', parsedData.backgroundImage.length);
      console.log('   Is Vercel Blob URL:', parsedData.backgroundImage.includes('blob.vercel-storage.com'));
    }

    // Step 4: Check all other hero fields
    console.log('\n📊 Step 4: All Hero Section Fields:\n');
    console.log('   Title:', parsedData.title || '(empty)');
    console.log('   Subtitle:', parsedData.subtitle || '(empty)');
    console.log('   Description:', parsedData.description || '(empty)');
    console.log('   Button Text:', parsedData.buttonText || '(empty)');
    console.log('   Button Link:', parsedData.buttonLink || '(empty)');
    console.log('   Background Image:', parsedData.backgroundImage || '(empty)');

    // Step 5: Simulate API response
    console.log('\n📊 Step 5: Simulating API GET /api/content?section=hero\n');
    console.log('   API would return:', JSON.stringify(parsedData, null, 2));

    // Step 6: Check for potential issues
    console.log('\n📊 Step 6: Checking for potential issues...\n');

    const issues = [];

    if (!parsedData.backgroundImage || parsedData.backgroundImage.trim() === '') {
      issues.push('❌ backgroundImage is empty or missing');
    }

    if (parsedData.backgroundImage && !parsedData.backgroundImage.startsWith('http')) {
      issues.push('⚠️  backgroundImage URL does not start with http/https');
    }

    if (parsedData.backgroundImage && !parsedData.backgroundImage.includes('blob.vercel-storage.com')) {
      issues.push('⚠️  backgroundImage URL is not from Vercel Blob Storage');
    }

    if (typeof parsedData.backgroundImage !== 'string') {
      issues.push('❌ backgroundImage is not a string');
    }

    if (issues.length === 0) {
      console.log('✅ No issues found with database data!');
      console.log('   → Database has correct image URL.');
      console.log('   → Problem might be in frontend loading logic.');
      console.log('   → Check HeroSection useEffect and state management.');
    } else {
      console.log('⚠️  Issues found:');
      issues.forEach(issue => console.log('   ' + issue));
    }

    // Step 7: Summary
    console.log('\n🔍 =================================================================');
    console.log('🔍 DIAGNOSTIC SUMMARY');
    console.log('🔍 =================================================================\n');

    if (!parsedData.backgroundImage) {
      console.log('🔴 CRITICAL ISSUE: backgroundImage URL is NOT saved in database');
      console.log('\n   Probable causes:');
      console.log('   1. HeroEditor state is not including backgroundImage when saving');
      console.log('   2. ModernImageUpload onUpload callback not being called');
      console.log('   3. updateField function not updating state correctly');
      console.log('\n   Next steps:');
      console.log('   → Add console.log to HeroEditor handleSave to check heroData state');
      console.log('   → Verify ModernImageUpload onUpload callback is firing');
      console.log('   → Check browser console for errors during save\n');
    } else {
      console.log('🟢 Database contains correct image URL');
      console.log('   URL:', parsedData.backgroundImage);
      console.log('\n   Next steps:');
      console.log('   → Check frontend HeroSection loading logic');
      console.log('   → Add console.log to HeroSection useEffect');
      console.log('   → Verify API response in browser Network tab');
      console.log('   → Check if state merge is working correctly\n');
    }

  } catch (error) {
    console.log('\n❌ FATAL ERROR during diagnosis:');
    console.log('   Error:', error);
    console.log('   Stack:', (error as Error).stack);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
