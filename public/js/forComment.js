const newCommentFormHandler = async (event) => {
  event.preventDefault();

  const comment_des = document.querySelector('#comment-desc').value.trim();
  const blog_id = document.querySelector('#comment-desc').getAttribute('data-blog-id');

  if (comment_des) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ comment_des, blog_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to post comment');
    }
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentFormHandler);
