import sequelize from '../../models';
import { Utms } from '../../models/utms';
import { User_utm_mediums } from '../../models/user-utm-mediums';
import { User_utm_sources } from '../../models/user-utm-sources';
import { nanoid } from 'nanoid';
import axios from 'axios';
import xlsx, { IContent, IJsonSheet } from 'json-as-xlsx';
import { utmRepo, utmMediumRepo, utmSourceRepo } from '../config/mysql.config';

// UTM 전체 조회
export async function getAllUtms (user_id: string) {
  return utmRepo.findAll({
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
}

// User_utm_medium 생성
export async function createUtmMediums (user_id: number, utm_medium: string) {
  const checkDuplicate = await utmMediumRepo.findOne({
    where : {
      medium_name : utm_medium,
    },
  });

  if (!checkDuplicate) {
    const result = await utmMediumRepo.create({
      user_id : user_id,
      medium_name : utm_medium,
    });
    return result.user_utm_medium_id;
  } else {
    return checkDuplicate.user_utm_medium_id;
  }
}

// User_utm_source 생성
export async function createUtmSources (user_id: number, utm_source: string) {
  const checkDuplicate = await utmSourceRepo.findOne({
    where : {
      source_name : utm_source,
    },
  });

  if (!checkDuplicate) {
    const result = await utmSourceRepo.create({
      user_id : user_id,
      source_name : utm_source,
    });
    return result.user_utm_source_id;
  } else {
    return checkDuplicate.user_utm_source_id;
  }
}

// UTM data 생성
export async function createUtm (user_id: number, inputVal: any) {
  const user_utm_source_id = await createUtmSources(user_id, inputVal.utm_source);
  const user_utm_medium_id = await createUtmMediums(user_id, inputVal.utm_medium);

  const {
    utm_url,
    utm_campaign_id,
    utm_campaign_name,
    utm_source,
    utm_medium,
    utm_term,
    utm_content,
    utm_memo,
    created_at,
  } = inputVal;

  // crated_at 에 입력한 날짜가 없으면 오늘 날짜로 YYYY-MM-DD 로 변환
  // const dateOnly = new Date(created_at || Date.now()).toISOString().slice(0, 10);

  let full_url = `${utm_url}?utm_source=${utm_source}&utm_medium=${utm_medium}&utm_campaign=${utm_campaign_name}`;

  if (utm_term) {
    full_url += `&utm_term=${utm_term}`;
  } else if (utm_content) {
    full_url += `&utm_content=${utm_content}`;
  }

  const short_id = nanoid(10);
  const axiosResponse = await axios.post('https://li.urcurly.site/rd', {
    full_url,
    id : short_id,
  });
  const shorten_url = axiosResponse.data?.shortUrl;
  if (shorten_url === undefined) {
    throw new Error('Could not make shortUrl.');
  }

  return utmRepo.create({
    utm_url,
    utm_campaign_id : utm_campaign_id || '-',
    utm_campaign_name,
    utm_content : utm_content || '-',
    utm_memo : utm_memo || '-',
    utm_term : utm_term || '-',
    user_utm_medium_id,
    user_utm_source_id,
    user_id,
    full_url,
    shorten_url : shorten_url || '-',
    short_id,
    created_at : created_at || Date.now(),
  });
}

// UTM 삭제.
export async function deleteUtm (utm_id: number) {
  const result = await utmRepo.destroy({ where : { utm_id } });
  return result ? { error : false } : new Error(`invalid utm_id : ${utm_id}`);
}

export async function createExcelFile (filename: string, data: Array<Utms> & IContent[]) {
  const sheetData: IJsonSheet[] = [
    {
      sheet : 'MyUTM',
      columns : [
        { label : 'utm_url', value : 'utm_url' },
        { label : 'utm_campaign_id', value : 'utm_campaign_id' },
        { label : 'utm_campaign_name', value : 'utm_campaign_name' },
        { label : 'utm_medium', value : 'utm_medium_name' },
        { label : 'utm_source', value : 'utm_source_name' },
        { label : 'utm_content', value : 'utm_content' },
        { label : 'utm_term', value : 'utm_term' },
        { label : 'utm_memo', value : 'utm_memo' },
        { label : 'full_url', value : 'full_url' },
        { label : 'shorten_url', value : 'shorten_url' },
        { label : 'created_at', value : 'created_at_filter' },
      ],
      content : data,
    },
  ];
  const settings = {
    fileName : `./temp/${filename}`,
    extraLength : 11, // A bigger number means that columns will be wider
    writeMode : 'writeFile', // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
    writeOptions : {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
    RTL : false, // Display the columns from right-to-left (the default value is false)
  };
  xlsx(sheetData, settings, () => {
    console.log(`./temp/${filename}.xlsx file created.`);
  });
}

export async function createCSVFile (data: Array<Utms>) {
  const columns: Array<any> = [];
  Object.keys(data[0]).forEach(col => {
    columns.push(col);
  });
  let csvData = columns.join(',') + '\r\n';

  data.forEach((doc: any) => {
    const utmData: Array<string> = [];
    Object.keys(doc).forEach((key: string) => {
      csvData += utmData.push(doc[key]);
    });
    csvData += utmData.join(',') + '\r\n';
  });

  return csvData;
}
