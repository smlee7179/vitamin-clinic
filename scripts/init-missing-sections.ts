import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('\n🔧 누락된 섹션 초기화 시작...\n');

  // Features 섹션
  const features = await prisma.hospitalContent.upsert({
    where: { section: 'features' },
    update: {},
    create: {
      section: 'features',
      data: JSON.stringify({
        features: [
          {
            icon: 'ri-user-heart-line',
            title: '노인 전문 진료',
            description: '노인 환자분들을 위한 맞춤 진료 서비스를 제공합니다.'
          },
          {
            icon: 'ri-shield-check-line',
            title: '안전한 치료',
            description: '최신 장비와 숙련된 의료진으로 안전하게 치료합니다.'
          },
          {
            icon: 'ri-heart-pulse-line',
            title: '체계적 관리',
            description: '환자 개개인에 맞는 체계적인 통증 관리를 제공합니다.'
          }
        ]
      })
    }
  });
  console.log('✅ features 섹션 생성');

  // Marquee 섹션
  const marquee = await prisma.hospitalContent.upsert({
    where: { section: 'marquee' },
    update: {},
    create: {
      section: 'marquee',
      data: JSON.stringify([
        { icon: 'ri-time-line', text: '평일 09:00 - 18:00 | 토요일 09:00 - 13:00' },
        { icon: 'ri-phone-line', text: '전화: 051-469-7581' },
        { icon: 'ri-map-pin-line', text: '부산 동구 중앙대로 375' }
      ])
    }
  });
  console.log('✅ marquee 섹션 생성');

  // Treatments 섹션
  const treatments = await prisma.hospitalContent.upsert({
    where: { section: 'treatments' },
    update: {},
    create: {
      section: 'treatments',
      data: JSON.stringify([
        {
          id: '1',
          title: '신경차단술',
          description: '통증을 유발하는 신경에 직접 약물을 주입하여 통증을 완화합니다.',
          icon: 'ri-syringe-line'
        },
        {
          id: '2',
          title: '물리치료',
          description: '전문 장비를 활용한 물리치료로 통증을 완화하고 기능을 회복합니다.',
          icon: 'ri-pulse-line'
        },
        {
          id: '3',
          title: '도수치료',
          description: '전문 치료사의 숙련된 손기술로 근육과 관절을 치료합니다.',
          icon: 'ri-hand-heart-line'
        }
      ])
    }
  });
  console.log('✅ treatments 섹션 생성');

  // FAQ 섹션
  const faq = await prisma.hospitalContent.upsert({
    where: { section: 'faq' },
    update: {},
    create: {
      section: 'faq',
      data: JSON.stringify([
        {
          id: '1',
          category: '진료',
          question: '예약은 어떻게 하나요?',
          answer: '전화(051-469-7581)로 예약하실 수 있습니다.'
        },
        {
          id: '2',
          category: '진료',
          question: '진료 시간은 어떻게 되나요?',
          answer: '평일 09:00-18:00, 토요일 09:00-13:00입니다. 일요일과 공휴일은 휴진입니다.'
        },
        {
          id: '3',
          category: '치료',
          question: '통증 치료는 어떻게 진행되나요?',
          answer: '환자의 상태를 정확히 진단한 후, 개인별 맞춤 치료 계획을 수립하여 진행합니다.'
        }
      ])
    }
  });
  console.log('✅ faq 섹션 생성');

  console.log('\n🎉 모든 누락된 섹션이 성공적으로 생성되었습니다!\n');
}

main()
  .catch((error) => {
    console.error('❌ 에러 발생:', error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
