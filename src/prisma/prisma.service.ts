import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);
  private readonly isDev: boolean;

  constructor() {
    const isDev = process.env.NODE_ENV !== 'production';

    super({
      log: isDev
        ? [
            { emit: 'event', level: 'query' },
            { emit: 'stdout', level: 'warn' },
            { emit: 'stdout', level: 'error' },
          ]
        : [
            { emit: 'stdout', level: 'warn' },
            { emit: 'stdout', level: 'error' },
          ],
    });

    this.isDev = isDev;
  }

  async onModuleInit(): Promise<void> {
    if (this.isDev) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this as any).$on(
        'query',
        (e: { query: string; params: string; duration: number }) => {
          this.logger.debug(`[SQL ${e.duration}ms] ${e.query} -- params: ${e.params}`);
        },
      );
    }

    await this.$connect();
    this.logger.log('Prisma connected to the database');
  }

  public onModuleDestroy = async (): Promise<void> => {
    await this.$disconnect();
    this.logger.log('Prisma disconnected from the database');
  }
}