import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // Code-first: схема генерируется автоматически из декораторов
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      // Отключаем устаревший GraphQL Playground — включаем Apollo Sandbox
      playground: true,
      introspection: true,
      // Apollo Sandbox не любит CSRF по умолчанию в дев-режиме
      csrfPrevention: false,
      context: ({ req }: { req: unknown }) => ({ req }),
    }),
    PrismaModule,
    ProfileModule,
  ],
})
export class AppModule {}