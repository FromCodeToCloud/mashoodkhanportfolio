import prisma from "@/lib/prisma/prisma";

export async function seed() {
	const result = await prisma.$executeRaw`SELECT 1`;
	console.log(result);
	await prisma.$disconnect();
}

seed();
