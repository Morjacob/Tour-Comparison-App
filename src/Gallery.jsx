import React, { useState, useEffect } from 'react';
import './Gallery.css'; // Assuming you have some styles for the gallery

const Gallery = () => {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data using the proxy API (AllOrigins)
    fetch('https://api.allorigins.win/get?url=https://course-api.com/react-tours-project')
      .then(response => response.json())
      .then(data => {
        const toursData = JSON.parse(data.contents); // Parse the data
        setTours(toursData.map(tour => ({ ...tour, showMore: false }))); // Add 'showMore' flag
        setIsLoading(false);
      })
      .catch(error => {
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

  // Handle loading and error states
  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="gallery">
      <h2>Tour List</h2>
      <ul className="tour-list">
        {tours.map((tour) => (
          <li key={tour.id} className="tour-item">
            <img src={tour.image} alt={tour.name} className="tour-image" />
            <div className="tour-info">
              <h3>{tour.name}</h3>
              <p className="tour-price">{tour.price}</p>

              <p className="tour-description">
                {tour.showMore
                  ? tour.description
                  : `${tour.description.substring(0, 100)}...`}
                <button onClick={() => toggleDescription(tour.id)}>
                  {tour.showMore ? 'Show Less' : 'Read More'}
                </button>
              </p>

              <button
                onClick={() => removeTour(tour.id)}
                className="not-interested-button"
              >
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
