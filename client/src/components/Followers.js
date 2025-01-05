import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function Followers() {
  const { username } = useParams();
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://api.github.com/users/${username}/followers`);
      setFollowers(response.data);
    };
    fetchData();
  }, [username]);

  return (
    <div>
      <h1>{username}'s Followers</h1>
      <ul>
        {followers.map((follower) => (
          <li key={follower.id}>
            <Link to={`/repos/${follower.login}`}>{follower.login}</Link>
          </li>
        ))}
      </ul>
      <Link to={`/repos/${username}`}>Back to Repository List</Link>
    </div>
  );
}

export default Followers;
