import { Product } from "./product";

export interface User {
    id: string,
    firstname: string,
    lastname: string,
    username: string,
    phone: string,
    password: string,
    address: string,
    postcode: string,
    city: string,
    country: string,
    favourites: Product[],
    cart: Product[],
    history: Product[],
    power: number, //  1 = normal, 2 = mod, 3 = admin 
}