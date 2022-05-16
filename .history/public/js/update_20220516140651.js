const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#post-name').value.trim();
  const post_description = document.querySelector('#post-desc').value.trim();

  if (name && post_description) {
    const response = await fetch(`/api/blogs/update/${id}`, {
      method: 'POST',
      body: JSON.stringify({ name, post_description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update post');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blog/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

document
  .querySelector('.btn-primary')
  .addEventListener('click', newFormHandler);

document
  .querySelector('#deleteIt')
  .addEventListener('click', delButtonHandler);
