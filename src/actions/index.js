export const fetchSubscribers = () => ({
  type: 'GET_SUBSCRIBERS'
})

export const fetchPosts = () => ({
  type: 'GET_POSTS'
})

export const fetchComments = (selectedName, postId, selectedArticle) => ({
  type: 'GET_COMMENTS',
  payload: {
    selectedName, postId, selectedArticle
  }
})