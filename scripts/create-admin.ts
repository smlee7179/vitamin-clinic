import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🔐 Creating admin user...');

  const email = process.env.ADMIN_EMAIL || 'admin@vitamin-clinic.com';
  const password = process.env.ADMIN_PASSWORD || 'change-this-password';

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email },
  });

  if (existingAdmin) {
    console.log('✅ Admin user already exists:', email);
    return;
  }

  // Create admin user
  const hashedPassword = await hash(password, 12);

  const admin = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin user created successfully!');
  console.log('📧 Email:', admin.email);
  console.log('🔑 Password:', password);
  console.log('⚠️  Please change the password after first login!');
}

main()
  .catch((e) => {
    console.error('❌ Error creating admin user:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
