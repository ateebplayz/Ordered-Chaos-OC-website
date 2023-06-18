export const ProductHome = ({product: {image, title, price}}: {product: {image: string, title: string, price: string}}) => {
    return (
        <div className='product'>
            <img src={image} className='product-img'></img>
            <h2 style={{marginTop: '5px', marginBottom: '0', textAlign: 'center', width: '100%', color: 'black'}}>{title}</h2>
            <h4 style={{marginTop: '5px', marginBottom: '0', textAlign: 'center', color: 'black', padding: '5px 15px', border: '2px solid black',borderRadius: '15px', backgroundColor: 'white'}}>{price}</h4>
        </div>
    )
}