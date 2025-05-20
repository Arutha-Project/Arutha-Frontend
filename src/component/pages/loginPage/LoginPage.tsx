import React from 'react';
import { Layout, notification, Select,  } from 'antd';
import { LoginView } from '../../organisms';
import { validateUserAndValidate } from '../../../services';
import { LoginDataIndex, RoleNames } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../../context/LanguageContext';
import { mainLayoutContainer } from './LoginPageStyle';
import { commonNotificationBody, NotificationType, NotificationTypeIndex } from '../../../util';

const LoginPage: React.FC = () => {
  const { language, changeLanguage } = React.useContext(LanguageContext);
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const Context = React.createContext({ name: 'Default' });

  const onFinish = async (values: LoginDataIndex) => {
    await validateUserAndValidate(values)
      .then(jwtTokenAndUserDetails => {
        localStorage.setItem('accessToken', jwtTokenAndUserDetails.accessToken);
        localStorage.setItem('userDetails', JSON.stringify(jwtTokenAndUserDetails.userDetails));
        console.log('User Details:', jwtTokenAndUserDetails.currentUser);
        if(jwtTokenAndUserDetails.currentUser.roleName === RoleNames.TEACHER) {
        navigate('/teacher-dashboard');
        } else if (jwtTokenAndUserDetails.currentUser.roleName === RoleNames.CHILD) {
          navigate('/');
        } else {
          openNotification(NotificationTypeIndex.ERROR, 'Login Failed', 'Invalid username or password');
        }
      }).catch(error => {
        if (error.response) {
          const { status } = error.response;
          if (status === 401) {
            openNotification(NotificationTypeIndex.ERROR, 'Login Failed', 'Invalid username or password');
          } else if (status === 500) {
            openNotification(NotificationTypeIndex.ERROR, 'System Error', 'Please contact system administrator.');
          } else {
            openNotification(NotificationTypeIndex.ERROR, 'Validation Error', 'Invalid input provided.');
          }
        } else {
          openNotification(NotificationTypeIndex.ERROR, 'System Error', 'Please contact system administrator.');
        }
      });
  };

  const openNotification = (type: NotificationType, message: string, notice: string) => {
    commonNotificationBody(api, type, message, <Context.Consumer>{() => notice}</Context.Consumer>);
  };

  return (
    <Layout style={mainLayoutContainer}>
      {contextHolder}
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
