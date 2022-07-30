import React, { useState } from 'react';
import './index.css';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';

const Publish = ({ token }) => {
  const [picture, setPicture] = useState();
  const [preview, setPreview] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [condition, setCondition] = useState('');
  const [city, setCity] = useState('');
  const [price, setPrice] = useState('');

  const history = useHistory();
  const formData = new FormData();
  formData.append('picture', picture);
  formData.append('title', title);
  formData.append('description', description);
  formData.append('brand', brand);
  formData.append('size', size);
  formData.append('color', color);
  formData.append('condition', condition);
  formData.append('city', city);
  formData.append('price', price);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      `${process.env.REACT_APP_URL}/offer/publish`,
      formData,
      {
        headers: {
          authorization: 'Bearer ' + token,
        },
      }
    );
    // console.log(response.data);
    if (response.data._id) {
      // redirectoin vers l'offre
      history.push(`/offer/${response.data._id}`);
    } else {
      alert('Une erreur est survenue, veuillez réssayer');
    }
  };

  return token ? (
    <div className="publish-container">
      <div className="publish-wrapper">
        <h2>Vends ton article</h2>
        <form onSubmit={handleSubmit} className="publish-form">
          <div className="file-select">
            {preview ? (
              <div className="dashed-preview-image">
                <img src={preview} alt="pré-visualisation" />
                <div
                  className="remove-img-button"
                  onClick={() => {
                    setPreview('');
                  }}
                >
                  X
                </div>
              </div>
            ) : (
              <div className="input-select-base">
                <label htmlFor="file" className="label-file">
                  <span className="input-sign">+</span>
                  <span>Ajoute une photo</span>
                </label>
                <input
                  className="input-file"
                  id="file"
                  type="file"
                  onChange={(event) => {
                    setPicture(event.target.files[0]);
                    setPreview(URL.createObjectURL(event.target.files[0]));
                  }}
                />
              </div>
            )}
          </div>
          <div className="text-input-section">
            <div className="text-input">
              <h4>Titre</h4>
              <input
                placeholder="ex: Chemise Sézane verte"
                type="text"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>

            <div className="text-input">
              <h4>Décris ton article</h4>
              <textarea
                placeholder="ex: porté quelquefois, taille correctement"
                name="description"
                id="description"
                rows="5"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              ></textarea>
            </div>
          </div>

          <div className="text-input-section">
            <div className="text-input">
              <h4>Marque</h4>
              <input
                type="text"
                placeholder="ex: Zara"
                value={brand}
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
            </div>

            <div className="text-input">
              <h4>Taille</h4>
              <input
                type="text"
                placeholder="ex: L / 40 / 12"
                value={size}
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />
            </div>

            <div className="text-input">
              <h4>Couleur</h4>
              <input
                placeholder="ex: Fushia"
                type="text"
                value={color}
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </div>

            <div className="text-input">
              <h4>Etat</h4>
              <input
                placeholder="Neuf avec étiquette"
                type="text"
                value={condition}
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
              />
            </div>

            <div className="text-input">
              <h4>Lieu</h4>
              <input
                placeholder="Lieu"
                type="ex: Paris"
                value={city}
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              />
            </div>
          </div>

          <div className="text-input-section">
            <div className="text-input">
              <h4>Prix</h4>
              <input
                placeholder="0,00 €"
                type="number"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="publish-button-div">
            <button type="submit" className="publish-button">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Redirect to={{ pathname: '/login', state: { fromPublish: true } }} />
  );
};

export default Publish;
