import React from 'react';
import { Avatar } from 'antd';
import { mainContainer } from './NameWithAvatarStyle';

export interface NameWithAvatarProps {
    image: string;
    name: string;
    width?: boolean;
}

const NameWithAvatar: React.FC<NameWithAvatarProps> = ({ image, name, width }) => {
    return (
        <div style={mainContainer}>
            <Avatar src={image} size={width ? 'small' : 'large'} />
            <div style={width ? { marginLeft: '5px' } : { marginLeft: '10px' }} >
                <div>{name}</div>
            </div>
        </div>
    );
};

export default NameWithAvatar;
