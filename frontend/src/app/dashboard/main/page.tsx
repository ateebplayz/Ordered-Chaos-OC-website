'use client'
import NavBar from '@/components/navbar';
import { useRouter } from 'next/navigation';
import '../../globals.css'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { User } from '@/components/schemas/user';
import { Product } from '@/components/schemas/product';
import { ProductDB } from '@/components/product';
import { dbUrl } from '@/components/url';

const initial:User = {
    id: '',
    firstname: 'Firstname is a required field',
    lastname: 'Lastname is a required field',
    username: 'Username is a required field',
    phone: '',
    password: 'Password is a required field',
    address: 'Address is a required field',
    postcode: 'Postcode is a required field',
    city: 'City is a required field',
    country: 'Country is a required field',
    favourites: [],
    cart: [],
    history: [],
    power: 0
}
const initialProd: Product = {
    id: 'ID is a required field',
    title: 'Title is a required field',
    description: 'Description is a required field',
    images:['Image is a required field!'],
    inStock: 'In Stock is a required field',
    inSale: 'In Sale is a required field',
    featured: 'Featured is a required field',
    special: 'Special is a required field',
    price: 'Price is a required field',
    discountedPrice: 'Discounted % is a required field(set to 0 for no discount)',
}
const ProductsHome = ({ products }: { products: Product[] }) => {
	const productList = products.map((product, index) => (
	  <ProductDB key={index} product={product} />
	));
	return <div className='home-featured-products-products-container'>{productList}</div>;
  };
