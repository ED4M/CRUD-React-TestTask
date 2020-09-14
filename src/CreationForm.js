import React, { useState, useEffect } from 'react';
import { getNextAdvertId, transformPhone } from './serviceHelper';

function CreationForm({ addAdvert }) {

  const initAdvertObj = {
    title: '',
    description: '',
    phone: '',
    cityId: '0',
  }

  const [advertObj, setAdvertObj] = useState(initAdvertObj);
  const [validAll, setValidAll] = useState(false);
  const [validTitle, setValidTitle] = useState(false);
  const [validDescr, setValidDescr] = useState(true);
  const [validPhone, setValidPhone] = useState(false);
  const [prevPhone, setPrevPhone] = useState('');

  const [titleFieldValid, setTitleFieldValid] = useState(true);
  const [descFieldValid, setDescFieldValid] = useState(true);
  const [phoneFieldValid, setPhoneFieldValid] = useState(true);

  useEffect(() => {
    generalValidation();
  })

  function setAdvertField(fieldName, value) {
    setAdvertObj(prevData => {
      return {
        ...prevData,
        [fieldName]: value
      }
    })
    return;
  }

  function generalValidation() {
    (validTitle & validDescr & validPhone) ? setValidAll(true) : setValidAll(false);
  }

  function sendAdvert(e) {
    e.preventDefault();
    addAdvert({
      id: getNextAdvertId(),
      ...advertObj
    });
    setAdvertObj(initAdvertObj);
  }

  function validateTitle(event) {
    const fieldValue = event.target.value;
    if (fieldValue.length > 140 || fieldValue.length === 0) {
      setValidTitle(false);
      setTitleFieldValid(false);
    } else {
      setValidTitle(true);
      setTitleFieldValid(true);
    }
    setAdvertField('title', fieldValue);
  }

  function validateDescr(event) {
    const fieldValue = event.target.value;
    if (fieldValue.length > 300) {
      setValidDescr(false);
      setDescFieldValid(false);
    } else {
      setValidDescr(true);
      setDescFieldValid(true);
    }
    setAdvertField('description', fieldValue);
  }

  function validatePhone(event) {
    const phoneFieldValue = event.target.value;

    if (!/^([+\s()-]|\d)*$/.test(phoneFieldValue)) {
      setAdvertObj({ ...advertObj, phone: prevPhone });
      return;
    }

    if (phoneFieldValue.length < prevPhone.length) {
      setAdvertObj({ ...advertObj, phone: phoneFieldValue });
    } else {
      setAdvertObj({ ...advertObj, phone: transformPhone(phoneFieldValue) })
    }
    setPrevPhone(phoneFieldValue);

    if (phoneFieldValue.length === 18) {
      setValidPhone(true);
      setPhoneFieldValid(true);
    } else {
      setValidPhone(false);
      setPhoneFieldValid(false);
    }
  }

  return (
    <div className="creation-form-block col-lg-6 col-md-6 col-sm-12">
      <h2 className="title mb-4">Подать объявление</h2>
      <form>
        <div className="row mb-3">
          <div className="col-4 field-label">
            <label className="h5 label required" htmlFor="title-field">Заголовок</label>
          </div>
          <div className="col-8 field">
            <input type="text" className="form-control" placeholder="Название объявления" id="title-field"
              required={true} value={advertObj.title} onChange={validateTitle} />
            {!titleFieldValid ?
              <div className="invalid-feedback">
                Пожалуйста, введите название длиной от 1 до 140 символов.
            </div> :
              ''}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4 field-label">
            <label className="h5 label" htmlFor="description-field">Описание</label>
          </div>
          <div className="col-8 field">
            <textarea className="form-control" id="description-field" placeholder="Описание объявления" rows="3"
              value={advertObj.description} onChange={validateDescr}></textarea>
            {!descFieldValid ?
              <div className="invalid-feedback">
                Описание не может превышать длину в 300 символов.
            </div> :
              ''}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4 field-label">
            <label className="h5 label required" htmlFor="phone-field">Телефон</label>
          </div>
          <div className="col-8 field">
            <input type="text" className="form-control" placeholder="+7 (***) ***-**-**" id="phone-field"
              required={true} value={advertObj.phone} onChange={validatePhone} />
            {!phoneFieldValid ?
              <div className="invalid-feedback">
                Пожалуйста, введите коррекртный номер телефона.
            </div> :
              ''}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4 field-label">
            <label className="h5 label" htmlFor="select-field">Город</label>
          </div>
          <div className="col-8 field">
            <select className="custom-select" id="select-field" value={advertObj.cityId} onChange={(e) => setAdvertField('cityId', e.target.value)}>
              <option value="0">Выберите город</option>
              <option value="1">Москва</option>
              <option value="2">Санкт-Петербург</option>
              <option value="3">Казань</option>
              <option value="3">Нижний Новгород </option>
            </select>
          </div>
        </div>
        <button className="btn btn-light w-100" type="submit" disabled={!validAll} onClick={sendAdvert}>Отправить</button>
      </form>
    </div>
  )
}

export default CreationForm;