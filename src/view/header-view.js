import AbstractView from './abstract-view';
import dayjs from 'dayjs';
import { sortTaskByDay } from '../utils/point';

const createHeaderView = (events) => {
  events.sort(sortTaskByDay);
  const arrayNameCities = events.map((event)=> event.city.currentCity.name);
  let totalBasePrice = null;
  events.forEach((event)=> {totalBasePrice += Number(event.basePrice);});
  const dateBegin = dayjs(events[0].date.dataBeginEvent).format('D MMM');
  const dateEnd = dayjs(events[events.length-1].date.dataEndEvent).format('DD MMM');

  let tripTitles = '';

  if(arrayNameCities.length <= 3) {
    arrayNameCities.forEach((nameCity, index) => {
      if(index === arrayNameCities.length - 1) {
        tripTitles += `${nameCity}`;
      }
      else {
        tripTitles += `${nameCity} &mdash; `;
      }
    });
  }
  else if(arrayNameCities.length > 3) {
    tripTitles = `${arrayNameCities[0]} &mdash; ... &mdash; ${arrayNameCities[arrayNameCities.length - 1]}`;
  }

  return`<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${tripTitles}</h1>
              <p class="trip-info__dates">${dateBegin}&nbsp;&mdash;&nbsp;${dateEnd}</p>
            </div>
            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalBasePrice}</span>
            </p>
          </section>`;
};
export default class HeaderView extends AbstractView{
  #events = null;

  constructor(events){
    super();
    this.#events = events;
  }

  get template() {
    return createHeaderView(this.#events);
  }
}
