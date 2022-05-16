import React from 'react';

export const CategoryForm = ({ category, onSubmit }) => {
  return (
    <form className="w-full max-w-lg" onSubmit={onSubmit}>
      {category && <input type="hidden" name="id" value={category.id} />}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          name="name"
          defaultValue={(category && category.name) || ''}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {category ? 'Update' : 'Save'}
        </button>
      </div>
    </form>
  );
};
