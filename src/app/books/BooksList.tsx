'use client'
import React, { useState } from 'react';
import { FaBook, FaEdit } from 'react-icons/fa';
import { useLocalStorage } from 'usehooks-ts';
import { Book } from './models/book';

interface BookReview {
  id: number;
  bookId: string;
  userId: number;
  rating: number;
}

const BooksList: React.FC = () => {
  const [reviews, setReviews] = useLocalStorage<BookReview[]>('reviews', []);
  const [books] = useLocalStorage<Book[]>('books', []);

  const handleReview = (bookIndex: number, rating: number) => {
    const bookId = books[bookIndex].id;
    const userId = 1; // Assuming a fixed user ID for now

    const existingReviewIndex = reviews.findIndex((review: BookReview) => review.bookId === bookId && review.userId === userId);

    if (existingReviewIndex !== -1) {
      reviews[existingReviewIndex].rating = rating;
    } else {
      const newReview: BookReview = {
        id: reviews.length + 1,
        bookId,
        userId,
        rating,
      };
      reviews.push(newReview);
    }

    setReviews(reviews);
  };

  return (
    <div className="books-list">
      <ul className="mt-4 space-y-4">
        {books.map((book: any, index: number) => {           
          const bookReview = reviews.find((review: BookReview) => review.bookId === book.id && review.userId === 1);  

            return (
              <li key={book.id} className="flex items-center space-x-4 border border-gray-300 rounded-md p-4 hover:bg-gray-100">
                <div className="flex gap-8 flex-1">
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
                  <div className="flex gap-2 mr-8">
                    {[1, 2, 3, 4, 5].map((rating: number) => (
                      <div>
                        <FaBook
                          key={rating}
                          onClick={() => handleReview(index, rating)}
                          className={`w-6 h-6 cursor-pointer hover:text-blue-500 rounded-md ${bookReview && bookReview.rating >= rating ? 'text-blue-500' : 'text-gray-500'}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => { }}
                  className="ml-auto px-4 py-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <FaEdit className="h-4 w-4" />
                </button>
              </li>
            );
        })}
      </ul>
    </div>
  );
};

export default BooksList;