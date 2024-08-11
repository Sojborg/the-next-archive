'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { BooksTable } from './BooksTable';
import { FaTable, FaList } from 'react-icons/fa';
import BooksList from './BooksList';

const Page = () => {
  const [showTable, setShowTable] = useState(false);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Book Archive</h1>
        <Link href="/books/book-form" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Create New Book
        </Link>

      </div>
      <div className="flex justify-end mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${showTable ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
            }`}
          onClick={() => setShowTable(true)}
        >
          <FaTable className="w-5 h-5" />
        </button>
        <button
          className={`px-4 py-2 rounded ${!showTable ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
            }`}
          onClick={() => setShowTable(false)}
        >
          <FaList className="w-5 h-5" />
        </button>
      </div>

      {showTable
        ? <BooksTable />
        : <BooksList />
      }

    </div>
  );
};


export default Page;


