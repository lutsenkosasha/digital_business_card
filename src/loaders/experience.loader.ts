import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { Experience as PrismaExperience } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable({ scope: Scope.REQUEST })
export class ExperienceLoader {
  constructor(private readonly prisma: PrismaService) {}

  readonly batchExperience = new DataLoader<number, PrismaExperience[]>(
    async (profileIds) => {
      const items = await this.prisma.experience.findMany({
        where: { profileId: { in: [...profileIds] } },
        orderBy: { startDate: 'desc' },
      });

      const grouped = new Map<number, PrismaExperience[]>();
      for (const item of items) {
        const bucket = grouped.get(item.profileId);
        if (bucket) {
          bucket.push(item);
        } else {
          grouped.set(item.profileId, [item]);
        }
      }

      // DataLoader требует, чтобы порядок результатов совпадал с порядком ключей
      return profileIds.map((id) => grouped.get(id) ?? []);
    },
  );
}