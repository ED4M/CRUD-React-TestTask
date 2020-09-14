import React, { useState } from 'react';
import CreationForm from './CreationForm';
import AdsBlock from './AdsBlock';
import { getAllAdverts, setAdvertsAtLS } from './localStorageService';
import './App.css';

function App() {

  const [adverts, setAdverts] = useState([]);

  React.useEffect(() => {
    setAdverts(getAllAdverts());
  }, [])

  function addAdvert(advertObj) {
    setAdverts([advertObj, ...adverts]);
    setAdvertsAtLS([advertObj, ...adverts]);
  }

  function removeAdvert(id) {
    const advRemoveIndx = adverts.findIndex((value) => value.id === id);
    const newAdvertsArr = adverts.slice(0, advRemoveIndx).concat(adverts.splice(advRemoveIndx + 1));
    setAdverts(newAdvertsArr);
    setAdvertsAtLS(newAdvertsArr);
  }

  return (
    <div className="containter col-lg-8 col-md-10 col-sm-12 row d-flex justify-content-center mx-auto">
      <CreationForm addAdvert={addAdvert} />
      <AdsBlock adverts={adverts} removeAdvert={removeAdvert} />
    </div>
  );
}

export default App;
