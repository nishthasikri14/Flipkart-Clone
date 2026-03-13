import { Box, makeStyles, Typography, Button, Grid } from '@material-ui/core';
import CartItem from './CartItem';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/actions/cartActions';
import TotalView from './TotalView';
import EmptyCart from './EmptyCart';
import { useHistory } from 'react-router-dom'; // match/history props se behtar hook hai

const useStyle = makeStyles(theme => ({
    component: {
        padding: '30px 135px',
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            padding: '15px 0'
        }
    },
    leftComponent: {
        paddingRight: 15,
        [theme.breakpoints.down('sm')]: {
            marginBottom: 15
        }
    },
    header: {
        padding: '15px 24px',
        background: '#fff'
    },
    bottom: {
        padding: '16px 22px',
        background: '#fff',
        boxShadow: '0 -2px 10px 0 rgb(0 0 0 / 10%)',
        borderTop: '1px solid #f0f0f0'
    },
    placeOrder: {
        display: 'flex',
        marginLeft: 'auto',
        background: '#fb641b',
        color: '#fff',
        borderRadius: 2,
        width: 250,
        height: 51
    }
}));

const Cart = ({ match }) => {
    const classes = useStyle();
    const history = useHistory(); // Navigation ke liye hook
    const cartDetails = useSelector(state => state.cart);
    const { cartItems } = cartDetails;
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(cartItems && match.params.id !== cartItems.id)   
            dispatch(addToCart(match.params.id));
    }, [dispatch, cartItems, match]);

    const removeItemFromCart = (id) => {
        dispatch(removeFromCart(id));
    }

    // FIX: Seedhe payment ki jagah Checkout page par bhejein
    const navigateToCheckout = () => {
        history.push('/checkout');
    }

    return (
        <>
        { cartItems.length ? 
            <Grid container className={classes.component}>
                <Grid item lg={9} md={9} sm={12} xs={12} className={classes.leftComponent}>
                    <Box className={classes.header}>
                        <Typography style={{fontWeight: 600, fontSize: 18}}>My Cart ({cartItems?.length})</Typography>
                    </Box>
                    { cartItems.map(item => (
                        <CartItem key={item.id} item={item} removeItemFromCart={removeItemFromCart}/>
                    ))}
                    <Box className={classes.bottom}>
                        {/* Function name change kiya navigate karne ke liye */}
                        <Button onClick={() => navigateToCheckout()} variant="contained" className={classes.placeOrder}>
                            Place Order
                        </Button>
                    </Box>
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TotalView cartItems={cartItems} />
                </Grid>
            </Grid> : <EmptyCart />
        }
        </>
    )
}

export default Cart;