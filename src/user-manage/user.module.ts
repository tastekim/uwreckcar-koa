import db from '../../models/index';
import crypto from 'crypto';
import Slack from '../configs/slack.config';

export async function alreadyExists(email: string) {
  try {
    const checkDuplicate = await db.Users.findOne({
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

export async function findUserData(userData) {
  try {
    const checkUser = await db.Users.findOne({
      where : {
        email : userData.kakao_account.email,
      },
    });
    return checkUser ? checkUser.dataValues : false;
  } catch (err) {
    console.error('====================user.module.js/findUserData Error.=============================');
    await Slack('findUserData', err);
    return err;
  }
}