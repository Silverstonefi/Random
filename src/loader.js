import React from 'react';
import ContentLoader from 'react-content-loader';
import { TailSpin } from 'react-loader-spinner';

const MyLoader = (props) => (
  <div
    className="w-full flex justify-center items-center text-primary"
    style={{ height: '650px' }}
  >
    <TailSpin height="100" width="100" color="indigo" ariaLabel="loading" />
  </div>
);

export default MyLoader;
