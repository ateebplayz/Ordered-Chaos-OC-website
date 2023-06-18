export interface Product {
    id: number,
    title: string,
    description: string,
    images?: string[],
    inStock: boolean,
    inSale: boolean,
    special: string,
    prices: {
        price: number,
        discountedPrice: number,
    }
}