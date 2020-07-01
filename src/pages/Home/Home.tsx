import React from 'react';
import { format } from 'date-fns';
import { red } from '@material-ui/core/colors';

const Home = () => {
  return <div style={{background: "red"}}>{format(new Date(), "'Today is a' iiii")}</div>;
};

export default Home;
