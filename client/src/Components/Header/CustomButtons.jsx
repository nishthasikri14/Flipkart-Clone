import React, { useState, useContext } from 'react';
import { makeStyles, Box, Typography, Badge, Button, Menu, MenuItem } from '@material-ui/core'; // Added Menu & MenuItem
import { Link } from 'react-router-dom';
import { ShoppingCart, ExpandMore } from '@material-ui/icons'; // Added ExpandMore icon
import LoginDialog from '../Login/LoginDialog';
import { LoginContext } from '../../context/ContextProvider';
import { useSelector } from 'react-redux';
import Profile from './Profile';

const useStyle = makeStyles(theme => ({
    container: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }
    },
    wrapper: {
        margin: '0 5% 0 auto', 
        display: 'flex',    
        '& > *': {
            marginRight: 50,
            textDecoration: 'none',
            color: '#FFFFFF',
            fontSize: 12,
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
                color: '#2874f0',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                marginTop: 10
            }      
        },
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }   
    },
    login: {
        color: '#2874f0',
        background: '#FFFFFF',
        textTransform: 'none',
        fontWeight: 600,
        borderRadius: 2,
        padding: '5px 40px',
        height: 32,
        boxShadow: 'none',
        [theme.breakpoints.down('sm')]: {
            background: '#2874f0',
            color: '#FFFFFF'
        }   
    }
}));


const CustomButtons = () => {
    const classes = useStyle();
    const [ open, setOpen ] = useState(false);
    const { account, setAccount } = useContext(LoginContext);

    // More Button Menu State
    const [anchorEl, setAnchorEl] = useState(null);
    const menuOpen = Boolean(anchorEl);

    const cartDetails = useSelector(state => state.cart);
    const { cartItems } = cartDetails;

    const openDialog = () => {
        setOpen(true);
    }

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box className={classes.wrapper}>
            {
                account ? <Profile account={account} setAccount={setAccount} /> : 
                <Button className={classes.login} variant="contained" onClick={() => openDialog() }>Login</Button>
            }
            
            {/* More Button Fixed */}
            <Box style={{ display: 'flex', cursor: 'pointer' }} onClick={handleMenuClick}>
                <Typography style={{ marginTop: 2 }}>More</Typography>
                <ExpandMore style={{ marginTop: 2, fontSize: 18 }} />
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
                style={{ marginTop: 40 }}
            >
                <MenuItem onClick={handleMenuClose}>Notification Preferences</MenuItem>
                <MenuItem onClick={handleMenuClose}>24x7 Customer Care</MenuItem>
                <MenuItem onClick={handleMenuClose}>Advertise</MenuItem>
                <MenuItem onClick={handleMenuClose}>Download App</MenuItem>
            </Menu>

            <Link to='/cart' className={classes.container}>
                <Badge badgeContent={cartItems?.length} color="secondary">
                    <ShoppingCart />
                </Badge>
                <Typography style={{ marginLeft: 10 }}>Cart</Typography>
            </Link>
            
            <LoginDialog open={open} setOpen={setOpen} setAccount={setAccount} />
        </Box>
    )
}

export default CustomButtons;