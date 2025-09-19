import { Component } from 'react'
import {
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    Badge
} from 'reactstrap';
import { bindActionCreators } from 'redux';
import * as cartActions from "../../redux/actions/cartActions";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

class CartSummary extends Component {

    renderEmpty() {
        return (
            <NavItem>
                <NavLink>Sepetiniz boş</NavLink>
            </NavItem>
        )
    }
    renderSummary() {
        return (
            <UncontrolledDropdown nav inNavbar right >
                <DropdownToggle nav caret>
                    Sepetiniz ({this.props.cart.length})
                </DropdownToggle>
                <DropdownMenu right>
                    {this.props.cart.map(cartItem => (
                        <DropdownItem key={cartItem.product.id}>
                            <Badge color="danger" onClick={() => this.props.actions.removeFromCart(cartItem.product)}>-</Badge>
                            {cartItem.product.productName}
                            <Badge color="success">
                                {cartItem.quantity}
                            </Badge>
                        </DropdownItem>))
                    }
                    <DropdownItem divider />
                    <DropdownItem><Link to={"/cart"}>Sepete Git</Link></DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    }

    render() {
        return (
            <div>
                {this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty()}
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);