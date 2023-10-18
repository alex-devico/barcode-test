export type Product = {
  title: string
  category: string
  brand: string
  description: string
  images: Array<string>
}

export type StoreProducts = Record<string, Product>
