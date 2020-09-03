import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const Photos = ({ currentUser, currentTrip }) => {
  const [file, setFile] = useState(null);
  // useEffect(() => {

  // }, []);

  const fileUpload = (photo) => {
    const data = new FormData();
    data.append('file', photo);
    axios.post('/photos', data)
      .then((res) => { // then print response status
        console.log(res.data);
      });
  };
  
  const fileSelectHandler = (e) => {
    setFile(e.target.files[0]);
    fileUpload(e.target.files[0]);
  };

  const selected = file ? file.name : '';

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
      {/* {selected}
      <div>
      <Button onClick={fileUpload} color="primary">Upload</Button>
      </div> */}
    </div>
  );
};

export default Photos;
