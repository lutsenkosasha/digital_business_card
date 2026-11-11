import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.profile.deleteMany(); // идемпотентность

  await prisma.profile.create({
    data: {
      name: 'Луценко Александр',
      description: 'Fullstack-developer',
      githubUrl: 'https://github.com/lutsenkosasha',
      skills: {
        create: [
          { name: 'JavaScript' },
          { name: 'TypeScript' },
          { name: 'React' },
          { name: 'Node.js' },
          { name: 'NestJS' },
          { name: 'GraphQL' },
          { name: 'Prisma' },
          { name: 'Docker' },
          { name: 'axios' },
          { name: 'PostgreSQL' },
          { name: 'Bootstrap' },
          { name: 'Swagger' },
          { name: 'Git' },
        ],
      },
      experience: {
        create: [
          {
            company: 'MMIT',
            position: 'Fullstack-developer',
            startDate: new Date('2025-12-08'),
            achievements: [
              'Разработал веб-приложение для взаимодействия с корпоративной нейросетью, функционально аналогичное ChatGPT / DeepSeek',
              'Выполнил комплексный редизайн существующего приложения с переработкой структуры интерфейса и последующим расширением функциональности'
            ],
          },
          {
            company: 'Cyber Analytics',
            position: 'Fullstack-developer',
            startDate: new Date('2025-12-05'),
            endDate: new Date('2025-06-03'),
            achievements: [
              'Самостоятельно разработал клиент-серверное приложение для загрузки, хранения, обработки и управления большими объёмами файлов (до 100ГБ)',
              'Разработал промо-сайта компании с нуля на основе дизайн-макетов Figma'
            ],
          },
          {
            company: 'Vistar',
            position: 'Fullstack-developer',
            startDate: new Date('2025-03-02'),
            endDate: new Date('2025-05-10'),
            achievements: [
              'Прошел производственную практику',
              'В команде из 3-х человек разработали корпоративное веб-приложение с чат-ботом на базе chatGPT для работы с базой знаний по транспорту и оборудованию',
              'Успешно презентовали проект представителям компании',
            ],
          },
        ],
      },
      projects: {
        create: [
          {
            name: 'Web-interface + Moodle API',
            url: 'https://github.com/lutsenkosasha/Moodle_API',
            description: 'React, TypeScript, Tailwind CSS, Vite, axios, Moodle, XAMPP',
          },
          {
            name: 'Admin dashboard',
            url: 'https://github.com/lutsenkosasha/Admin_Dashboard',
            description: 'React, TypeScript, Vite, axios, .NET, PostgreSQL, Docker, JWT, Swagger',
          },
        ],
      },
    },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });