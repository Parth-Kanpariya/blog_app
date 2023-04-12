import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import { getCommentService } from '../../services/commentService';

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
    <div style={{ marginLeft: '2rem' }}>
      <h2 style={{ textAlign: 'justify' }}>Comments</h2>
      <div style={{ marginBottom: '5rem' }}>
        {commentList?.length === 0
          ? 'No Comments!!'
          : commentList?.map((comment) => (
              <Comment key={comment.comment_id} comment={comment} user={comment.user[0]} />
            ))}
      </div>
      {console.log(commentList)}
    </div>
  );
}

export default CommentList;
