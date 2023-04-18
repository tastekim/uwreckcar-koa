import sequelize from '../../models/index';
import { Users } from '../../models/users';

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