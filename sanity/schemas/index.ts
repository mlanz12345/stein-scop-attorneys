import { seo } from './objects/seo';
import { page } from './documents/page';
import { attorney } from './documents/attorney';
import { practiceArea } from './documents/practiceArea';
import { careerProgramme } from './documents/careerProgramme';
import { redirect } from './documents/redirect';
import { siteSettings } from './documents/siteSettings';

export const schemaTypes = [
  // Objects
  seo,
  // Documents
  page,
  attorney,
  practiceArea,
  careerProgramme,
  redirect,
  siteSettings,
];
