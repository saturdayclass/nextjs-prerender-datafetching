import { useEffect, useState } from 'react';

function LastSalePage() {
  const [sales, setSales] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(
      'https://nextjs-data-fetching-b085e-default-rtdb.firebaseio.com/sales.json'
    )
      .then((response) => response.json())
      .then((data) => {
        const transformData = [];

        for (const key in data) {
          transformData.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }

        setSales(transformData);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!sales) {
    return <p>No data yet</p>;
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
