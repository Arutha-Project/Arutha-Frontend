import { Avatar, Skeleton, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React from 'react';

export interface UserProfilePictureProps {
  style?: React.CSSProperties;
  size: number;
  imageUrl?: string;
  alt?: string;
  isLoading?: boolean;
  isShowEdit?: boolean;
}

const UserProfilePicture: React.FC<UserProfilePictureProps> = ({
  style,
  size,
  imageUrl = '',
  alt = '',
  isLoading = false,
  isShowEdit,
}) => {
  const avatarElement = (
    <Avatar
      style={style}
      size={size}
      src={imageUrl ? <img src={imageUrl} alt={alt} /> : null}
      icon={!imageUrl ? <UserOutlined /> : null}
    />
  );

  return (
    <React.Fragment>
      {!isLoading ? (
        isShowEdit ? (
          <Tooltip title="Edit Profile Picture">
            {avatarElement}
          </Tooltip>
        ) : (
          avatarElement
        )
      ) : (
        <Skeleton.Avatar active size={size} shape="circle" style={style} />
      )}
    </React.Fragment>
  );
};

UserProfilePicture.defaultProps = {
  imageUrl: '',
  alt: '',
};

export default UserProfilePicture;
