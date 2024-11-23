import React, { useState, useEffect } from 'react';
import './Gallery.css';

function Gallery () {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const removeTour = (id) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

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

              {/* Toggle description visibility with correct field */}
              <p className="tour-description">
                {tour.showMore
                  ? tour.info // Change 'description' to 'info'
                  : `${tour.info.substring(0, 100)}...`}  {/* Change 'description' to 'info' */}
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
