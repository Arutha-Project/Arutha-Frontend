import { Avatar, Skeleton } from 'antd';
import React from 'react';
import { familyAvatar } from './FCHouseholdProfilePictureStyles';
import { UserOutlined } from '@ant-design/icons';

export interface FCHouseholdProfilePictureProps {
  style?: React.CSSProperties;
  size: number;
  firstParentPhotoUrl?: string;
  secondParentPhotoUrl?: string;
  alt?: string;
  isLoading?: boolean;
}

const FCHouseholdProfilePicture: React.FC<FCHouseholdProfilePictureProps> = ({
  style,
  size,
  firstParentPhotoUrl,
  secondParentPhotoUrl,
  alt = '',
  isLoading = false,
}) => {
  return (
    <React.Fragment>
      {!isLoading && (
        <Avatar.Group>
          <Avatar 
            style={style} 
            size={size} 
            src={firstParentPhotoUrl ? <img src={firstParentPhotoUrl} alt={alt} /> : null}
            icon={!secondParentPhotoUrl ? <UserOutlined /> : null}
             />
          <Avatar
            style={{ ...style, ...familyAvatar }}
            size={size}
            src={secondParentPhotoUrl ? <img src={secondParentPhotoUrl} alt={alt} /> : null}
            icon={!secondParentPhotoUrl ? <UserOutlined /> : null}
          />
        </Avatar.Group>
      )}
      {isLoading && (
        <Avatar.Group>
          <Skeleton.Avatar style={style} active size={size} shape={'circle'} />
          <Skeleton.Avatar
            style={{ ...style, ...familyAvatar }}
            active
            size={size}
            shape={'circle'}
          />
        </Avatar.Group>
      )}
    </React.Fragment>
  );
};

FCHouseholdProfilePicture.defaultProps = {
  firstParentPhotoUrl: '',
  secondParentPhotoUrl: '',
  alt: '',
};

export default FCHouseholdProfilePicture;
