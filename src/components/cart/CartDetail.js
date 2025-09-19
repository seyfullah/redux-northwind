import { bindActionCreators } from 'redux';
import * as cartActions from "../../redux/actions/cartActions";
import { connect } from 'react-redux'
import { Badge, Table, Button } from 'reactstrap'
import { Component } from 'react'
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';

class CartDetail extends Component {
  removeFromCart(product) {
    this.props.actions.removeFromCart(product);
    alertify.error(product.productName + " sepetten silindi.");
  }
  render() {
    return (
      <div>
        <h3>Sepettekiler</h3>
        <Table striped>
          <thead>
            <tr>
              <th>
                #
              </th>
              <th>
                Ürün Adı
              </th>
              <th>
                Ürün Fiyatı
              </th>
              <th>
                Ürün Miktarı
              </th>
              <th>
                Stoktaki Adedi
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.cart.map(c => (
              <tr key={c.product.id}>
                <th scope="row">{c.product.id}</th>
                <td>{c.product.productName}</td>
                <td>{c.product.unitPrice}</td>
                <td>{c.product.quantityPerUnit}</td>
                <td>{c.product.unitsInStock}</td>
                <td>
                  <Button onClick={() => this.removeFromCart(c.product)} color="danger">
                    Sil
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.RemoveFromCart, dispatch)
    }
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cartReducer
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);