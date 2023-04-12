
import axios from 'axios';
const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};
export const createFollowingService = async (id) => {
    console.log(id, "/////////////////////")
  try {
    // console.log(body);
    const resp = await axios.post('/api/followings/', null,
    {
        params:{
            blogUserId:id
        }
    }, config);
    return resp;
  } catch (error) {
    return error;
  }
};

export const getFollowingService = async (id) => {
  console.log(id, '=========7777777777==========++++++++++++++++++++');

  try {
    const commentList = await axios.get(
      `/api/followings/${id}`,
      {
        // user_id: localStorage.userId
        // // params: {
        // //   title: query
        // // }
      },
      config
    );
    return commentList;
  } catch (error) {
    return error;
  }
};
