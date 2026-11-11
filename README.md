# Digital Business Card

GraphQL backend-визитка на NestJS + Prisma + PostgreSQL + Docker.

## Запуск
docker compose up --build
Открыть http://localhost:3000/graphql (Apollo Sandbox).

## Стек
- TypeScript, NestJS 10, Apollo Server 4
- Prisma ORM, PostgreSQL 15
- DataLoader для оптимизации N+1
- Docker + docker-compose

## Команды
- npm run start:dev — локальная разработка
- docker compose up -d db — только БД
- npx prisma migrate dev — новая миграция
- npx prisma db seed — заполнить данными

## Пример запроса
```json
query {
  profile {
    name
    description
    githubUrl
    skills { name }
    experience { company position achievements }
    projects { name url }
  }
}
```

SQL-логи Prisma включены в NODE_ENV=development и выключены в production. Для демонстрации работы DataLoader оставлено development. В реальном проде — NODE_ENV=production.