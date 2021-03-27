import { useEffect, useState } from 'react';
import useSWR from 'swr';
function LastSalePage() {
  const [sales, setSales] = useState();
  // const [isLoading, setIsLoading] = useState(false);
  const { data, error } = useSWR(
    'https://nextjs-data-fetching-b085e-default-rtdb.firebaseio.com/sales.json'
  );

  useEffect(() => {
    if (data) {
      const transformData = [];

      for (const key in data) {
        transformData.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformData);
    }
  }, [data]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch(
  //     'https://nextjs-data-fetching-b085e-default-rtdb.firebaseio.com/sales.json'
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const transformData = [];

  //       for (const key in data) {
  //         transformData.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       }

  //       setSales(transformData);
  //       setIsLoading(false);
  //     });
  // }, []);

  if (error) {
    return <p>Failed to load</p>;
  }
  if (!data || !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((data) => {
        return (
          <li key={data.id}>
            {data.username} - {data.volume}
          </li>
        );
      })}
    </ul>
  );
}

export default LastSalePage;
