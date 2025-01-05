import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function RepositoryDetails() {
  const { username, repoName } = useParams();
  const [repoDetails, setRepoDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`);
      setRepoDetails(response.data);
    };
    fetchData();
  }, [username, repoName]);

  return (
    <div>
      <h1>{repoDetails.name}</h1>
      <p>{repoDetails.description}</p>
      <p>Stars: {repoDetails.stargazers_count}</p>
      <p>Forks: {repoDetails.forks_count}</p>
      <a href={repoDetails.html_url} target="_blank" rel="noopener noreferrer">
        View on GitHub
      </a>
      <br />
      <Link to={`/repos/${username}`}>Back to Repository List</Link>
    </div>
  );
}

export default RepositoryDetails;
