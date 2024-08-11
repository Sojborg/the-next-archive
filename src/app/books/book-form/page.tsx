'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Book } from '../models/book';

const readingStates = ['Not Started', 'In Progress', 'Finished'] as const;

const Page = ({ onCancel }: { onCancel: () => void }) => {
  const { register, handleSubmit } = useForm<Book>();
  const [notes, setNotes] = useState<string[]>([]);

  const addNote = () => {
    setNotes([...notes, '']);
  };

  const removeNote = (index: number) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  const updateNote = (index: number, value: string) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = value;
    setNotes(updatedNotes);
  };

  const onSubmit = (data: Book) => {
    const submitData = {
      ...data,
      notes,
    };

    // Add the book data to a list in local storage
    const savedBooks = JSON.parse(localStorage.getItem('books') || '[]');
    savedBooks.push(submitData);
    localStorage.setItem('books', JSON.stringify(savedBooks));

    // Handle form submission logic here
    console.log(submitData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <div className="mb-4">
        <label htmlFor="title" className="block font-medium mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          {...register('title', { required: true })}
          className="border border-gray-300 rounded px-3 py-2 w-full text-black"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="author" className="block font-medium mb-2">
          Author
        </label>
        <input
          type="text"
          id="author"
          {...register('author', { required: true })}
          className="border border-gray-300 rounded px-3 py-2 w-full text-black"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="genre" className="block font-medium mb-2">
          Genre
        </label>
        <input
          type="text"
          id="genre"
          {...register('genre', { required: true })}
          className="border border-gray-300 rounded px-3 py-2 w-full text-black"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="readingState" className="block font-medium mb-2">
          Reading State
        </label>
        <select
          id="readingState"
          {...register('readingState', { required: true })}
          className="border border-gray-300 rounded px-3 py-2 w-full text-black"
        >
          {readingStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="notes" className="block font-medium mb-2">
          Notes
        </label>
        {notes.map((note, index) => (
          <div key={index} className="flex mb-2">
            <input
              type="text"
              value={note}
              onChange={(e) => updateNote(index, e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full text-black"
            />
            <button
              type="button"
              onClick={() => removeNote(index)}
              className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addNote}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Note
        </button>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 mr-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Book
        </button>
      </div>
    </form>
  );
};

export default Page;

