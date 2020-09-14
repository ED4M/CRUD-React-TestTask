import React, { useState, useEffect } from 'react';
import Advert from './Advert';

function AdsBlock({ adverts, removeAdvert }) {
  const [advertsArr, setAdvertsArr] = useState([]);

  useEffect(() => {
    setAdvertsArr(adverts);
  }, [adverts])

  return (
    <div className="ads-block col-lg-6 col-md-6 col-sm-12 mt-5 pt-2">
      {advertsArr.length !== 0 ?
        advertsArr.map((item) => {
          return <Advert advertObj={item} removeAdvert={removeAdvert} key={item.id}/>
        }) :
        <h3>Объявлений пока нет :(</h3>
      }
    </div>
  )
}

export default AdsBlock;