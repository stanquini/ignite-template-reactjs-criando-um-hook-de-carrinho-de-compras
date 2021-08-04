import React, { useEffect, useState } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { useCart } from '../../hooks/useCart';
import { api } from '../../services/api';
import { ProductList } from './styles';


// import { formatPrice } from '../../util/format';


interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const { addProduct, cart } = useCart();
  // console.log(cart)

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    const sumAmountCart = { ...sumAmount }
    sumAmountCart[product.id] = product.amount
    return sumAmountCart;
  }, {} as CartItemsAmount)

  useEffect(() => {
    async function loadProducts() {
      const products = await api.get('products')
      setProducts(products.data)
    }

    loadProducts();
  }, []);

  function handleAddProduct(id: number) {
    // TODO
  }

  return (
    <ProductList>
      {products.map(product => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{Intl.NumberFormat('pt-BR',
            {
              style: 'currency',
              currency: 'BRL'
            }).format(product.price)}
          </span>
          <button
            type="button"
            data-testid="add-product-button"
          // onClick={() => handleAddProduct(product.id)}
          >
            <div data-testid="cart-product-quantity">
              <MdAddShoppingCart size={16} color="#FFF" />
              {cartItemsAmount[product.id] || 0}
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>

      ))}
    </ProductList>
  );
};

export default Home;