export default function Dashboard() {
  const [products, setProducts] = useState([])
  let prods: Product[] = [];
  const fetchProds = async () => {
    const resp = await axios.get('http://localhost:8080/api/products')
    setProducts(resp.data.products)
  }
  fetchProds()
  const router = useRouter();
  const [errors, setErrors] = useState(initial)
  const [values, setValues] = useState(initial)
  const [errored, setErrored] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const [errorsProd, setErrorsProd] = useState(initialProd)
  const [valuesProd, setValuesProd] = useState(initialProd)
  const [erroredProd, setErroredProd] = useState(false)
  const [successProd, setSuccessProd] = useState(false)
  const [errorProd, setErrorProd] = useState('')

  const handleInputProd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if(name == 'id') {
        if(value === '') {
            setErrorsProd(
                {
                    ...errorsProd,
                    title: 'ID is a required field!'
                }
            )
        } else {
            setErrorsProd(
                {
                    ...errorsProd,
                    id: ''
                }
            )
            setValuesProd(
                {
                    ...valuesProd,
                    id: value,
                }
            )
        }
    } else if(name == 'name') {
        if(value.length < 4 || value.length > 64) {
            setErrorsProd(
                {
                    ...errorsProd,
                    title: 'Name must be between 4-32 chars!'
                }
            )
        } else if (value === '') {
            setErrorsProd(
                {
                    ...errorsProd,
                    title: 'Name is a required field!'
                }
            )
        } else {
            setErrorsProd(
                {
                    ...errorsProd,
                    title: ''
                }
            )
            setValuesProd(
                {
                    ...valuesProd,
                    title: value,
                }
            )
        }
    } else if(name === 'desc') {
        if(value.length < 4 || value.length > 512) {
            setErrorsProd(
                {
                    ...errorsProd,
                    description: 'Description must be between 4-512 chars!'
                }
            )
        } else if (value === '') {
            setErrorsProd(
                {
                    ...errorsProd,
                    description: 'Description is a required field!'
                }
            )
        } else {
            setErrorsProd(
                {
                    ...errorsProd,
                    description: ''
                }
            )
            setValuesProd(
                {
                    ...valuesProd,
                    description: value,
                }
            )
        }
    } else if(name === 'img') {
        if(!(value.startsWith('https://i.imgur.com/'))) {
            setErrorsProd(
                {
                    ...errorsProd,
                    images: ['Image must start with https://i.imgur.com/ !']
                }
            )
        } else if (value === '') {
            setErrorsProd(
                {
                    ...errorsProd,
                    images: ['Image is a required field!']
                }
            )
        } else {
            setErrorsProd(
                {
                    ...errorsProd,
                    images: ['']
                }
            )
            setValuesProd(
                {
                    ...valuesProd,
                    images: [value],
                }
            )
        }
    } else if(name === 'inStock') {
        if(value.toLowerCase() !== 'no' && value.toLowerCase() !== 'yes') {
            setErrorsProd(
                {
                    ...errorsProd,
                    inStock: 'InStock must be a yes or no'
                }
            )
        } else if (value === '') {
            setErrorsProd(
                {
                    ...errorsProd,
                    inStock: 'InStock is a required field'
                }
            )
        } else {
            setErrorsProd(
                {
                    ...errorsProd,
                    inStock: ''
                }
            )
            setValuesProd(
                {
                    ...valuesProd,
                    inStock: value.toLowerCase(),
                }
            )
        }
    } else if(name === 'inSale') {
        if(value.toLowerCase() !== 'no' && value.toLowerCase() !== 'yes') {
            setErrorsProd(
                {
                    ...errorsProd,
                    inSale: 'InSale must be a yes or no'
                }
            )
        } else if (value === '') {
            setErrorsProd(
                {
                    ...errorsProd,
                    inSale: 'InSale is a required field'
                }
            )
        } else {
            setErrorsProd(
                {
                    ...errorsProd,
                    inSale: ''
                }
            )
            setValuesProd(
                {
                    ...valuesProd,
                    inSale: value.toLowerCase(),
                }
            )
        }
    } else if(name === 'featured') {
        if(value.toLowerCase() !== 'no' && value.toLowerCase() !== 'yes') {
            setErrorsProd(
                {
                    ...errorsProd,
                    featured: 'Featured must be a yes or no'
                }
            )
        } else if (value === '') {
            setErrorsProd(
                {
                    ...errorsProd,
                    featured: 'Featured is a required field'
                }
            )
        } else {
            setErrorsProd(
                {
                    ...errorsProd,
                    featured: ''
                }
            )
            setValuesProd(
                {
                    ...valuesProd,
                    featured: value.toLowerCase(),
                }
            )
        }
    } else if(name === 'special') {
        if (value === '') {
            setErrorsProd(
                {
                    ...errorsProd,
                    special: 'Special is a required field'
                }
            )
        } else {
            setErrorsProd(
                {
                    ...errorsProd,
                    special: ''
                }
            )
            setValuesProd(
                {
                    ...valuesProd,
                    special: value.toLowerCase(),
                }
            )
        }
    } else if (name === 'price') {
        if(isNaN(Number(value))) {
            setErrorsProd(
                {
                    ...errorsProd,
                    price: 'Price must be a number'
                }
            )
        } else if (value == '') {
            setErrorsProd(
                {
                    ...errorsProd,
                    price: 'Price is a required field'
                }
            )
        } else {
            setErrorsProd(
                {
                    ...errorsProd,
                    price: ''
                }
            )
            setValuesProd(
                {
                    ...valuesProd,
                    price: value,
                }
            )
        }
    } else if (name === 'discountedPrice') {
        if(isNaN(Number(value))) {
            setErrorsProd(
                {
                    ...errorsProd,
                    discountedPrice: 'Discounted % must be a number'
                }
            )
        } else if (value == '') {
            setErrorsProd(
                {
                    ...errorsProd,
                    discountedPrice: 'Discounted % is a required field(set to 0 for no discount)'
                }
            )
        } else {
            setErrorsProd(
                {
                    ...errorsProd,
                    discountedPrice: ''
                }
            )
            setValuesProd(
                {
                    ...valuesProd,
                    discountedPrice: value,
                }
            )
        }
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name,value} = e.target

    if(name == 'firstname') {
        if(value == '') {
            setErrors(
                {
                    id: errors.id,
                    firstname: 'First Name is a required field!',
                    lastname: errors.lastname,
                    username: errors.username,
                    phone: errors.phone,
                    password: errors.password,
                    address: errors.address,
                    postcode: errors.postcode,
                    city: errors.city,
                    country: errors.country,
                    favourites: errors.favourites,
                    cart: errors.cart,
                    history: errors.history,
                    power: errors.power,
                }
            )
        } else if (value.length < 4) {
            setErrors(
                {
                    id: errors.id,
                    firstname: 'First Name must be greater than 4 chars!',
                    lastname: errors.lastname,
                    username: errors.username,
                    phone: errors.phone,
                    password: errors.password,
                    address: errors.address,
                    postcode: errors.postcode,
                    city: errors.city,
                    country: errors.country,
                    favourites: errors.favourites,
                    cart: errors.cart,
                    history: errors.history,
                    power: errors.power,
                }
            )
        } else if (value.length >= 32) {
            setErrors(
                {
                    id: errors.id,
                    firstname: 'First Name must be smaller than 32 chars!',
                    lastname: errors.lastname,
                    username: errors.username,
                    phone: errors.phone,
                    password: errors.password,
                    address: errors.address,
                    postcode: errors.postcode,
                    city: errors.city,
                    country: errors.country,
                    favourites: errors.favourites,
                    cart: errors.cart,
                    history: errors.history,
                    power: errors.power,
                }
            )
        } else {
            setErrors(
                {
                    id: errors.id,
                    firstname: '',
                    lastname: errors.lastname,
                    username: errors.username,
                    phone: errors.phone,
                    password: errors.password,
                    address: errors.address,
                    postcode: errors.postcode,
                    city: errors.city,
                    country: errors.country,
                    favourites: errors.favourites,
                    cart: errors.cart,
                    history: errors.history,
                    power: errors.power,
                }
            )
            setValues(
                {
                    id: values.id,
                    firstname: value,
                    lastname: values.lastname,
                    username: values.username,
                    phone: values.phone,
                    password: values.password,
                    address: values.address,
                    postcode: values.postcode,
                    city: values.city,
                    country: values.country,
                    favourites: values.favourites,
                    cart: values.cart,
                    history: values.history,
                    power: values.power,
                }
            )
        }
    } else if(name == 'lastname') {
        if(value == '') {
            setErrors(
                {
                    id: errors.id,
                    firstname: errors.firstname,
                    lastname: 'Last Name is a required field!',
                    username: errors.username,
                    phone: errors.phone,
                    password: errors.password,
                    address: errors.address,
                    postcode: errors.postcode,
                    city: errors.city,
                    country: errors.country,
                    favourites: errors.favourites,
                    cart: errors.cart,
                    history: errors.history,
                    power: errors.power,
                }
            )
        } else if (value.length < 4) {
            setErrors(
                {
                    id: errors.id,
                    firstname: errors.firstname,
                    lastname: 'Last Name must be greater than 4 chars!',
                    username: errors.username,
                    phone: errors.phone,
                    password: errors.password,
                    address: errors.address,
                    postcode: errors.postcode,
                    city: errors.city,
                    country: errors.country,
                    favourites: errors.favourites,
                    cart: errors.cart,
                    history: errors.history,
                    power: errors.power,
                }
            )
        } else if (value.length >= 32) {
            setErrors(
                {
                    id: errors.id,
                    firstname: errors.firstname,
                    lastname: 'Last Name must be smaller than 32 chars!',
                    username: errors.username,
                    phone: errors.phone,
                    password: errors.password,
                    address: errors.address,
                    postcode: errors.postcode,
                    city: errors.city,
                    country: errors.country,
                    favourites: errors.favourites,
                    cart: errors.cart,
                    history: errors.history,
                    power: errors.power,
                }
            )
        } else {
            setErrors(
                {
                    id: errors.id,
                    firstname: errors.firstname,
                    lastname: '',
                    username: errors.username,
                    phone: errors.phone,
                    password: errors.password,
                    address: errors.address,
                    postcode: errors.postcode,
                    city: errors.city,
                    country: errors.country,
                    favourites: errors.favourites,
                    cart: errors.cart,
                    history: errors.history,
                    power: errors.power,
                }
            )
            setValues(
                {
                    id: values.id,
                    firstname: values.firstname,
                    lastname: value,
                    username: values.username,
                    phone: values.phone,
                    password: values.password,
                    address: values.address,
                    postcode: values.postcode,
                    city: values.city,
                    country: values.country,
                    favourites: values.favourites,
                    cart: values.cart,
                    history: values.history,
                    power: values.power,
                }
            )
        }
    } else if(name == 'username') {
        if(value == '') {
            setErrors(
                {
                    id: errors.id,
                    firstname: errors.firstname,
                    lastname: errors.lastname,
                    username: 'Username is a required field!',
                    phone: errors.phone,
                    password: errors.password,
                    address: errors.address,
                    postcode: errors.postcode,
                    city: errors.city,
                    country: errors.country,
                    favourites: errors.favourites,
                    cart: errors.cart,
                    history: errors.history,
                    power: errors.power,
                }
            )
        } else if (value.length <= 4) {
            setErrors(
                {
                    id: errors.id,
                    firstname: errors.firstname,
                    lastname: errors.lastname,
                    username: 'Username must be greater than 4 chars!',
                    phone: errors.phone,

                    password: errors.password,
                    address: errors.address,
                    postcode: errors.postcode,
                    city: errors.city,
                    country: errors.country,
                    favourites: errors.favourites,
                    cart: errors.cart,
                    history: errors.history,
                    power: errors.power,
                }
            )
        } else if (value.length >= 16) {
            setErrors(
                {
                    id: errors.id,
                    firstname: errors.firstname,
                    lastname: errors.lastname,
                    username: 'Username must be smaller than 16 chars!',
                    phone: errors.phone,

                    password: errors.password,
                    address: errors.address,
                    postcode: errors.postcode,
                    city: errors.city,
                    country: errors.country,
                    favourites: errors.favourites,
                    cart: errors.cart,
                    history: errors.history,
                    power: errors.power,
                }
            )
        } else {
            setErrors(
                {
                    id: errors.id,
                    firstname: errors.firstname,
                    lastname: errors.lastname,
                    username: '',
                    phone: errors.phone,

                    password: errors.password,
                    address: errors.address,
                    postcode: errors.postcode,
                    city: errors.city,
                    country: errors.country,
                    favourites: errors.favourites,
                    cart: errors.cart,
                    history: errors.history,
                    power: errors.power,
                }
            )
            setValues(
                {
                    id: values.id,
                    firstname: values.firstname,
                    lastname: values.lastname,
                    username: value,
                    phone: values.phone,
                    
                    password: values.password,
                    address: values.address,
                    postcode: values.postcode,
                    city: values.city,
                    country: values.country,
                    favourites: values.favourites,
                    cart: values.cart,
                    history: values.history,
                    power: values.power,
                }
            )
        }
    } else if(name == 'phone') {
        if (!(value.startsWith('+'))) {
            setErrors(
                {
                    id: errors.id,
                    firstname: errors.firstname,
                    lastname: errors.lastname,
                    username: errors.username,
                    phone: 'Phone number must start with + (e.g +923347229687)',
                    password: errors.password,
                    address: errors.address,
                    postcode: errors.postcode,
                    city: errors.city,
                    country: errors.country,
                    favourites: errors.favourites,
                    cart: errors.cart,
                    history: errors.history,
                    power: errors.power,
                }
            )
        } else if(value.length !== 13) {
            setErrors(
                {
                    id: errors.id,
                    firstname: errors.firstname,
                    lastname: errors.lastname,
                    username: errors.username,
                    phone: 'Phone number must be in format +920000000000',
                    password: errors.password,
                    address: errors.address,
                    postcode: errors.postcode,
                    city: errors.city,
                    country: errors.country,
                    favourites: errors.favourites,
                    cart: errors.cart,
                    history: errors.history,
                    power: errors.power,
                }
            )
        } else {
            setErrors(
                {
                    id: errors.id,
                    firstname: errors.firstname,
                    lastname: errors.lastname,
                    username: errors.username,
                    phone: '',
                    password: errors.password,
                    address: errors.address,
                    postcode: errors.postcode,
                    city: errors.city,
                    country: errors.country,
                    favourites: errors.favourites,
                    cart: errors.cart,
                    history: errors.history,
                    power: errors.power,
                }
            )
            setValues(
                {
                    id: values.id,
                    firstname: values.firstname,
                    lastname: values.lastname,
                    username: values.username,
                    phone: value,
                    password: values.password,
                    address: values.address,
                    postcode: values.postcode,
                    city: values.city,
                    country: values.country,
                    favourites: values.favourites,
                    cart: values.cart,
                    history: values.history,
                    power: values.power,
                }
            )
        }
    } else if(name == 'password') {
        if(value == '') {
            setErrors(
                {
                    id: errors.id,
                    firstname: errors.firstname,
                    lastname: errors.lastname,
                    username: errors.username,
                    phone: errors.phone,
                    password: 'Password is a required field!',
                    address: errors.address,
                    postcode: errors.postcode,
                    city: errors.city,
                    country: errors.country,
                    favourites: errors.favourites,
                    cart: errors.cart,
                    history: errors.history,
                    power: errors.power,
                }
            )
        } else if (value.length < 8) {
            setErrors(
                {
                    id: errors.id,
                    firstname: errors.firstname,
                    lastname: errors.lastname,
                    username: errors.username,
                    phone: errors.phone,
                    password: 'Password must be greater than 8 chars!',
                    address: errors.address,
                    postcode: errors.postcode,
                    city: errors.city,
                    country: errors.country,
                    favourites: errors.favourites,
                    cart: errors.cart,
                    history: errors.history,
                    power: errors.power,
                }
            )
        } else {
            setErrors(
                {
                    id: errors.id,
                    firstname: errors.firstname,
                    lastname: errors.lastname,
                    username: errors.username,
                    phone: errors.phone,
                    password: '',
                    address: errors.address,
                    postcode: errors.postcode,
                    city: errors.city,
                    country: errors.country,
                    favourites: errors.favourites,
                    cart: errors.cart,
                    history: errors.history,
                    power: errors.power,
                }
            )
            setValues(
                {
                    id: values.id,
                    firstname: values.firstname,
                    lastname: values.lastname,
                    username: values.username,
                    phone: values.phone,
                    password: value,
                    address: values.address,
                    postcode: values.postcode,
                    city: values.city,
                    country: values.country,
                    favourites: values.favourites,
                    cart: values.cart,
                    history: values.history,
                    power: values.power,
                }
            )
        }
    } else if(name == 'address') {
        if(value == '') {
            setErrors(
                {
                    id: errors.id,
                    firstname: errors.firstname,
                    lastname: errors.lastname,
                    username: errors.username,
                    phone: errors.phone,
                    password: errors.password,
                    address: 'Address is a required field!',
                    postcode: errors.postcode,
                    city: errors.city,
                    country: errors.country,
                    favourites: errors.favourites,
                    cart: errors.cart,
                    history: errors.history,
                    power: errors.power,
                }
            )
        } else {
            setErrors(
                {
                    id: errors.id,
                    firstname: errors.firstname,
                    lastname: errors.lastname,
                    username: errors.username,
                    phone: errors.phone,
                    password: errors.password,
                    address: '',
                    postcode: errors.postcode,
                    city: errors.city,
                    country: errors.country,
                    favourites: errors.favourites,
                    cart: errors.cart,
                    history: errors.history,
                    power: errors.power,
                }
            )
            setValues(
                {
                    id: values.id,
                    firstname: values.firstname,
                    lastname: values.lastname,
                    username: values.username,
                    phone: values.phone,
                    password: values.password,
                    address: value,
                    postcode: values.postcode,
                    city: values.city,
                    country: values.country,
                    favourites: values.favourites,
                    cart: values.cart,
                    history: values.history,
                    power: values.power,
                }
            )
        }
    } else if(name == 'postcode') {
        if(value == '') {
            setErrors(
                {
                    id: errors.id,
                    firstname: errors.firstname,
                    lastname: errors.lastname,
                    username: errors.username,
                    phone: errors.phone,
                    password: errors.password,
                    address: errors.address,
                    postcode: 'Post Code is a required field!',
                    city: errors.city,
                    country: errors.country,
                    favourites: errors.favourites,
                    cart: errors.cart,
                    history: errors.history,
                    power: errors.power,
                }
            )
        } else {
            setErrors(
                {
                    id: errors.id,
                    firstname: errors.firstname,
                    lastname: errors.lastname,
                    username: errors.username,
                    phone: errors.phone,
                    password: errors.password,
                    address: errors.address,
                    postcode: '',
                    city: errors.city,
                    country: errors.country,
                    favourites: errors.favourites,
                    cart: errors.cart,
                    history: errors.history,
                    power: errors.power,
                }
            )
            setValues(
                {
                    id: values.id,
                    firstname: values.firstname,
                    lastname: values.lastname,
                    username: values.username,
                    phone: values.phone,
                    password: values.password,
                    address: values.address,
                    postcode: value,
                    city: values.city,
                    country: values.country,
                    favourites: values.favourites,
                    cart: values.cart,
                    history: values.history,
                    power: values.power,
                }
            )
        }
    } else if(name == 'city') {
        if(value == '') {
            setErrors(
                {
                    id: errors.id,
                    firstname: errors.firstname,
                    lastname: errors.lastname,
                    username: errors.username,
                    phone: errors.phone,
                    password: errors.password,
                    address: errors.address,
                    postcode: errors.postcode,
                    city: 'City is a required field!',
                    country: errors.country,
                    favourites: errors.favourites,
                    cart: errors.cart,
                    history: errors.history,
                    power: errors.power,
                }
            )
        } else {
            setErrors(
                {
                    id: errors.id,
                    firstname: errors.firstname,
                    lastname: errors.lastname,
                    username: errors.username,
                    phone: errors.phone,
                    password: errors.password,
                    address: errors.address,
                    postcode: errors.postcode,
                    city: '',
                    country: errors.country,
                    favourites: errors.favourites,
                    cart: errors.cart,
                    history: errors.history,
                    power: errors.power,
                }
            )
            setValues(
                {
                    id: values.id,
                    firstname: values.firstname,
                    lastname: values.lastname,
                    username: values.username,
                    phone: values.phone,
                    password: values.password,
                    address: values.address,
                    postcode: values.postcode,
                    city: value,
                    country: values.country,
                    favourites: values.favourites,
                    cart: values.cart,
                    history: values.history,
                    power: values.power,
                }
            )
        }
    } else if(name == 'country') {
        if(value == '') {
            setErrors(
                {
                    id: errors.id,
                    firstname: errors.firstname,
                    lastname: errors.lastname,
                    username: errors.username,
                    phone: errors.phone,
                    password: errors.password,
                    address: errors.address,
                    postcode: errors.postcode,
                    city: errors.city,
                    country: 'Country is a required field!',
                    favourites: errors.favourites,
                    cart: errors.cart,
                    history: errors.history,
                    power: errors.power,
                }
            )
        } else {
            setErrors(
                {
                    id: errors.id,
                    firstname: errors.firstname,
                    lastname: errors.lastname,
                    username: errors.username,
                    phone: errors.phone,
                    password: errors.password,
                    address: errors.address,
                    postcode: errors.postcode,
                    city: errors.city,
                    country: '',
                    favourites: errors.favourites,
                    cart: errors.cart,
                    history: errors.history,
                    power: errors.power,
                }
            )
            setValues(
                {
                    id: values.id,
                    firstname: values.firstname,
                    lastname: values.lastname,
                    username: values.username,
                    phone: values.phone,
                    password: values.password,
                    address: values.address,
                    postcode: values.postcode,
                    city: values.city,
                    country: value,
                    favourites: values.favourites,
                    cart: values.cart,
                    history: values.history,
                    power: values.power,
                }
            )
        }
    } else if(name == 'rank') {
        if(value == '') {
            setErrors(
                {
                    id: errors.id,
                    firstname: errors.firstname,
                    lastname: errors.lastname,
                    username: errors.username,
                    phone: errors.phone,
                    password: errors.password,
                    address: errors.address,
                    postcode: errors.postcode,
                    city: errors.city,
                    country: errors.country,
                    favourites: errors.favourites,
                    cart: errors.cart,
                    history: errors.history,
                    power: 0,
                }
            )
        } else if(Number(value) < 1 || Number(value) > 3) {
        } else if(isNaN(Number(value))) {
            setErrors(
                {
                    id: errors.id,
                    firstname: errors.firstname,
                    lastname: errors.lastname,
                    username: errors.username,
                    phone: errors.phone,
                    password: errors.password,
                    address: errors.address,
                    postcode: errors.postcode,
                    city: errors.city,
                    country: errors.country,
                    favourites: errors.favourites,
                    cart: errors.cart,
                    history: errors.history,
                    power: 0,
                }
            )
        } else {
            setErrors(
                {
                    id: errors.id,
                    firstname: errors.firstname,
                    lastname: errors.lastname,
                    username: errors.username,
                    phone: errors.phone,
                    password: errors.password,
                    address: errors.address,
                    postcode: errors.postcode,
                    city: errors.city,
                    country: '',
                    favourites: errors.favourites,
                    cart: errors.cart,
                    history: errors.history,
                    power: 1,
                }
            )
            setValues(
                {
                    id: values.id,
                    firstname: values.firstname,
                    lastname: values.lastname,
                    username: values.username,
                    phone: values.phone,
                    password: values.password,
                    address: values.address,
                    postcode: values.postcode,
                    city: values.city,
                    country: values.country,
                    favourites: values.favourites,
                    cart: values.cart,
                    history: values.history,
                    power: Number(value),
                }
            )
        }
    }
    if(name == 'phone' && value == '') {
        setErrors(
            {
                id: errors.id,
                firstname: errors.firstname,
                lastname: errors.username,
                username: errors.username,
                phone: '',
                password: errors.password,
                address: errors.address,
                postcode: errors.postcode,
                city: errors.city,
                country: errors.country,
                favourites: errors.favourites,
                cart: errors.cart,
                history: errors.history,
                power: errors.power,
            }
        )
        setValues(
            {
                id: values.id,
                firstname: values.firstname,
                lastname: values.username,
                username: values.username,
                phone: value,
                password: values.password,
                address: values.address,
                postcode: values.postcode,
                city: values.city,
                country: values.country,
                favourites: values.favourites,
                cart: values.cart,
                history: values.history,
                power: values.power,
            }
        )
    }
  }
  const [isDelayed, setIsDelayed] = useState(false);
  const handleBtnClickProd = async () => {
    let errorTemp = ``
    if(errorsProd.id == '') {
        setErrorsProd((prevValues) => ({...prevValues, id: ''}))
        if(errorsProd.title == '') {
            setErrorsProd((prevValues) => ({...prevValues, title: ''}))
            if(errorsProd.description == '') {
                setErrorsProd((prevValues) => ({...prevValues, description: ''}))
                if (errorsProd.images && errorsProd.images[0] === '') {
                    setErrorsProd((prevValues) => ({...prevValues, images: ['']}))
                    if(errorsProd.inStock == '') {
                        setErrorsProd((prevValues) => ({...prevValues, inStock: ''}))
                        if(errorsProd.inSale == '') {
                            setErrorsProd((prevValues) => ({...prevValues, inSale: ''}))
                            if(errorsProd.featured == '') {
                                setErrorsProd((prevValues) => ({...prevValues, featured: ''}))
                                if(errorsProd.special=='') {
                                    setErrorsProd((prevValues) => ({...prevValues, special: ''}))
                                    if(errorsProd.price == '') {
                                        setErrorsProd((prevValues) => ({...prevValues, price: ''}))
                                        if(errorsProd.discountedPrice == '') {
                                            setErrorsProd((prevValues) => ({...prevValues, discountedPrice: ''}))
                                            const resp = await axios.post(
                                                `http://localhost:8080/api/insertProduct/${localStorage.getItem('token')}`,
                                                valuesProd
                                            )
                                            if(resp.data.code == 200) {
                                                setErroredProd(false)
                                                setSuccessProd(true)
                                                setIsDelayed(true);
                                                setTimeout(() => {
                                                    setIsDelayed(false);
                                                    router.push('/dashboard/main');
                                                }, 2000);
                                                
                                            } else {
                                                errorTemp += `\n${resp.data.msg}`
                                                setErroredProd(true)
                                                setSuccessProd(false)
                                            }
                                        } else {
                                            errorTemp += `\n${errorsProd.discountedPrice}`
                                            setErroredProd(true)
                                            setSuccessProd(false)
                                        }
                                    } else {
                                        errorTemp += `\n${errorsProd.price}`
                                        setErroredProd(true)
                                        setSuccessProd(false)
                                    }
                                } else {
                                    errorTemp += `\n${errorsProd.special}`
                                    setErroredProd(true)
                                    setSuccessProd(false)
                                }
                            } else {
                                errorTemp += `\n${errorsProd.featured}`
                                setErroredProd(true)
                                setSuccessProd(false)
                            }
                        } else {
                            errorTemp += `\n${errorsProd.inSale}`
                            setErroredProd(true)
                            setSuccessProd(false)
                        }
                    } else {
                        errorTemp += `\n${errorsProd.inStock}`
                        setErroredProd(true)
                        setSuccessProd(false)
                    }
                } else {
                    errorTemp += `\n${errorsProd.images}`
                    setErroredProd(true)
                    setSuccessProd(false)
                }
            } else {
                errorTemp += `\n${errorsProd.description}`
                setErroredProd(true)
                setSuccessProd(false)
            }
        } else {
            errorTemp += `\n${errorsProd.title}`
            setErroredProd(true)
            setSuccessProd(false)
        }
    } else {
        errorTemp += `\n${errorsProd.id}`
        setErroredProd(true)
        setSuccessProd(false)
    }
    setErrorProd(errorTemp)
  }
  const handleBtnClick = async () => {
    let errorTemp = ``
    if(errors.firstname == '') {
        setErrors((prevValues) => ({ ...prevValues, firstname: '' }));
        if(errors.lastname == '') {
            setErrors((prevValues) => ({ ...prevValues, lastname: '' }));
            if(errors.username == '') {
                setErrors((prevValues) => ({ ...prevValues, username: '' }));
                if(errors.phone == '') {
                    setErrors((prevValues) => ({ ...prevValues, phone: '' }));
                    if(errors.password == '') {
                        setErrors((prevValues) => ({ ...prevValues, password: '' }));
                        if(errors.address == '') {
                            setErrors((prevValues) => ({ ...prevValues, address: '' }));
                            if(errors.postcode == '') {
                                setErrors((prevValues) => ({ ...prevValues, postcode: '' }));
                                if(errors.city == '') {
                                    setErrors((prevValues) => ({ ...prevValues, city: '' }));
                                    if(errors.country == '') {
                                        setErrors((prevValues) => ({ ...prevValues, country: '' }));
                                        if(errors.power >= 1 && errors.power <= 3) {
                                            setErrors((prevValues) => ({ ...prevValues, rank: '' }));
                                            const response = await axios.post(
                                                `http://localhost:8080/api/insertUserAdmin/${localStorage.getItem('token')}`,
                                                values
                                              );
                                            console.log(values)
                                            if(response.data.code == 200 ) {
                                                setErrored(false)
                                                setSuccess(true)
                                            } else { 
                                                errorTemp += `\n${response.data.msg}`
                                                setErrored(true)
                                                setSuccess(false)
                                            }
                                        } else {
                                            errorTemp += `\nRank is incorrect`
                                            setErrored(true)
                                            setSuccess(false)
                                        }
                                    } else {
                                        errorTemp +=  `\n${errors.country}`
                                        setErrored(true)
                                        setSuccess(false)
                                    }
                                } else {
                                    errorTemp += `\n${errors.city}`
                                    setErrored(true)
                                    setSuccess(false)
                                }
                            } else {
                                errorTemp +=  `\n${errors.postcode}`
                                setErrored(true)
                                setSuccess(false)
                            }
                        } else {
                            errorTemp +=  `\n${errors.address}`
                            setErrored(true)
                            setSuccess(false)
                        }
                    } else {
                        errorTemp += `\n${errors.password}`
                        setErrored(true)
                        setSuccess(false)
                    }
                } else {
                    errorTemp +=  `\n${errors.phone}`
                    setErrored(true)
                    setSuccess(false)
                }
            } else {
                errorTemp += `\n${errors.username}`
                setErrored(true)
                setSuccess(false)
            }
        } else {
            errorTemp +=  `\n${errors.lastname}`
            setErrored(true)
            setSuccess(false)
        }
    } else {
        errorTemp += `\n${errors.firstname}`
        setErrored(true)
        setSuccess(false)
    }
    if (errored == true) setError(errorTemp)
  }
  const [user, setUser] = useState({username:'', password: '', code: 0});
  useEffect(() => {
    const checkToken = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/api/getToken/${token}`);
        const data = response.data;
        console.log(response.data)
        if (data.code === 200) {
            setUser(response.data)
        } else {
            router.push('/dashboard/');
        }
    };
    
    checkToken();
  }, []);
  return (
    <>
        <NavBar />
        <div className={`home-home-container`} style={{ height:'fit-content', padding: '60px 0',marginTop: '20vh' }}>
            <div className='home-home-subcontainer'>
                <h1 className='home-home-heading' style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>Welcome {user.username}</h1>
                <h1 style={{ margin: '0', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>Ordered<span style={{ color: 'var(--primary-color)' }}>Chaos</span></h1>
            </div>
        </div>
        <div className='home-featured-products-container'>
            <div className='home-home-subcontainer'>
                <h1 style={{margin: '0', textShadow:'-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', textAlign: 'center'}}>Add a <span className='hover-text' style={{color:'var(--primary-color)', borderBottom: '3px solid white'}}>User</span></h1>
                {errored ? 
                <div className='dashboard-dashboard-btns' style={{justifyContent: 'center'}}>
                    <div style={{border: '2px solid black', backgroundColor: 'red'}} className='dashboard-main-input-big'>
                        <p style={{fontSize: '12px', color: 'white'}}>{error}</p>
                    </div>
                </div> 
                : 
                <div/>}
                {success ? 
                <div className='dashboard-dashboard-btns' style={{justifyContent: 'center'}}>
                    <div style={{border: '2px solid black', backgroundColor: 'green'}} className='dashboard-main-input-big'>
                        <p style={{fontSize: '12px', color: 'white'}}>Successfully made user {values.username}</p>
                    </div>
                </div> 
                : 
                <div/>}
                <div className='dashboard-dashboard-btns'>
                    {errors.firstname !== '' ? <input onChange={handleInput} style={{border: '2px solid red'}} name='firstname' placeholder='First Name *' className='dashboard-main-input-one'></input> : <input onChange={handleInput} style={{border: '2px solid black'}} name='firstname' placeholder='First Name *' className='dashboard-main-input-one'></input>}
                    {errors.lastname !== '' ? <input onChange={handleInput} style={{border: '2px solid red'}} name='lastname' placeholder='Last Name *' className='dashboard-main-input'></input> : <input onChange={handleInput} style={{border: '2px solid black'}} name='lastname' placeholder='Last Name *' className='dashboard-main-input'></input>}
                </div>
                <div className='dashboard-dashboard-btns'>
                    {errors.username !== '' ? <input onChange={handleInput} style={{border: '2px solid red'}} name='username' placeholder='Username *' className='dashboard-main-input-one'></input> : <input onChange={handleInput} style={{border: '2px solid black'}} name='username' placeholder='Username *' className='dashboard-main-input-one'></input>}
                    {errors.phone !== '' ? <input onChange={handleInput} style={{border: '2px solid red'}} name='phone' placeholder='Phone Number' className='dashboard-main-input'></input> : <input onChange={handleInput} style={{border: '2px solid black'}} name='phone' placeholder='Phone Number' className='dashboard-main-input'></input>}
                </div>
                <div className='dashboard-dashboard-btns'>
                    {errors.password !== '' ? <input type='password' onChange={handleInput} style={{border: '2px solid red'}} name='password' placeholder='Password *' className='dashboard-main-input-big'></input> : <input type='password' onChange={handleInput} style={{border: '2px solid black'}} name='password' placeholder='Password *' className='dashboard-main-input-big'></input>}
                </div>
                <div className='dashboard-dashboard-btns'>
                    {errors.address !== '' ? <input onChange={handleInput} style={{border: '2px solid red'}} name='address' placeholder='Address *' className='dashboard-main-input-big'></input> : <input onChange={handleInput} style={{border: '2px solid black'}} name='address' placeholder='Address *' className='dashboard-main-input-big'></input>}
                </div>
                <div className='dashboard-dashboard-btns'>
                    {errors.postcode !== '' ? <input onChange={handleInput} style={{border: '2px solid red'}} name='postcode' placeholder='ZIP Code *' className='dashboard-main-input-big'></input> : <input onChange={handleInput} style={{border: '2px solid black'}} name='postcode' placeholder='ZIP Code *' className='dashboard-main-input-big'></input>}
                </div>
                <div className='dashboard-dashboard-btns'>
                    {errors.city !== '' ? <input onChange={handleInput} style={{border: '2px solid red'}} name='city' placeholder='City *' className='dashboard-main-input-one'></input> : <input onChange={handleInput} style={{border: '2px solid black'}} name='city' placeholder='City *' className='dashboard-main-input-one'></input>}
                    {errors.country !== '' ? <input onChange={handleInput} style={{border: '2px solid red'}} name='country' placeholder='Country *' className='dashboard-main-input'></input> : <input onChange={handleInput} style={{border: '2px solid black'}} name='country' placeholder='Country *' className='dashboard-main-input'></input>}
                </div>
                <div className='dashboard-dashboard-btns'>
                    {errors.power !== 0 ? <input onChange={handleInput} style={{border: '2px solid black'}} name='rank' placeholder='Rank(1 = normal, 2 = mod, 3 = admin) *' className='dashboard-main-input-big'></input> :  <input onChange={handleInput} style={{border: '2px solid red'}} name='rank' placeholder='Rank (1=normal, 2 = mod, 3 = admin) *' className='dashboard-main-input-big'></input> }
                </div>
                <div className='dashboard-dashboard-btns' style={{justifyContent: 'center'}}>
                    <button onClick={handleBtnClick} style={{display:'flex', justifyContent: 'center', alignItems: 'center'}} className='dashboard-main-btn-primary'><span style={{verticalAlign: 'middle'}}>Create This User</span></button>
                </div>
            </div>
        </div>
        <div className='home-featured-products-container'>
            <div className='home-home-subcontainer'>
                <h1 style={{margin: '0', textShadow:'-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', textAlign: 'center'}}>Add a <span className='hover-text' style={{color:'var(--primary-color)', borderBottom: '3px solid white'}}>Product</span></h1>
                {erroredProd ? 
                <div className='dashboard-dashboard-btns' style={{justifyContent: 'center'}}>
                    <div style={{border: '2px solid black', backgroundColor: 'red'}} className='dashboard-main-input-big'>
                        <p style={{fontSize: '12px', color: 'white'}}>{errorProd}</p>
                    </div>
                </div> 
                : 
                <div/>}
                {successProd ? 
                <div className='dashboard-dashboard-btns' style={{justifyContent: 'center'}}>
                    <div style={{border: '2px solid black', backgroundColor: 'green'}} className='dashboard-main-input-big'>
                        <p style={{fontSize: '12px', color: 'white'}}>Successfully made product {valuesProd.title}</p>
                    </div>
                </div> 
                : 
                <div/>}
                <div className='dashboard-dashboard-btns'>
                    {errorsProd.id !== '' ?  <input onChange={handleInputProd} style={{border: '2px solid red'}} name='id' placeholder='ID *' className='dashboard-main-input-big'></input>:  <input onChange={handleInputProd} style={{border: '2px solid black'}} name='id' placeholder='ID *' className='dashboard-main-input-big'></input>}
                </div>
                <div className='dashboard-dashboard-btns'>
                    {errorsProd.title !== '' ?  <input onChange={handleInputProd} style={{border: '2px solid red'}} name='name' placeholder='Name *' className='dashboard-main-input-big'></input>:  <input onChange={handleInputProd} style={{border: '2px solid black'}} name='name' placeholder='Name *' className='dashboard-main-input-big'></input>}
                </div>
                <div className='dashboard-dashboard-btns'>
                    {errorsProd.description !== '' ?  <input onChange={handleInputProd}  style={{border: '2px solid red'}} name='desc' placeholder='Description *' className='dashboard-main-input-big'></input> : <input onChange={handleInputProd} style={{border: '2px solid black'}} name='desc' placeholder='Description *' className='dashboard-main-input-big'></input>}
                </div>
                <div className='dashboard-dashboard-btns'>
                    {errorsProd.images && errorsProd.images[0] !== '' ? <input onChange={handleInputProd}  style={{border: '2px solid red'}} name='img' placeholder='Image URL (https://imgur.com/upload/) *' className='dashboard-main-input-big'></input> : <input onChange={handleInputProd} style={{border: '2px solid black'}} name='img' placeholder='Image URL (https://imgur.com/upload/) *' className='dashboard-main-input-big'></input>}
                </div>
                <div className='dashboard-dashboard-btns'>
                    {errorsProd.inStock !== '' ? <input onChange={handleInputProd} style={{border: '2px solid red'}} name='inStock' placeholder='In Stock? (Yes/No) *' className='dashboard-main-input-one'></input> : <input onChange={handleInputProd} style={{border: '2px solid black'}} name='inStock' placeholder='In Stock? (Yes/No) *' className='dashboard-main-input-one'></input>}
                    {errorsProd.inSale !== '' ? <input onChange={handleInputProd} style={{border: '2px solid red'}} name='inSale' placeholder='In Sale? (Yes/No) *' className='dashboard-main-input'></input> : <input onChange={handleInputProd} style={{border: '2px solid black'}} name='inSale' placeholder='In Sale? (Yes/No) *' className='dashboard-main-input'></input>}
                </div>
                <div className='dashboard-dashboard-btns'>
                    {errorsProd.featured !== '' ? <input onChange={handleInputProd} style={{border: '2px solid red'}} name='featured' placeholder='Featured? (Yes/No) *' className='dashboard-main-input-one'></input> : <input onChange={handleInputProd} style={{border: '2px solid black'}} name='featured' placeholder='Featured? (Yes/No) *' className='dashboard-main-input-one'></input>}
                    {errorsProd.special !== '' ? <input onChange={handleInputProd} style={{border: '2px solid red'}} name='special' placeholder='Special(Category) *' className='dashboard-main-input'></input> : <input onChange={handleInputProd} style={{border: '2px solid black'}} name='special' placeholder='Special(Category) *' className='dashboard-main-input'></input>}
                </div>
                <div className='dashboard-dashboard-btns'>
                    {errorsProd.price !== '' ? <input onChange={handleInputProd} style={{border: '2px solid red'}} name='price' placeholder='Normal Price *' className='dashboard-main-input-one'></input> : <input onChange={handleInputProd} style={{border: '2px solid black'}} name='price' placeholder='Normal Price *' className='dashboard-main-input-one'></input>}
                    {errorsProd.discountedPrice !== '' ? <input onChange={handleInputProd} style={{border: '2px solid red'}} name='discountedPrice' placeholder='Discount % *' className='dashboard-main-input'></input> : <input onChange={handleInputProd} style={{border: '2px solid black'}} name='discountedPrice' placeholder='Discount % *' className='dashboard-main-input'></input>}
                </div>
                <div className='dashboard-dashboard-btns' style={{justifyContent: 'center'}}>
                    <button onClick={handleBtnClickProd} style={{display:'flex', justifyContent: 'center', alignItems: 'center'}} className='dashboard-main-btn-primary'><span style={{verticalAlign: 'middle'}}>Create This Product</span></button>
                </div>
                <p>https://imgur.com/a/QEYHz8v</p>
            </div>
        </div>
        <div className='home-featured-products-container'>
            <div className='home-home-subcontainer'>
                <h1 style={{margin: '0', textShadow:'-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', textAlign: 'center'}}>Edit a <span className='hover-text' style={{color:'var(--primary-color)', borderBottom: '3px solid white'}}>Product</span></h1>
                <ProductsHome products={products}/>
            </div>
        </div>
    </>
  );
}
