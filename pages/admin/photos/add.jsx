import Head from 'next/head';
import { Layout } from '../../../components';

export const add = () => {
  return (
    <Layout>
      <Head>
        <title>Add Photo - Cherissa Knol</title>
      </Head>

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center">Add Photo</h1>
        <p className="text-center">
          <a href="/admin/photos">Back to Photos</a>
        </p>
        <form
          className="w-full max-w-lg"
          onSubmit={(e) => {
            e.preventDefault();
            const { id, title, category } = e.target;

            try {
              fetch('/api/photos', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  id: id.value,
                  title: title.value,
                  category: category.value,
                }),
              });
            } catch (error) {
              console.error(error);
            }
          }}
        >
          <input type="hidden" name="id" />
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              name="title"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="category"
              type="text"
              name="category"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default add;
