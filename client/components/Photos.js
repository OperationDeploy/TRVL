import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import PropTypes from 'prop-types';

const Photos = ({ currentTrip }) => {
  // TODO: CONNECT PHOTOS TO DB
  // const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios.get(`/photos/${currentTrip.id}`)
      .then(() => {
        // setPhotos(data);
      });
  }, []);

  const fileUpload = (photo) => {
    const data = new FormData();
    data.append('file', photo);
    axios.post('/photos', data)
      .then((res) => {
        console.info(res.data);
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
    </div>
  );
};

Photos.propTypes = {
  currentTrip: PropTypes.objectOf.isRequired,
};

export default Photos;
