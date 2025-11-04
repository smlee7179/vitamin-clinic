import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import * as readline from 'readline';

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function main() {
  console.log('🔐 비밀번호 변경 도구\n');

  // Get email
  const email = await question('사용자 이메일을 입력하세요: ');

  if (!email) {
    console.error('❌ 이메일을 입력해주세요.');
    process.exit(1);
  }

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.error(`❌ 사용자를 찾을 수 없습니다: ${email}`);
    process.exit(1);
  }

  console.log(`✅ 사용자를 찾았습니다: ${user.email} (${user.role})\n`);

  // Get new password
  const newPassword = await question('새 비밀번호를 입력하세요: ');

  if (!newPassword || newPassword.length < 8) {
    console.error('❌ 비밀번호는 최소 8자 이상이어야 합니다.');
    process.exit(1);
  }

  // Confirm password
  const confirmPassword = await question('비밀번호를 다시 입력하세요: ');

  if (newPassword !== confirmPassword) {
    console.error('❌ 비밀번호가 일치하지 않습니다.');
    process.exit(1);
  }

  // Hash new password
  console.log('\n🔄 비밀번호를 암호화하는 중...');
  const hashedPassword = await hash(newPassword, 12);

  // Update password
  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });

  console.log('✅ 비밀번호가 성공적으로 변경되었습니다!\n');
  console.log('📧 이메일:', email);
  console.log('🔐 새 비밀번호:', newPassword);
  console.log('\n⚠️  비밀번호를 안전한 곳에 보관하세요!\n');
}

main()
  .catch((e) => {
    console.error('❌ 오류가 발생했습니다:', e);
    process.exit(1);
  })
  .finally(async () => {
    rl.close();
    await prisma.$disconnect();
  });
