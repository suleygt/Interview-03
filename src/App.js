import axios from "axios";
import { useEffect, useState } from "react";


function App() {
  return <GenerateList />;
}

const GenerateList = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    
    fetchActivity();
  }, []);

  const fetchActivity = async () => {
    try {
      const response = await axios.get("https://www.boredapi.com/api/activity");
      const newActivity = response.data;
      setActivities(prevActivities => [...prevActivities, newActivity]);
    } catch (error) {
      console.error("Error fetching activity:", error);
    }
  };

  const ActivityItem = ({ activity }) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <div>
        <h3>{activity.activity}</h3>
        <button onClick={() => setExpanded(!expanded)}>Show Details</button>
        {expanded && (
          <div>
            <p>Type: {activity.type}</p>
            <p>Participants: {activity.participants}</p>
            <p>Price: {activity.price}</p>
            <p>Link: {activity.link}</p>
            <p>Accessibility: {activity.accessibility}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <button onClick={fetchActivity}>Generate Activity</button>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>
            <ActivityItem activity={activity} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
