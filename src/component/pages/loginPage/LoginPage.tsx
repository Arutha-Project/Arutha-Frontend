import React from 'react';
import { Layout, Select } from 'antd';
import { LoginView } from '../../organisms';
import { validateUserAndValidate } from '../../../services';
import { LoginDataIndex } from '../../../constants';
import { useAppDispatch } from '../../../reduxToolkit/hooks';
import { setAuthToken } from '../../../reduxToolkit/reducers';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../../context/LanguageContext';
import { mainLayoutContainer } from './LoginPageStyle';

const LoginPage: React.FC = () => {
  const { language, changeLanguage } = React.useContext(LanguageContext);
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
    <Layout style={mainLayoutContainer}>
       <Select value={language} onChange={changeLanguage} style={{ width: 120, marginBottom: 10 }}>
        <Select.Option value="en">English</Select.Option>
        <Select.Option value="si">සිංහල</Select.Option>
      </Select>
      <div>
        <LoginView onFinish={onFinish} />
      </div>
    </Layout>
  );
};

export default LoginPage;
