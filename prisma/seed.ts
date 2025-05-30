import { PrismaClient } from './prisma/generated/client'
import bcrypt from 'bcrypt' 
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Hash passwords (much more secure)
  const hashedPassword1 = await bcrypt.hash('password123', 12)
  const hashedPassword2 = await bcrypt.hash('password456', 12)

  const user1 = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      name: 'Alice',
      email: 'alice@example.com',
      password: hashedPassword1,
      credits: 5,
    },
  })
  console.log('✅ Created user:', user1.name)

  const user2 = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      name: 'Bob',
      email: 'bob@example.com',
      password: hashedPassword2,
      credits: 3,
    },
  })
  console.log('✅ Created user:', user2.name)

  const post1 = await prisma.post.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Hello from Alice',
      createdById: user1.id,
    },
  })
  console.log('✅ Created post:', post1.name)

  const post2 = await prisma.post.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Bob's first post",
      createdById: user2.id,
    },
  })
  console.log('✅ Created post:', post2.name)

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
