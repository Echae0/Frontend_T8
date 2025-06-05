import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

const WaitingInfo = ({ onDataLoaded }) => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/restaurants/${restaurantId}`)
      .then((res) => {
        setRestaurant(res.data);
        setLoading(false);
        if (onDataLoaded) {
          onDataLoaded(res.data.currentWaitingTeams, res.data.predictedWaitingTime, res.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching waiting info:", err);
        setLoading(false);
        if (onDataLoaded) {
          onDataLoaded(0, 0, null);
        }
      });
  }, [restaurantId, onDataLoaded]);

  if (loading) return <p style={{ display: 'none' }}>Loading...</p>;
  if (!restaurant) return <p style={{ display: 'none' }}>Restaurant info not found.</p>;

  return (
    <div style={{ display: 'none' }}>
    </div>
  );
};

export default WaitingInfo;