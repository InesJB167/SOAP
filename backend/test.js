const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {

    const cursos = await prisma.curso_universitario.findMany();

    console.log(cursos);

}

main();