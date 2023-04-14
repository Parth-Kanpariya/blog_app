import React, { useState } from 'react';
import { CustomSearchInput } from '../CustomInput';
import Button from '../Button';
import { createCommentService } from '../../services/commentService';
import { successToast, errorToast } from '../../helper/ToastComponent';
import { ToastContainer } from 'react-bootstrap';
import './commentInput.css';

function CommentInput(props) {
  const [comment, setComment] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (comment === '') return;
    try {
      const body = {
        blog_id: props.blogId,
        text: comment
      };
      const resp = await createCommentService(body);
      if (resp.status === 201) {
        successToast('Comment Added');

        props.cancleCommentBox();
        window.location.reload();
      } else {
        errorToast('Comment not deleted!');
      }
    } catch (error) {
      errorToast('Comment not deleted!');
    }
  };
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  const handleCancleButton = (e) => {
    props.cancleCommentBox();
  };
  return (
    <div className="comment-input-container">
      <CustomSearchInput
        value={comment}
        onChange={handleCommentChange}
        placeholder="What are your thoughts?"
        style={{ width: '25rem', height: '20px' }}
      />{' '}
      <div className="button-container">
        <Button
          onClick={handleCancleButton}
          text="Cancle"
          style={{ width: '100px', height: '40px', backgroundColor: 'white' }}
        />{' '}
        <Button
          onClick={handleCommentSubmit}
          text="Submit"
          type="submit"
          style={{ width: '100px', height: '40px', marginLeft: '50px' }}
        />{' '}
        <ToastContainer />
      </div>{' '}
    </div>
  );
}

export default CommentInput;
