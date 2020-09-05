import axios from 'axios';
import apiKey from './config';

const flightApi = () => {
  axios.get(
    'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/MSY-sky/BNA-sky/2020-09-08',
    {
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
        useQueryString: true,
        'content-type': 'application/octet-stream',
      },
    },
  );
};

export default flightApi;
