import { Module } from '@nestjs/common';

import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';
import { ProfileRepository } from './profile.repository';

import { SkillsLoader } from '../loaders/skills.loader';
import { ExperienceLoader } from '../loaders/experience.loader';
import { ProjectsLoader } from '../loaders/projects.loader';

@Module({
  providers: [
    ProfileResolver,
    ProfileService,
    ProfileRepository,
    // DataLoader-ы request-scoped, поэтому Nest создаёт новый инстанс на каждый GraphQL-запрос
    SkillsLoader,
    ExperienceLoader,
    ProjectsLoader,
  ],
})
export class ProfileModule {}