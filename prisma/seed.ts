import { PrismaClient } from "@prisma/client"; 


const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.upsert({
        where: {
            email: 'test@test.com' 
        },
        update: {},
        create: {
            email: 'test@test.com',
            password:'password',
            username: 'testuser'
        },
    })
    console.log({user})
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) =>{
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })