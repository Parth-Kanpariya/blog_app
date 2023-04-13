import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import { getCommentService } from '../../services/commentService';
import './commentList.css';
function CommentList({ blogId }) {
  const [commentList, setCommentList] = useState([]);
  useEffect(() => {
    const fetchCommentList = async () => {
      const commentDataList = await getCommentService(blogId);
      setCommentList(commentDataList.data.data.data[0].comments);
    };
    fetchCommentList();
  }, [blogId]);

  return (
    <div className="comment-list-container">
      <h2 className="comment-heading">Comments</h2>
      <div className="list-container">
        {commentList?.length === 0
          ? 'No Comments!!'
          : commentList?.map((comment) => (
              <Comment key={comment.comment_id} comment={comment} user={comment.user[0]} />
            ))}
      </div>
    </div>
  );
}

export default CommentList;
