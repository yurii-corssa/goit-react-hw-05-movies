import { Suspense, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { fetchAPI } from 'services/api';
import {
  BtnInfo,
  BtnInfoList,
  BtnInfoListItem,
  DetailsContainer,
  InfoContainer,
  InfoSection,
  LinkStyled,
  MovieDetailsSection,
  SubTitle,
  Text,
  TextWrapper,
  Title,
  TitleInfo,
} from './MovieDetails.styled';
import { Loader } from 'components/Loader/Loader';
import Poster from 'components/Poster/Poster';

const MovieDetails = () => {
  const [movieData, setMovieData] = useState(null);
  const [genres, setGenres] = useState([]);
  const { movieId } = useParams();
  const location = useLocation();
  const locationRef = useRef(location);

  useEffect(() => {
    fetchAPI(`/movie/${movieId}`)
      .then(response => {
        setMovieData(response);
        const genres = response.genres.map(genre => genre.name);
        setGenres(genres);
      })
      .catch(error => console.log(error));
  }, [movieId]);

  // const defaultImg =
  //   'https://via.placeholder.com/400x600.png?text=Poster+Not+Available';

  if (!movieData) return <Loader />;

  return (
    <>
      <MovieDetailsSection>
        <LinkStyled to={locationRef.current?.state?.from ?? '/'}>
          <ArrowBackIosRoundedIcon />
          Back
        </LinkStyled>
        <DetailsContainer>
          {/* <img
            src={
              movieData.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`
                : defaultImg
            }
            width={400}
            alt="poster"
          /> */}
          <Poster image={movieData.poster_path} width={400} height={600} />
          <TextWrapper>
            <Title>{movieData.title}</Title>
            <Text>Use score: {movieData.vote_average?.toFixed(1)}</Text>
            <SubTitle>Overview</SubTitle>
            <Text>{movieData.overview}</Text>
            <SubTitle>Genres</SubTitle>
            <Text>
              {genres.map(g => (
                <span key={g}>{g}</span>
              ))}
            </Text>
          </TextWrapper>
        </DetailsContainer>
      </MovieDetailsSection>
      <InfoSection>
        <TitleInfo>Additional information</TitleInfo>
        <BtnInfoList>
          <BtnInfoListItem>
            <BtnInfo to="cast">Cast</BtnInfo>
          </BtnInfoListItem>
          <BtnInfoListItem>
            <BtnInfo to="reviews">Reviews</BtnInfo>
          </BtnInfoListItem>
        </BtnInfoList>
        <InfoContainer>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </InfoContainer>
      </InfoSection>
    </>
  );
};

export default MovieDetails;
