import React, { useState } from 'react';
import { FaBook, FaEdit } from 'react-icons/fa';

const BooksList: React.FC = () => {
    const [reviews, setReviews] = useState<number[]>([]);
    const localStorageBooks = localStorage.getItem('books');
    const books = localStorageBooks ? JSON.parse(localStorageBooks) : [];

    const handleReview = (bookIndex: number, rating: number) => {
        const updatedReviews = [...reviews];
        updatedReviews[bookIndex] = rating;
        setReviews(updatedReviews);
        localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    };

    return (
        <div className="books-list">
            <ul className="mt-4 space-y-4">
                {books.map((book: any, index: number) => (
                    <li key={book.id} className="flex items-center space-x-4 border border-gray-300 rounded-md p-4 hover:bg-gray-100">
                        <div className="flex gap-4 flex-1">
                            <img
                                src={book.thumbnail}
                                alt={book.title}
                                className="w-16 h-16 rounded-md"
                            />
                            <div>
                                <h3 className="text-lg font-medium">{book.title}</h3>
                                <p className="text-gray-500">{book.authors}</p>
                            </div>
                        </div>
                        <div>
                            <h4>Review</h4>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((rating: number) => (
                                    <div >
                                        <FaBook
                                            key={rating}
                                            onClick={() => handleReview(index, rating)}
                                            className={`w-6 h-6 hover:text-blue-500 rounded-md ${reviews[index] >= rating ? 'text-blue-500' : 'text-gray-500'
                                                }`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button
                            onClick={() => { }}
                            className="ml-auto px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <FaEdit className="h-6 w-6" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BooksList;