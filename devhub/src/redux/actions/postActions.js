
import { ADD_POST, GET_ERRORS, CLEAR_ERRORS, GET_POSTS, DELETE_POST, POST_LOADING, GET_POST } from './types';
import  postService  from '../../services/postService';

// Add Post
export const addPost = postData => async dispatch => {
  dispatch(clearErrors());
    try {
        const { data } = await postService.addUserPost(postData);
        dispatch({type: ADD_POST, payload: data})
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload:  error.response.data
        })
    }
};

// Get Posts
export const getPosts = () => async dispatch => {
  dispatch(setPostLoading());
  try {
      const { data } = await postService.getUserPosts();
      dispatch({type: GET_POSTS, payload: data})
  } catch (error) {
      dispatch({
          type: GET_POSTS,
          payload:  null
      })
  }
};

// Get Post
export const getPost = id => async dispatch => {
  dispatch(setPostLoading());
  try {
    const { data } = await postService.getUserPost(id);
    dispatch({type: GET_POST, payload: data})
  } catch (error) {
      dispatch({
          type: GET_POST,
          payload:  null
      })
  }
};

// Delete Post
export const deletePost = id => async dispatch => {
    try {
        await postService.deleteUserPost(id);
        dispatch({
            type: DELETE_POST,
            payload: id
        })
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload:  error.response.data
        })
    }
};

// Add Like
export const addLike = id => async dispatch => {
    try {
        await postService.likePost(id);
        dispatch(getPosts());
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload:  error.response.data
        })
    }
};

// Remove Like
export const removeLike = id => async dispatch => {
    try {
        await postService.unlikePost(id);
        dispatch(getPosts());
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload:  error.response.data
        })
    }
};

// Add Comment
export const addComment = (post_id, commentData) => async dispatch => {
  dispatch(clearErrors());
  try {
    await postService.commentPost(post_id, commentData);
    dispatch(getPosts());
  } catch (error) {
      dispatch({
          type: GET_ERRORS,
          payload:  error.response.data
      })
  }
};

// Delete Comment
export const deleteComment = (post_id, comment_id) => async dispatch => {
  try {
    const { data } = await postService.deleteCommentPost(post_id, comment_id);
    dispatch({
      type: GET_POST,
      payload: data
    })
  } catch (error) {
      dispatch({
          type: GET_ERRORS,
          payload:  error.response.data
      })
  }
};

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
