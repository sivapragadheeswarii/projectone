
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { ref, push, set, onValue, remove, update } from 'firebase/database';
import Swal from 'sweetalert2';

function Bookcrud() {
  const [data, setData] = useState({ name: '', author: '' });
  const [imageData, setImageData] = useState('');
  const [books, setBooks] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const bookRef = ref(db, 'books');
    onValue(bookRef, (snapshot) => {
      const items = [];
      snapshot.forEach((child) => {
        items.push({ id: child.key, ...child.val() });
      });
      setBooks(items);
    });
  }, []);

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const previewURL = URL.createObjectURL(file);
    if (previewURL) setImageData(previewURL);
  };

  function addOrUpdateBook(e) {
    e.preventDefault();
    if (editId) {
      update(ref(db, `books/${editId}`), {
        ...data,
        image: imageData,
      }).then(() => {
        resetForm();
        Swal.fire({
          icon: 'success',
          title: 'Book updated!',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
        });
      });
    } else {
      const bookRef = push(ref(db, 'books'));
      set(bookRef, {
        ...data,
        image: imageData,
      }).then(() => {
        resetForm();
        Swal.fire({
          icon: 'success',
          title: 'Book added!',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
        });
      });
    }
  }

  function deleteBook(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This book will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        remove(ref(db, `books/${id}`)).then(() => {
          Swal.fire('Deleted!', 'Book has been deleted.', 'success');
        });
      }
    });
  }

  function editBook(book) {
    setEditId(book.id);
    setData({ name: book.name, author: book.author });
    setImageData(book.image);
  }

  function resetForm() {
    setEditId(null);
    setData({ name: '', author: '' });
    setImageData('');
  }

  return (
    <div className="a1">
      {/* Form Container */}
      <div className="form-container">
        <h2 className="a2">{editId ? 'Edit Book' : 'Add Book'}</h2>
        <form className="a3" onSubmit={addOrUpdateBook}>
          <input
            type="text"
            name="name"
            placeholder="Book Name"
            value={data.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={data.author}
            onChange={handleChange}
            required
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imageData && <img className="a4" src={imageData} alt="Preview" />}
          <button type="submit">{editId ? 'Update' : 'Add'} Book</button>
        </form>
      </div>

      {/* List Container */}
      <div className="list-container">
        <h3 className="a5">Book List</h3>
        <div className="a6">
          {books.map((book) => (
            <div key={book.id} className="a7">
              <p>
                <strong>{book.name}</strong> by {book.author}
              </p>
              {book.image && <img className="a8" src={book.image} alt="Book" />}
              <div className="a9">
                <button className="a10" onClick={() => editBook(book)}>
                  Edit
                </button>
                <button className="a11" onClick={() => deleteBook(book.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Bookcrud;
