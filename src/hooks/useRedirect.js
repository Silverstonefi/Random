import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { suspend } from 'suspend-react';
import useProtectedUser from './useProtectedUser';

const useRedirect = (page) => {
  const token = useSelector((state) => state.auth.token);
  let navigate = useNavigate();

  const { decodedToken } = suspend(useProtectedUser, [token]);

  useEffect(() => {
    if (decodedToken == '') {
      navigate('/login', { replace: false });
    }
  });
  console.log({ decodedToken });
};

export default useRedirect;
