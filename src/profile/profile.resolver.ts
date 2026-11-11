import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { Profile } from './dto/profile.object';
import { Skill } from './dto/skill.object';
import { Experience } from './dto/experience.object';
import { Project } from './dto/project.object';

import { ProfileService } from './profile.service';
import { SkillsLoader } from '../loaders/skills.loader';
import { ExperienceLoader } from '../loaders/experience.loader';
import { ProjectsLoader } from '../loaders/projects.loader';

type ProfileParent = { id: number };

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(
    private readonly profileService: ProfileService,
    private readonly skillsLoader: SkillsLoader,
    private readonly experienceLoader: ExperienceLoader,
    private readonly projectsLoader: ProjectsLoader,
  ) {}

  @Query(() => Profile, { name: 'profile' })
  async getProfile(): Promise<unknown> {
    return this.profileService.getProfile();
  }

  @ResolveField(() => [Skill])
  async skills(@Parent() profile: ProfileParent): Promise<unknown> {
    return this.skillsLoader.batchSkills.load(profile.id);
  }

  @ResolveField(() => [Experience])
  async experience(@Parent() profile: ProfileParent): Promise<unknown> {
    return this.experienceLoader.batchExperience.load(profile.id);
  }

  @ResolveField(() => [Project])
  async projects(@Parent() profile: ProfileParent): Promise<unknown> {
    return this.projectsLoader.batchProjects.load(profile.id);
  }
}