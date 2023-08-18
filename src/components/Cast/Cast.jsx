import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAPI } from 'services/api';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchAPI(`/movie/${movieId}/credits`)
      .then(response => setCast(response.cast))
      .catch(error => console.log(error));
  }, [movieId]);

  const defaultAvatar = '';

  return cast.map(({ profile_path, name, character, id }) => (
    <li key={id}>
      <img
        src={
          profile_path
            ? `https://image.tmdb.org/t/p/w500/${profile_path}`
            : defaultAvatar
        }
        width={100}
        alt="avatar"
      />
      <p>{name}</p>
      <p>Character: {character}</p>
    </li>
  ));
};

export default Cast;