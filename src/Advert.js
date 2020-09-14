import React from 'react';
import { getCityName } from './serviceHelper';

function AdsBlock({ advertObj, removeAdvert }) {

  const { id, title, description, cityId, phone } = advertObj;
  const city = getCityName(cityId);

  return (
    <div className="advert-container card mb-3">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <h6 className="card-subtitle mb-2 text-muted">{city}</h6>
        <h6 className="card-text mb-2 text-muted">{phone}</h6>
        <button className="btn btn-danger" onClick={() => removeAdvert(id)}>Удалить</button>
      </div>
    </div>
  )
}

export default AdsBlock;