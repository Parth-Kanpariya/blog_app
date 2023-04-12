import React, { useState } from 'react';
import { CustomSearchInput } from '../CustomInput';
import Button from '../Button';
import { createCommentService } from '../../services/commentService';
import { successToast, errorToast } from '../../helper/ToastComponent';
import { useNavigate } from 'react-router';
import { ToastContainer } from 'react-bootstrap';

function CommentInput(props) {
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const handleCommentSubmit = async (e) => {
    if (comment === '') return;
    try {
      const body = {
        blog_id: props.blogId,
        text: comment
      };
      const resp = await createCommentService(body);
      if (resp.status === 201) {
        successToast('Comment Added');
        // navigate('/');
        props.cancleCommentBox();
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
    <div
      style={{
        position: 'fixed',
        top: 100,
        right: 0,
        bottom: 0,
        width: '500px',
        backgroundColor: '#f0f0f0',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        paddingTop: '60px',
        alignContent: 'center'
      }}>
      <CustomSearchInput
        value={comment}
        onChange={handleCommentChange}
        placeholder="What are your thoughts?"
        style={{ width: '25rem', height: '20px' }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '30px'
        }}>
        <Button
          onClick={handleCancleButton}
          text="Cancle"
          style={{ width: '100px', height: '40px', backgroundColor: 'white' }}
        />
        <Button
          onClick={handleCommentSubmit}
          text="Submit"
          type="submit"
          style={{ width: '100px', height: '40px', marginLeft: '50px' }}
        />
        <ToastContainer />
      </div>
    </div>
  );
}

export default CommentInput;
