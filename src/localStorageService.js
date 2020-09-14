function setAdvertsAtLS(advertsArr) {
  return localStorage.setItem('advertisments', JSON.stringify(advertsArr));
}

function getAllAdverts() {
  const advertsArr = JSON.parse(localStorage.getItem('advertisments'));
  if (advertsArr) return advertsArr
  else return [];
}

export { setAdvertsAtLS, getAllAdverts };