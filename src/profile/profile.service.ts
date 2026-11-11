import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfileRepository } from './profile.repository';
import { Profile } from './dto/profile.object';

/**
 * Omit убирает поля-связи — они не приходят из БД в этом методе,
 * их подставит GraphQL-резолвер через @ResolveField.
 */
type ProfileBase = Omit<Profile, 'skills' | 'experience' | 'projects'>;

@Injectable()
export class ProfileService {
  constructor(private readonly repository: ProfileRepository) {}

  public getProfile = async (): Promise<ProfileBase> => {
    const profile = await this.repository.findFirst();

    if (!profile) {
      throw new NotFoundException('Profile has not been seeded yet');
    }

    // Структурно PrismaProfile ⊇ ProfileBase (все скалярные поля совпадают).
    return profile;
  }
}