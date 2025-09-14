import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Badge, Table } from 'reactstrap'
import { bindActionCreators } from 'redux';
import * as productActions from '../../redux/actions/productActions';
class ProductList extends Component {
  render() {
    return (
      <div>
        <h3>
          <Badge color="warning">
            Ürünler
          </Badge>
        </h3>
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
            </tr>
          </thead>
          <tbody>
            {this.props.products.map(product => (
              <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <td>{product.productName}</td>
                <td>{product.unitPrice}</td>
                <td>{product.quantityPerUnit}</td>
                <td>{product.unitsInStock}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    products: state.productListReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProducts: bindActionCreators(productActions.getProducts, dispatch)
    }
  };
}

export default connect(mapStatetoProps, mapDispatchToProps)(ProductList)