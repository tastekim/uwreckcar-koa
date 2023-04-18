import sequelize from '../../models/index';
import { Users } from '../../models/users';
import crypto from 'crypto';

const userRepository = sequelize.getRepository(Users);

export async function alreadyExists (email: string) {
  const checkDuplicate = await userRepository.findOne({
    where : {
      email,
    },
  });

  if (!checkDuplicate) {
    return false;
  } else {
    return checkDuplicate;
  }
}

export async function findUserData (email: string) {
  const checkUser = await userRepository.findOne({
    where : {
      email,
    },
  });

  console.log('checkUser.getDataValue : ', checkUser.toJSON());

  return checkUser ? checkUser : false;
}

export async function createCompanyUser (
  user_name: string,
  email: string,
  password: string,
  salt: string,
  company_name: string,
  marketing_accept: string
) {
  const dupCheck = await userRepository.findOne({ where : { email } });
  if (dupCheck) {
    return false;
  } else {
    return userRepository.create({
      user_name,
      profile_img :
        'https://velog.velcdn.com/images/tastekim_/post/60f96a34-2142-43fe-b109-9312af658a3d/image.png',
      email,
      password,
      salt,
      company_name,
      marketing_accept,
      login_type : 'uwreckcar',
    });
  }
}

export async function findCompanyUserData (email: string) {
  return userRepository.findOne({ where : { email } });
}

export function createSalt () {
  const salt = crypto.randomBytes(64);
  return salt.toString('base64');
}

export const createHashedPassword = (plainPassword: string) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    const salt = createSalt();
    if (!salt) {
      reject(new Error('failed to create salt'));
    } else {
      crypto.pbkdf2(plainPassword, salt, 999, 64, 'sha512', (err, key) => {
        if (err) {
          reject(err);
        }
        resolve({ password : key.toString('base64'), salt });
      });
    }
  });

export const getHashedPassword = (plainPassword: string, salt: string) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    crypto.pbkdf2(plainPassword, salt, 999, 64, 'sha512', (err, key) => {
      if (err) {
        reject(err);
      }
      resolve({ password : key.toString('base64'), salt });
    });
  });

export async function setNewPassword (email: string, password: string, salt: string) {
  await userRepository.update({
    password : password,
    salt : salt,
  }, { where : { email } });
  return true;
}