

import { useState } from 'react';
import { Button, Box, makeStyles } from '@material-ui/core';
import { ShoppingCart as Cart, FlashOn as Flash } from '@material-ui/icons';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { addToCart } from '../../redux/actions/cartActions';
import { useDispatch } from 'react-redux';
import { loadRazorpay } from '../../razorpay/loadPayment';

const useStyle = makeStyles(theme => ({
    leftContainer: {
        minWidth: '40%',
        padding: '40px 0 0 80px',
        [theme.breakpoints.down('md')]: {
            padding: '20px 40px'
        }
    },
    productImage: {
        padding: '15px 20px',
        border: '1px solid #f0f0f0',
        width: '95%',
        objectFit: 'contain',
        height: '350px'
    },
    button: {
        width: '46%',
        borderRadius: 2,
        height: 50,
        marginTop: 10
    },
    addToCart: {
        background: '#ff9f00',
        color: '#FFF'
    },
    buyNow:{
        background: '#fb641b',
        color: '#FFF'
    }
}));

const ActionItem = ({ product }) => {
    const classes = useStyle();
    const history = useHistory();
    const dispatch = useDispatch();
    
    // Destructuring product data
    const { id, price } = product;
    const [quantity] = useState(1);

    // Image logic: Database link or local image folder
    const imageSrc = product.image ? (product.image.includes('http') ? product.image : `/images/${product.image}`) : `/images/${id}.png`;

    const buyNow = async () => {
        // 1. Price extraction (PostgreSQL format handles both nested or direct)
        const amount = price?.cost || price || 0; 

        if (amount > 0) {
            // 2. Direct Razorpay Call
            // Note: Amount should be passed as it is, loadPayment handles the conversion
            await loadRazorpay(amount);
        } else {
            alert("Price not available for this product.");
        }
    }

    const addItemToCart = () => {
        dispatch(addToCart(id, quantity));
        history.push('/cart');
    }

    return (
        <Box className={classes.leftContainer}>
            <img src={imageSrc} className={classes.productImage} alt="product" /><br />
            
            <Button 
                onClick={() => addItemToCart()} 
                className={clsx(classes.button, classes.addToCart)} 
                style={{marginRight: 10}} 
                variant="contained"
            >
                <Cart /> Add to Cart
            </Button>

            <Button 
                onClick={() => buyNow()} 
                className={clsx(classes.button, classes.buyNow)} 
                variant="contained"
            >
                <Flash /> Buy Now
            </Button>
        </Box>
    )
}

export default ActionItem;