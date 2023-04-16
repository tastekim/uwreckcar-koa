import sequelize from '../../models/index';
import crypto from 'crypto';
import Slack from '../config/slack.config';
import { Users } from '../../models/users';

const userRepository = sequelize.getRepository(Users);

export async function alreadyExists(email: string) {
  try {
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
  } catch (err) {
    console.error('====================user.module.js/alreadyExists Error.=============================');
    await Slack('alreadyExists', err);
    return err;
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