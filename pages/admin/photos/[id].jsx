import Head from 'next/head';
import { Layout } from '../../../components';
import { photoRepo } from '../../../helpers';

const Photo = ({ photo }) => {
  return (
    <Layout>
      <Head>
        <title>Edit Photo - Cherissa Knol</title>
      </Head>

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center">Edit Photo</h1>
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
                method: 'PUT',
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
          <input type="hidden" name="id" value={photo.id} />
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
              defaultValue={photo.title}
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
              defaultValue={photo.category}
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

export async function getStaticPaths() {
  return {
    paths: photoRepo.getPhotos().map((photo) => {
      return {
        params: {
          id: photo.id,
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const photo = photoRepo.getPhoto(params.id);

  return {
    props: {
      photo,
    },
  };
}

export default Photo;
