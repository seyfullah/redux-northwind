import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { saveProduct } from "../../redux/actions/productActions";
import { getCategories } from "../../redux/actions/categoryActions";
import ProductDetail from "./ProductDetail";
import { useParams, useNavigate } from "react-router-dom";

function AddOrUpdateProduct({
    products,
    categories,
    getCategories,
    saveProduct,
    product,
    ...props
}) {
    const navigate = useNavigate();
    const [currentProduct, setCurrentProduct] = useState(product || {});

    useEffect(() => {
        if (categories.length === 0) {
            getCategories();
        }
        setCurrentProduct({ ...product });
    }, [product, categories, getCategories]);

    function handleChange(event) {
        const { name, value } = event.target;
        setCurrentProduct((previousProduct) => ({
            ...previousProduct,
            [name]: name === "categoryId" ? parseInt(value, 10) : value
        }));
    }

    function handleSave(event) {
        event.preventDefault();
        saveProduct(currentProduct).then(() => {
            navigate("/");
        });
    }

    if (!currentProduct || !currentProduct.id) {
        // Optionally show a loading spinner or message
        return <div>Ürün yükleniyor...</div>;
    }

    return (
        <ProductDetail
            product={currentProduct}
            categories={categories}
            onChange={handleChange}
            onSave={handleSave}
        />
    );
}

function getProductById(products, productId) {
    return products.find(product => String(product.id) === String(productId)) || {};
}

function mapStateToProps(state, ownProps) {
    const productId = ownProps.productId;
    const products = state.productListReducer.products || [];
    const product = (productId && products.length > 0)
        ? getProductById(products, productId)
        : {};
    return {
        product: product || {}, // fallback to empty object
        products,
        categories: state.categoryListReducer
    };
}

// Wrapper to inject productId from URL params
function AddOrUpdateProductWrapper(props) {
    const { productId } = useParams();
    return <ConnectedAddOrUpdateProduct {...props} productId={productId} />;
}

const mapDispatchToProps = {
    getCategories,
    saveProduct
};

const ConnectedAddOrUpdateProduct = connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct);

export default AddOrUpdateProductWrapper;