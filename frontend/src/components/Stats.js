import { useEffect, useState } from "react";

const Stats = () => {
  //    get stats from the backend by book genre
  const [stats, setStats] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5678/api/books/aggregate/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
      });
  }, []);

  return (
    <>
      <div className="stats-container">
        <div className="stats-heading">
          <h2 className="stats-header">Stats</h2>
        </div>
        <div className="stats">
          {stats.map((stat) => (
            <div className="stat">
              <h3>{stat._id}</h3>
              <p>{stat.count}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Stats;
