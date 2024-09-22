import React from 'react';
import { Avatar } from 'antd';
import { receivingCommentContainerStyle, receivingCommentStyle, sendingCommentContainerStyle, sendingCommentStyle } from './CommentStyles';
import { CommentsIndex } from '@constants';

type CommentsProps = {
    comments: CommentsIndex[];
};

const Comments: React.FC<CommentsProps> = ({ comments }) => {
    return (
        <div>
            {comments.map((comment, index) => (
                <div key={index} style={comment.type === 'sending' ? sendingCommentContainerStyle : receivingCommentContainerStyle}>
                    {comment.type === 'receiving' && (
                        <div className="avatar">
                            <Avatar src={comment.avatarSrc} size={40} />
                        </div>
                    )}
                    <div style={comment.type === 'sending' ? sendingCommentStyle : receivingCommentStyle}>
                        {comment.content}
                    </div>
                    {comment.type === 'sending' && (
                        <div className="avatar">
                            <Avatar src={comment.avatarSrc} size={40} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Comments;
