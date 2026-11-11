import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { Skill as PrismaSkill } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable({ scope: Scope.REQUEST })
export class SkillsLoader {
  constructor(private readonly prisma: PrismaService) {}

  readonly batchSkills = new DataLoader<number, PrismaSkill[]>(
    async (profileIds) => {
      const items = await this.prisma.skill.findMany({
        where: { profileId: { in: [...profileIds] } },
        orderBy: { name: 'asc' },
      });

      const grouped = new Map<number, PrismaSkill[]>();
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