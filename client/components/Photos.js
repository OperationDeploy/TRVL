import React, { useState, useEffect } from 'react';
import { Typography, Button, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import PropTypes from 'prop-types';
import moment from 'moment';
import { HOST, PORT } from '../../config';
import './Photos.css';

const Photos = ({ currentTrip, currentUser }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    axios.get(`/photos/${currentTrip.id}`).then(({ data }) => {
      setPhotos(data);
    });
  }, []);

  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
  });
  const classes = useStyles();

  const fileUpload = (files) => {
    const data = new FormData();
    Object.values(files).forEach((file) => data.append('file', file));
    data.append('user', currentUser.id);
    data.append('trip', currentTrip.id);
    axios.post('/photos', data, {
      onUploadProgress: (progress) => {
        const dec = progress.loaded / progress.total;
        setLoading(dec * 100);
        if (progress.loaded === progress.total) {
          setTimeout(() => setLoading(null), 1000);
        }
      },
    })
      .then((res) => {
        const newPhotos = res.data.map((photo) => ({
          ...photo,
          userName: `${currentUser.first_name} ${currentUser.last_name}`,
        }));
        setPhotos([...newPhotos, ...photos]);
      });
  };

  const fileSelectHandler = (e) => {
    fileUpload(e.target.files);
  };

  return (
    <div className="photos-container">
      <Typography component="h1" variant="h5">
        Photos
      </Typography>
      <div id="upload-button">
        <Button variant="contained" component="label">
          Upload Photo
          <input type="file" multiple onChange={fileSelectHandler} />
        </Button>
        <div id="progress-bar" className={classes.root}>
          {loading ? <LinearProgress variant="determinate" value={loading} /> : null}
        </div>
      </div>
      <br />
      {photos.map((photo, i) => (
        <div>
          <Typography variant="caption" id="timestamp">
            {`Uploaded by ${photo.userName} on ${moment(photo.createdAt).format('MMMM Do')}`}
          </Typography>
          <img alt={i} src={`http://${HOST}:${PORT}/${photo.photo_link}`} width="330" />
          <br />
        </div>
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
