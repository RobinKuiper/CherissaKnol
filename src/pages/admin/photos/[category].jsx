import Head from 'next/head';
import { useEffect, useState, createRef, useRef } from 'react';
import Modal from 'react-modal';
import { AdminLayout, PhotoForm } from '../../../components/admin';
import prisma from '../../../lib/prisma';
import { GridStack } from 'gridstack';
import 'gridstack/dist/gridstack.css';
import 'gridstack/dist/gridstack-extra.css';
import Image from 'next/image';
import { FaEdit, FaSave, FaWindowClose } from 'react-icons/fa';
import Router from 'next/router';
import { urlHelpers } from '../../../helpers';

const customStyles = {
  overlay: {
    zIndex: 50,
    background: 'rgba(0,0,0,0.7)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Item = ({ id, title, url, setItems, items, saveGrid, toggleModal }) => {
  const [showButtons, setShowButtons] = useState(false);
  const src = url; //`https://picsum.photos/1080/768?random=${id}`;

  const deletePhoto = async () => {
    const response = await fetch(`/api/photos/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    });

    if (response.ok) {
      console.log('Removed'); // TODO: Toast?
      setItems(items.filter((item) => item.id !== id));
      saveGrid();
    } else {
      console.log('Error: ', response.statusText);
    }
  };

  return (
    <div
      className="h-full w-full relative"
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
    >
      <Image src={src} alt={title} layout="fill" />
      {showButtons && (
        <div className="absolute top-0 right-0 flex flex-row">
          <button
            className=" text-white px-2 py-1 rounded-full"
            onClick={() => toggleModal(id)}
          >
            <FaEdit />
          </button>
          <button
            className=" text-white px-2 py-1 rounded-full"
            onClick={deletePhoto}
          >
            <FaWindowClose />
          </button>
        </div>
      )}
    </div>
  );
};

export default function Overview({ photos, category, nodes }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editPhoto, setEditPhoto] = useState(null);
  const [items, setItems] = useState([]);
  const [saving, setSaving] = useState(false);
  const refs = useRef({});
  const gridRef = useRef();

  const toggleModal = (id) => {
    setEditPhoto(photos.find((photo) => Number(photo.id) === Number(id)));
    setIsOpen(!isOpen);
  };

  const saveGrid = async () => {
    setSaving(true);
    const data = {
      nodes: [],
      categoryId: category.id,
    };
    gridRef.current.engine.nodes.forEach((node) => {
      const id = node.el.id;
      const partialNode = {
        id,
        x: node.x,
        y: node.y,
        h: node.h,
        w: node.w,
      };
      data.nodes.push(partialNode);
    });
    // console.log(JSON.stringify(gridRef.current.save()));
    const response = await fetch('/api/grid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log('Saved'); // TODO: Toast or w/e
    } else {
      console.log('Error: ', response.statusText);
    }
    setSaving(false);
  };

  const addPhoto = async () => {
    let x = 0,
      y = 0;
    let free = false;

    while (!free) {
      if (gridRef.current.isAreaEmpty(x, y, 1, 1)) {
        free = true;
      } else {
        x++;
        if (x > 11) {
          x = 0;
          y++;
        }
      }
    }
    free = false;

    const photo = {
      title: new Date().toString(),
      categoryId: category.id,
      url: '/images/placeholder.webp',
      description: '...',
      price: -1,
    };

    const response = await fetch('/api/photos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(photo),
    });

    if (response.ok) {
      photo = await response.json();
      setItems([...items, photo]);
      saveGrid();
      Router.push(Router.asPath);
    } else {
      console.log('Error: ', response.statusText);
    }
  };

  const handleEditPhotoSubmit = async (e) => {
    e.preventDefault();
    e.preventDefault();
    const { id, title, url, description, price } = e.target;

    const response = await fetch(`/api/photos`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id.value,
        title: title.value,
        url: url.value,
        description: description.value,
        price: Number(price.value),
      }),
    });

    if (response.ok) {
      Router.push(Router.asPath);
      toggleModal(null);
    } else {
      console.log('Error: ', response.statusText);
    }
  };

  const handleCategoryNameChange = async (e) => {
    e.preventDefault();
    const { category_name } = e.target;

    const response = await fetch(`/api/categories`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: category.id,
        name: category_name.value,
      }),
    });

    if (response.ok) {
      console.log('Updated'); // TODO: Toast or w/e
      Router.push(`/admin/photos/${urlHelpers.slugify(category_name.value)}`);
    } else {
      console.log('Error: ', response.statusText);
    }
  };

  const toggleCategoryEdit = () => {
    document.getElementById('category').classList.toggle('hidden');
    document.getElementById('category_form').classList.toggle('hidden');
    document.getElementById('category_edit_button').classList.toggle('hidden');
  };

  if (Object.keys(refs.current).length !== items.length) {
    items.forEach(({ id }) => {
      refs.current[id] = refs.current[id] || createRef();
    });
  }

  useEffect(() => {
    const load = async () => {
      await import('gridstack/dist/h5/gridstack-dd-native');
      setItems(
        photos.map((photo) => ({
          ...photo,
          ...nodes.find((node) => Number(node.id) === Number(photo.id)),
        }))
      );
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos]);

  useEffect(() => {
    gridRef.current =
      gridRef.current ||
      GridStack.init(
        {
          float: false,
          // cellHeight: '100px',
          minRow: 1,
          animate: true,
          resizable: { handles: 'se' },
          staticGrid: false,
          margin: 5,
          minWidth: 300,
        },
        '.grid-stack'
      );
    const grid = gridRef.current;
    grid.batchUpdate();
    grid.removeAll(false);
    items.forEach(({ id }) => grid.makeWidget(refs.current[id].current));
    grid.commit();

    grid.on('dragstop', (event, element) => {
      saveGrid();
    });

    grid.on('resizestop', async (event, element) => {
      saveGrid();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <AdminLayout>
      <Head>
        <title>Admin2 - Cherissa Knol</title>
      </Head>

      <div>
        <div className="flex flex-row justify-between border-b border-white pb-1 pt-1">
          <div className="flex flex-row space-x-4">
            <button
              className="py-2 px-4 rounded-full bg-orange-400 text-black"
              onClick={saveGrid}
            >
              {saving ? 'Saving...' : 'Save'}
            </button>

            <button
              className="py-2 px-4 rounded-full bg-orange-400 text-black"
              onClick={addPhoto}
            >
              Add Photo
            </button>
          </div>

          <div>
            <div className="flex flex-row space-x-4">
              <span id="category" className="text-3xl">
                {category.name}
              </span>
              <form
                id="category_form"
                className="hidden flex flex-row"
                onSubmit={handleCategoryNameChange}
              >
                <input
                  type="text"
                  defaultValue={category.name}
                  className="px-3 text-black"
                  name="category_name"
                />
                <button
                  type="submit"
                  className="py-2 px-4 bg-orange-400 text-black"
                >
                  <FaSave />
                </button>
              </form>
              <button
                id="category_edit_button"
                className="py-2 px-4 rounded-full bg-orange-400 text-black"
                onClick={toggleCategoryEdit}
              >
                <FaEdit />
              </button>
            </div>
          </div>
        </div>

        <div className={`grid-stack`}>
          {items.map((item, i) => {
            return (
              <div
                id={item.id}
                ref={refs.current[item.id]}
                key={item.id}
                className={''}
                gs-x={item.x}
                gs-y={item.y}
                gs-w={item.w}
                gs-h={item.h}
              >
                <div className="grid-stack-item-content shadow">
                  <Item
                    {...item}
                    setItems={setItems}
                    items={items}
                    saveGrid={saveGrid}
                    toggleModal={toggleModal}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={toggleModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {editPhoto && (
          <>
            <h2>{editPhoto && editPhoto.title}</h2>
            <PhotoForm onSubmit={handleEditPhotoSubmit} photo={editPhoto} />
          </>
        )}
      </Modal>
    </AdminLayout>
  );
}

// export async function getStaticPaths() {
//   const categories = await prisma.category.findMany();

//   const paths = categories.map((category) => ({
//     params: {
//       category: category.slug,
//     },
//   }));

//   return { paths, fallback: false };
// }

export async function getServerSideProps({ params }) {
  const category = await prisma.category.findUnique({
    where: {
      slug: params.category,
    },
    include: {
      grid: true,
      photos: true,
    },
  });

  // Get all photos from prisma and return props for each photo
  // const photos = await prisma.photo.findMany({
  //   where: {
  //     // categoryId: category.id,
  //     category: {
  //       slug: params.category,
  //     },
  //   },
  //   include: {
  //     category: true,
  //   },
  // });

  // const photos = [];

  return {
    props: {
      photos: category.photos,
      nodes: category.grid ? JSON.parse(category.grid.nodes) : [],
      category,
    },
  };
}
