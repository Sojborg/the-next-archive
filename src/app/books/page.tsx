'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { BooksTable } from './BooksTable';

const Page = () => {
  const [showForm, setShowForm] = useState(false);

  const handleCreateBook = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Book Archive</h1>
          <Link href="/books/book-form" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Create New Book
          </Link>
        
      </div>

      <BooksTable />
      
    </div>
  );
};


export default Page;
    
    
