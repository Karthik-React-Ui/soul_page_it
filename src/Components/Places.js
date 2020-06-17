import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function Places({ addFavouritePlace, removeFavouritePlace, favouritePlaces }) {

  const [places, setPlaces] = useState([]);
  const [details, setDetails] = useState({});

  const api = (url, isPlaces) => {

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    // site that doesn’t send Access-Control-*
    fetch(proxyurl + url).then((resp) => resp.json())
      .then((data) => {
        console.log(data, 'data==', url);
        if (isPlaces) {
          setPlaces(data.places);
        }
        else {
          setDetails(data[0]);

        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    api('http://roadtrippers.herokuapp.com/api/v1/places/', true);
  }, []);

  //Get details
  const detailsClick = (id) => {
    api(`http://roadtrippers.herokuapp.com/api/v1/place/${id}`, false);
    document.body.style.overflow = 'hidden';

  }

  //Close Modal PopUp
  const closeIconClick = () => {
    setDetails({});
    document.body.style.overflow = 'auto';
  }

  //Favourite Places Ids
  const placesIds = Array.from(favouritePlaces, ({ id }) => id);
  return (
    <>
      <h1 className="title">PLACES</h1>
      {/* Details View*/}
      {details['name'] && <Modal.Dialog>
        <Modal.Body>
          <div className="content" >
            <i className="fa fa-close" aria-hidden="true" onClick={closeIconClick}></i>
            <img className="bd-placeholder-img" src={details.cover} alt='Update Over Photos' />
            <h4 className="card-title">{details.name}</h4>
            <p>{details.official_description}</p>
          </div>
        </Modal.Body>
      </Modal.Dialog>
      }
      {/* List View */}
      <div className="container">
        {places && places.length ?
          places.map((place, ind) => {
            const { name, cover, id, official_description, location, pincode } = place;
            return (
              <div className="card col-lg-12" key={id}>
                <div className="row no-gutters">
                  <div className="col-md-6 cover-section">
                    <img className="bd-placeholder-img" src={cover} alt='Update Over Photos' />
                    <h4 className="card-title">{name}</h4>
                    {placesIds.includes(id) ? <i className="fa fa-heart active" aria-hidden="true" onClick={() => removeFavouritePlace(id)}></i>
                      : <i className="fa fa-heart" aria-hidden="true" onClick={() => addFavouritePlace(id)}></i>}
                  </div>
                  <div className="col-md-6">
                    <div className="card-body">
                      <p className="card-text">{official_description}</p>
                      <div className="location-info">
                        <p><span>Location:</span>{location.toUpperCase()}</p>
                        <p><span>PinCode:</span>{pincode}</p>
                      </div>
                      <div className="info-click" onClick={() => detailsClick(id)}>
                        <a className="btn btn-success">{`Show ${name} Details`}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>)

          }) :
          <div className='loader'>
            <div className='loader-body'>
              <div className="spinner-grow" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  );
}

export default Places;
