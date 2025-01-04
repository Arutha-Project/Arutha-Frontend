import React from 'react';
import { Layout } from 'antd';
import { LoginView } from '../../organisms';
import { validateUserAndValidate } from '../../../services';
import { LoginDataIndex } from '../../../constants';
import { useAppDispatch } from '../../../reduxToolkit/hooks';
import { setAuthToken } from '../../../reduxToolkit/reducers';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: LoginDataIndex) => {
    await validateUserAndValidate(values)
      .then(jwtTokenAndUserDetails => {
        dispatch(setAuthToken(jwtTokenAndUserDetails.jwtToken));
        navigate('/home');
      }).catch(error => {
        console.error('Validation failed:', error);
      });
  };

  return (
    <Layout
      style={{
        display: 'flex',
        backgroundImage: 'url(src/assets/images/LoginPageBackground.jpg)',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div >
        <LoginView onFinish={onFinish} />
      </div>
    </Layout>
  );
};

export default LoginPage;
