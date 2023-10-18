import { config } from '@config';
import { Product } from '@types';

export const getProductByBarcode = async (barcode: string) => {
  const url = new URL(
    `products?key=${config.barcodeLookUp.apiKey}&barcode=${barcode}`,
    config.barcodeLookUp.apiHost
  );

  const response = await fetch(url.href, {
    method: 'GET',
    headers: new Headers({ 'content-type': 'application/json' }),
  });

  if (response.status >= 400) {
    throw new Error(
      `Failed to fetch product. Request failed with ${response.status} status code`
    );
  }

  const data = await response.json();

  const [product] = data.products;

  return product as Product;
};
