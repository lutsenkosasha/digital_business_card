import { Injectable } from '@nestjs/common';
import { Profile as PrismaProfile } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Возвращает единственный профиль (у визитки он один).
   * Вложенные сущности (skills/experience/projects) НЕ подгружаются здесь —
   * за это отвечают DataLoader-ы в резолвере.
   */
  public findFirst = async (): Promise<PrismaProfile | null> => {
    return this.prisma.profile.findFirst();
  }

  public findById = async (id: number): Promise<PrismaProfile | null> => {
    return this.prisma.profile.findUnique({ where: { id } });
  }
}