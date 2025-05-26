import React from 'react';
import { Layout, notification } from 'antd';
import { LoginView } from '../../organisms';
import { validateUserAndValidate } from '../../../services';
import { LoginDataIndex, RoleNames } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { mainLayoutContainer } from './LoginPageStyle';
import { commonNotificationBody, NotificationType, NotificationTypeIndex } from '../../../util';
import { useTranslation } from 'react-i18next';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = React.useState(false);
  const Context = React.createContext({ name: 'Default' });
  const { t } = useTranslation();

  const onFinish = async (values: LoginDataIndex) => {
    setIsLoading(true);
    await validateUserAndValidate(values)
      .then(jwtTokenAndUserDetails => {
        localStorage.setItem('accessToken', jwtTokenAndUserDetails.jwtToken);
        localStorage.setItem('userDetails', JSON.stringify(jwtTokenAndUserDetails.currentUser));
        console.log('User Details:', jwtTokenAndUserDetails.currentUser);
        if (jwtTokenAndUserDetails.currentUser.roleName === RoleNames.TEACHER) {
          navigate('/home');
        } else if (jwtTokenAndUserDetails.currentUser.roleName === RoleNames.STUDENT) {
          navigate('/home');
        } else {
          openNotification(NotificationTypeIndex.ERROR, t('Login Failed'), t('Invalid username or password'));
        }
      }).catch(error => {
        if (error.response) {
          const { status } = error.response;
          if (status === 401) {
            openNotification(NotificationTypeIndex.ERROR, t('Login Failed'), t('Invalid username or password'));
          } else if (status === 500) {
            openNotification(NotificationTypeIndex.ERROR, t('System Error'), t('Please contact system administrator'));
          } else {
            openNotification(NotificationTypeIndex.ERROR, t('Validation Error'), t('Invalid input provided'));
          }
        } else {
          openNotification(NotificationTypeIndex.ERROR, t('System Error'), t('Please contact system administrator'));
        }
      }).finally(() => {
        setIsLoading(false);
      });
  };

  const openNotification = (type: NotificationType, message: string, notice: string) => {
    commonNotificationBody(api, type, message, <Context.Consumer>{() => notice}</Context.Consumer>);
  };

  return (
    <Layout style={mainLayoutContainer}>
      {contextHolder}
      <div>
        <LoginView onFinish={onFinish} isLoading={isLoading} />
      </div>
    </Layout>
  );
};

export default LoginPage;
