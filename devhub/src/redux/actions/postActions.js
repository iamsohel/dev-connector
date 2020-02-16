
import { ADD_POST, GET_ERRORS, CLEAR_ERRORS, GET_POSTS, DELETE_POST, POST_LOADING } from './types';
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
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  
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
    // try {
    //     await postService.addLike(id);
    //     dispatch(getPosts());
    // } catch (error) {
    //     dispatch({
    //         type: GET_ERRORS,
    //         payload:  error.response.data
    //     })
    // }
};

// Remove Like
export const removeLike = id => async dispatch => {
    // try {
    //     await postService.(id);
    //     dispatch(getPosts());
    // } catch (error) {
    //     dispatch({
    //         type: GET_ERRORS,
    //         payload:  error.response.data
    //     })
    // }
};

// Add Comment
export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors());
 
};

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
  
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
