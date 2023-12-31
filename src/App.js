import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const productObject = cartList.find(Item => Item.id === product.id)

    if (productObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(Item => {
          if (productObject.id === Item.id) {
            const updatedQuantity = Item.quantity + product.quantity

            return {...Item, quantity: updatedQuantity}
          }

          return Item
        }),
      }))
    } else {
      const updatedCartList = [...cartList, product]

      this.setState({cartList: updatedCartList})
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const FilteredData = cartList.filter(each => each.id !== id)
    this.setState({cartList: FilteredData})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  decrementCartItemQuantity = (quantity, id) => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(item => {
      if (item.id === id) {
        return {...item, quantity: item.quantity - 1}
      }
      return item
    })

    this.setState({cartList: updatedCartList})
  }

  incrementCartItemQuantity = (quantity, id) => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(item => {
      if (item.id === id) {
        return {...item, quantity: item.quantity + 1}
      }
      return item
    })

    this.setState({cartList: updatedCartList})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
