import { Product } from "./schemas/product"
import { useRouter } from "next/navigation";
function formatString(str: string) {
    return str.replace(/\s+/g, '-').toLowerCase();
}
export const ProductHome = ({product: {image, title, price}}: {product: {image: string, title: string, price: string}}) => {
    return (
        <div className='product'>
            <img src={image} className='product-img'></img>
            <h2 style={{marginTop: '5px', marginBottom: '0', textAlign: 'center', width: '100%', color: 'black'}}>{title}</h2>
            <h4 style={{marginTop: '5px', marginBottom: '0', textAlign: 'center', color: 'black', padding: '5px 15px', border: '2px solid black',borderRadius: '15px', backgroundColor: 'white'}}>{price}</h4>
        </div>
    )
}
export function convertToTitleCase(inputString: string) {
    return inputString
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
export const ProductDB = ({product: {id, images, title, price, special}}: {product: Product}) => {
    const router = useRouter()
    const image = images && images.length > 0 ? images[0] : '';
    return (
        <div className='product' onClick={() => {router.push(`/product/${formatString(special)}/${id}`)}}>
            <h4 style={{marginTop: '0', marginBottom: '5px', textAlign: 'center', width: '70%', color: 'black', padding: '5px 15px', border: '2px solid black',borderRadius: '15px', backgroundColor: 'var(--primary)'}}>{convertToTitleCase(special)}</h4>
            <img src={image} className='product-img'></img>
            <h2 style={{fontSize: '18px', marginTop: '10px', marginBottom: '0', textAlign: 'center', width: '100%', color: 'black'}}>{title}</h2>
            <h4 style={{marginTop: '5px', marginBottom: '0', textAlign: 'center', color: 'black', padding: '5px 15px', border: '2px solid black',borderRadius: '15px', backgroundColor: 'white'}}>{price} PKR</h4>
        </div>
    )
}