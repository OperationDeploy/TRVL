import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import PropTypes from 'prop-types';

const Photos = ({ currentTrip, currentUser }) => {
  // TODO: CONNECT PHOTOS TO DB
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios.get(`/photos/${currentTrip.id}`)
      .then(({ data }) => {
        setPhotos(data);
        console.log('photos from server', data);
      });
  }, []);

  const fileUpload = (photo) => {
    const data = new FormData();
    data.append('file', photo);
    data.append('user', currentUser.id);
    data.append('trip', currentTrip.id);
    axios.post('/photos', data)
      .then((res) => {
        setPhotos([res.data, ...photos]);
      });
  };

  const fileSelectHandler = (e) => {
    fileUpload(e.target.files[0]);
  };

  return (
    <div>
      <Typography component="h1" variant="h2">
        Photos
      </Typography>
      <Button
        variant="contained"
        component="label"
      >
        Upload File
        <input
          type="file"
          style={{ display: 'none' }}
          onChange={fileSelectHandler}
        />
      </Button>
      {photos.map((photo, i) => (
        <img alt={i} src={`http://localhost:3000/${photo.photo_link}`} width="330" />
      ))}
    </div>
  );
};

Photos.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    profile_pic: PropTypes.string,
    host: PropTypes.bool,
    googleId: PropTypes.string,
  }).isRequired,
  currentTrip: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    destination: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
  }).isRequired,
};

export default Photos;
