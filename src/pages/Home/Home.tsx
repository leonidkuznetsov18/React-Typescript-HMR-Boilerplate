import React from 'react';
import { format } from 'date-fns';

const Home = () => {
  return <div>{format(new Date(), "'Today is a' iiii")}</div>;
};

export default Home;
