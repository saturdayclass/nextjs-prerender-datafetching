import path from 'path';
import fs from 'fs/promises';
function ProductDetailPage(props) {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
}

export default ProductDetailPage;

const getData = async () => {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
};

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.productId;
  const data = await getData();

  const product = data.product.find((product) => product.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.product.map((product) => product.id);
  const pathWithParams = ids.map((id) => ({ params: { productId: id } }));

  return {
    paths: pathWithParams,
    fallback: false,
  };
}
