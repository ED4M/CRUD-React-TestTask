function transformPhone(phone) {
  if (!/^([+\s()-]|\d)*$/.test(phone)) return phone.slice(0, -1);

  if (phone.length < 4) return '+7 (' + phone
  else if (phone.length === 7) return phone + ') '
  else if (phone.length === 12) return phone + '-'
  else if (phone.length === 15) return phone + '-'
  else return phone;
}

function getNextAdvertId() {
  let currentId = localStorage.getItem('nextId');
  if (currentId !== null) {
    currentId = +currentId + 1;
    localStorage.setItem('nextId', currentId);
  } else {
    currentId = 0;
    localStorage.setItem('nextId', currentId)
  }
  return currentId;
}

function getCityName(id) {
  const citiesMap = new Map([
    ['0', 'Город не указан'],
    ['1', 'Москва'],
    ['2', 'Санкт-Петербург'],
    ['3', 'Казань'],
    ['4', 'Нижний Новгород ']
  ]);
  return citiesMap.get(id);
}

export { getCityName, getNextAdvertId, transformPhone };