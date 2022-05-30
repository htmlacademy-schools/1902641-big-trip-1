import dayjs from 'dayjs';
import { destinations } from './destinations';
import { pointTypes } from './point-types';
import { nanoid } from 'nanoid';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generatePrice = () => getRandomInteger(1, 100) * 10;

const generateFromToDates = () => {
  const maxGap = 14;
  const fromDate = dayjs()
    .add(getRandomInteger(-maxGap, maxGap), 'day')
    .add(getRandomInteger(-maxGap, maxGap), 'hour')
    .add(getRandomInteger(-maxGap, maxGap), 'minute');
  const toDate = fromDate
    .clone()
    .add(getRandomInteger(0, 14), 'day')
    .add(getRandomInteger(0, 59), 'hour')
    .add(getRandomInteger(0, 59), 'minute');
  return {
    from: fromDate.toISOString(),
    to: toDate.toISOString()
  };
};

export const generatePoint = () => {
  const dates = generateFromToDates();
  const locationArray = destinations();
  const pointArray = pointTypes();

  return {
    id: nanoid(),
    basePrice: generatePrice(),
    dateFrom: dates.from,
    dateTo: dates.to,
    location: locationArray[getRandomInteger(0, locationArray.length - 1)],
    isFavorite: Boolean(getRandomInteger(0, 1)),
    points: pointArray,
    type: pointArray[getRandomInteger(0, pointArray.length - 1)].type
  };
};