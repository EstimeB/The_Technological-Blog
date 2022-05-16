const newFormHandler = async (event) => {
  event.preventDefault();

  const blogTitle = document.querySelector('#post-name').value.trim();
  const postDescription = document.querySelector('#post-desc').value.trim();

  if (blogTitle && postDescription) {
    const response = await fetch(`/api/blog/update/${id}`, {
      method: 'POST',
      body: JSON.stringify({ blogTitle, postDescription }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/update');
    } else {
      alert('Failed to update blog');
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
      document.location.replace('/profile');
    } else {
      alert('Failed to delete blog');
    }
  }
};

document
  .querySelector('.btn-primary')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('#deleteIt')
  .addEventListener('click', delButtonHandler);
