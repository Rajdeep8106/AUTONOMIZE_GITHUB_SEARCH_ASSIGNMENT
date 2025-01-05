import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function RepositoryList() {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userResponse = await axios.get(`https://api.github.com/users/${username}`);
      const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`);
      setUserInfo(userResponse.data);
      setRepos(reposResponse.data);
    };
    fetchData();
  }, [username]);

  return (
    <div>
      <h1>{userInfo.name}'s Repositories</h1>
      <img src={userInfo.avatar_url} alt="Avatar" style={{ width: '100px' }} />
      <p>{userInfo.bio}</p>
      <p>Public Repositories: {userInfo.public_repos}</p>
      <Link to={`/followers/${username}`}>View Followers</Link>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <Link to={`/repo/${username}/${repo.name}`}>{repo.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RepositoryList;
