import React, { useState, useEffect } from 'react';
import './Gallery.css';


//holds an array of tours, manages loading data, holds error messages
function Gallery () {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


//to fix cors error, the following api establishes a secure connection
  useEffect(() => {
    fetch('https://api.allorigins.win/get?url=https://course-api.com/react-tours-project')
      .then((response) => response.json())
      .then((data) => {
        const parsedData = JSON.parse(data.contents);
        setTours(parsedData);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

//will remove the tour from list if user hits the 'not interested' button
  const removeTour = (id) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

//will show description if user hits the 'read more' button
  const toggleDescription = (id) => {
    setTours(
      tours.map((tour) =>
        tour.id === id ? { ...tour, showMore: !tour.showMore } : tour
      )
    );
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="gallery">
      <h2>Tour List</h2>
      <ul className="tour-list">
        {tours.map((tour) => (
          <li key={tour.id} className="tour-item">
            <img src={tour.image} alt={tour.name} className="tour-image" />
            <div className="tour-info">
              <h3>{tour.name}</h3>
              <p className="tour-price"> Price: ${tour.price}</p>

              {/* shows the description toggle option */}
              <p className="tour-description">
                {tour.showMore
                  ? tour.info 
                  : `${tour.info.substring(0, 100)}...`}  {/*displays first 100 characters of description until user hits read more*/}
                <button onClick={() => toggleDescription(tour.id)}>
                  {tour.showMore ? 'Show Less' : 'Read More'}
                </button>
              </p>

              <button onClick={() => removeTour(tour.id)} className="not-interested-button">
                Not Interested
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Gallery;
