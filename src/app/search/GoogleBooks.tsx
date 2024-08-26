import React, { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { Book } from '../books/models/book';

const GoogleBooks: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useLocalStorage<Book[]>('books', []);


  const handleSearch = async () => {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
      const data = await response.json();
      setBooks(data.items);
    } catch (error) {
      console.error('Error searching for books:', error);
    }
  };

  const convertToBookFormData = (book: any): Book => {
    const { id, volumeInfo } = book;
    const { title, authors, description } = volumeInfo;
    const thumbnail = volumeInfo.imageLinks?.thumbnail || '';

    return {
      id,
      title,
      author: authors.join(', '),
      description,
      thumbnail,
      genre: '',
      readingState: '',
      notes: [],
    };
  };

  const handleAddToLocalStorage = (book: any) => {
    const bookFormData = convertToBookFormData(book);
    setBooks([...books, bookFormData]);
  };

  return (
    <div className="flex flex-col items-center text-black">
      <div className="flex">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for books"
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
      <ul className="mt-4 space-y-4">
        {books.map((book: any, index: number) => (
          <li key={book.id} className="flex items-center space-x-4 border border-gray-300 rounded-md p-4 hover:bg-gray-100">
            <div className="flex gap-4 flex-1">
              <img
                src={book.volumeInfo.imageLinks?.thumbnail}
                alt={book.volumeInfo.title}
                className="w-16 h-16 rounded-md"
              />
              <div>
                <h3 className="text-lg font-medium">{book.volumeInfo.title}</h3>
                <p className="text-gray-500">{book.volumeInfo.authors}</p>
              </div>
            </div>
            <button
              onClick={() => handleAddToLocalStorage(book)}
              className="ml-auto px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoogleBooks;