import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { Project as PrismaProject } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable({ scope: Scope.REQUEST })
export class ProjectsLoader {
  constructor(private readonly prisma: PrismaService) {}

  readonly batchProjects = new DataLoader<number, PrismaProject[]>(
    async (profileIds) => {
      const items = await this.prisma.project.findMany({
        where: { profileId: { in: [...profileIds] } },
        orderBy: { name: 'asc' },
      });

      const grouped = new Map<number, PrismaProject[]>();
      for (const item of items) {
        const bucket = grouped.get(item.profileId);
        if (bucket) {
          bucket.push(item);
        } else {
          grouped.set(item.profileId, [item]);
        }
      }

      return profileIds.map((id) => grouped.get(id) ?? []);
    },
  );
}