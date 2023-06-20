// Write your code here
import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const cartLength = cartList.length
      let totalPrice = 0
      cartList.forEach(item => {
        totalPrice += item.price * item.quantity
      })
      return (
        <div className="hl">
          <div>
            <div className="ll">
              <h1 className="hh">Order Total: </h1>
              <h1 className="hh"> RS {totalPrice} /- </h1>
            </div>
            <p>{cartLength} Items in cart</p>
            <button type="button" className="checkout">
              checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
