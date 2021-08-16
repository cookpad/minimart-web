import { graphqlRequest } from "./graphqlClient";

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};

export type CartItem = {
  product: Product; // 商品
  quantity: number; // 個数
};

const listProductsQuery = `
  query listProducts {
    products {
      id
      name
      description
      price
      imageUrl
    }
  }
`;

const getProductQuery = `
  query getProduct($id: ID!) {
    product(id: $id) {
      id
      name
      price
      description
      imageUrl
    }
  }
`;

export async function listProducts(): Promise<Product[]> {
  const data = await graphqlRequest({ query: listProductsQuery });
  return data.products;
}

export async function getProduct(id: string): Promise<Product> {
  const data = await graphqlRequest({ query: getProductQuery, variables: { id: id } });
  return data.product;
}
