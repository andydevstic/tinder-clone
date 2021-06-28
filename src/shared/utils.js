import dayjs from 'dayjs';

export function getUserAge(userBirthday) {
  const now = dayjs();

  if (!userBirthday) {
    return 'Unknown age';
  }

  return now.year() - dayjs(userBirthday).year();
}