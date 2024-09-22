import { Progress } from 'antd';
import { mainContainer, progressStyle } from './UserProfileProgressBarStyle';

export interface UserProfileProgressBarProps {
  percent: number;
  size: number;
}

const UserProfileProgressBar: React.FC<UserProfileProgressBarProps> = ({ percent, size }) => {
  // TODO: Transition the progress bar with animation
  return (
    <div style={mainContainer}>
      <Progress
        size={size}
        type="circle"
        showInfo={false}
        percent={percent}
        gapPosition="right"
        gapDegree={1}
        strokeWidth={6}
        strokeColor={{ '0%': '#A9DCD7', '100%': '#EFD971' }}
        trailColor="#ffffff"
        style={progressStyle}
      />
    </div>
  );
};

export default UserProfileProgressBar;
