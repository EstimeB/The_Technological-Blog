const newFormHandler = async (event) => {
  event.preventDefault();

  const blogTitle = document.querySelector('#post-name').value.trim();
  const postDescription = document.querySelector('#post-desc').value.trim();

  if (blogTitle && postDescription) {
    const response = await fetch(`/api/blogs/update/${name}`, {
      method: 'POST',
      body: JSON.stringify({ blogTitle, postDescription }),
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
      document.location.replace('/update');
    } else {
      alert('Failed to delete post');
    }
  }
};

document
  .querySelector('.btn-primary')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('#deleteIt')
  .addEventListener('click', delButtonHandler);
