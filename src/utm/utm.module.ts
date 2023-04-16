import sequelize from '../../models';
import { Utms } from '../../models/utms';
import { User_utm_mediums } from '../../models/user-utm-mediums';
import { User_utm_sources } from '../../models/user-utm-sources';

const utmRepository = sequelize.getRepository(Utms);

// UTM 전체 조회
export async function getAllUtms(user_id: string) {
  const result = await utmRepository.findAll({
    where : { user_id },
    include : [
      {
        model : sequelize.getRepository(User_utm_mediums),
        as : 'utm_medium_name',
        attributes : ['medium_name'],
      },
      {
        model : sequelize.getRepository(User_utm_sources),
        as : 'utm_source_name',
        attributes : ['source_name'],
      },
    ],
    order : [['created_at', 'DESC']],
  });
  return result;
}