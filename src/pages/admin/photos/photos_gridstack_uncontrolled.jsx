import Head from 'next/head';
import { useEffect, useState, createRef, useRef, useLayoutEffect } from 'react';
import { AdminLayout } from '../../../components/admin';
import prisma from '../../../lib/prisma';
import { GridStack } from 'gridstack';
import 'gridstack/dist/gridstack.css';
import 'gridstack/dist/gridstack-extra.css';
import Image from 'next/image';

const Item = ({ id }) => (
  <div className="h-full w-full">
    <Image
      src={`https://picsum.photos/1080/768?random=${id}`}
      alt="test"
      layout="fill"
    />
  </div>
);

export default function Overview({ photos }) {
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const refs = useRef({});
  const gridRef = useRef();

  const addItem2 = () => {
    const grid = gridRef.current;
    const node = {
      x: 1 * count,
      y: 0,
      w: 1,
      h: 1,
    };
    node.id = node.content = <Item id={count} />;
    setCount((prevState) => (prevState += 1));
    setItems([...items, node]);
    grid.addWidget(node);
  };

  if (Object.keys(refs.current).length !== items.length) {
    items.forEach(({ id }) => {
      refs.current[id] = refs.current[id] || createRef();
    });
  }

  useEffect(() => {
    const load = async () => {
      await import('gridstack/dist/h5/gridstack-dd-native');
      setItems([]); // Item loading here!!!
    };
    load();
  }, []);

  useEffect(() => {
    gridRef.current =
      gridRef.current ||
      GridStack.init(
        {
          float: true,
          // cellHeight: '100px',
          minRow: 1,
        },
        '.grid-stack'
      );
    const grid = gridRef.current;
    // grid.batchUpdate();
    // grid.removeAll(false);
    // items.forEach(({ id }) => grid.makeWidget(refs.current[id].current));
    // grid.commit();

    grid.on('dragstop', (event, element) => {
      const node = element.gridstackNode;
      console.log('node: ', node);
      setItems((prevState) => {
        const item = prevState.find((item) => item.id === node.id);
        item.x = node.x;
        item.y = node.y;
        return [...prevState];
      });
    });
  }, [items]);

  return (
    <AdminLayout>
      <Head>
        <title>Admin2 - Cherissa Knol</title>
      </Head>

      <div>
        <div>{JSON.stringify(items[0])}</div>
        <button onClick={addItem2}>Add new widget</button>
        <div className={`grid-stack`}>
          {/* {items.map((item, i) => {
            return (
              <div
                ref={refs.current[item.id]}
                key={item.id}
                className={'grid-stack-item'}
              >
                <div className="grid-stack-item-content shadow">
                  <Item {...item} />
                </div>
              </div>
            );
          })} */}
        </div>
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps({ params }) {
  // Get all photos from prisma and return props for each photo
  const photos = await prisma.photo.findMany({
    include: {
      category: true,
    },
  });

  return {
    props: {
      photos,
    },
  };
}
