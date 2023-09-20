import { getCart } from '@/lib/db/cart';
import CartEntry from './CartEntry';
import { setProductQuantity } from './actions';
import { formatPrice } from '@/lib/format';

export const metadata = {
  title: 'Your Cart - Ecommerce',
};

const CartPage = async () => {
  const cart = await getCart();

  return (
    <div>
      <h1 className='text-3xl mb-6 font-bold'>Shopping Cart</h1>
      {cart?.items.map((cartItem) => (
        <CartEntry
          key={cartItem.id}
          cartItem={cartItem}
          setProductQuantity={setProductQuantity}
        />
      ))}
      {!cart?.items.length && <p>Your cart is empty.</p>}
      <div className='flex flex-col items-end sm:items-center'>
        <p className='mb-3 font-bold'>
          Total: {formatPrice(cart?.subtotal || 0)}
        </p>
        <button className='btn btn-primary sm:w-[200px]'>Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;
