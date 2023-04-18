import sequelize from '../../models/index';
import { Users } from '../../models/users';
import { Utms } from '../../models/utms';
import { User_utm_mediums } from '../../models/user-utm-mediums';
import { User_utm_sources } from '../../models/user-utm-sources';

export const userRepo = sequelize.getRepository(Users);
export const utmRepo = sequelize.getRepository(Utms);
export const utmMediumRepo = sequelize.getRepository(User_utm_mediums);
export const utmSourceRepo = sequelize.getRepository(User_utm_sources);