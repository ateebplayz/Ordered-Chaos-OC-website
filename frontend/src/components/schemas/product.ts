export interface Product {
    id: string,
    title: string,
    description: string,
    images: string[],
    inStock: string,
    inSale: string,
    featured: string,
    special: string,
    price: string,
    discountedPrice?: string,
}