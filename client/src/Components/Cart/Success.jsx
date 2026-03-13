import React, { useEffect, useState } from 'react';
// FIX 1: Missing Imports added below
import { Box, Typography, makeStyles, Button } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useLocation, Link } from 'react-router-dom';

const useStyles = makeStyles({
    component: {
        textAlign: 'center',
        padding: '100px 20px',
        background: '#fff',
        margin: '80px auto',
        width: '50%',
        borderRadius: 8,
        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 10%)'
    },
    icon: {
        fontSize: 100,
        color: '#388E3C'
    },
    orderId: {
        marginTop: 20,
        fontSize: 18,
        color: '#212121',
        fontWeight: 600
    },
    button: {
        marginTop: 30,
        background: '#2874f0',
        color: '#fff',
        borderRadius: 2,
        padding: '10px 30px',
        textTransform: 'none'
    }
});

const Success = () => {
    const classes = useStyles();
    const [orderId, setOrderId] = useState('');
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const id = params.get('id') || "OD" + Math.floor(Math.random() * 1000000000);
        setOrderId(id);
    }, [location]);

    return (
        <Box className={classes.component}>
            <CheckCircleIcon className={classes.icon} />
            <Typography variant="h4" style={{ marginTop: 10 }}>Thank You!</Typography>
            <Typography variant="h5">Order Placed Successfully</Typography>
            
            <Typography className={classes.orderId}>
                Order ID: {orderId}
            </Typography>

            <Typography style={{ color: '#878787', marginTop: 10 }}>
                We will send you a confirmation email soon.
            </Typography>

            <Link to="/" style={{ textDecoration: 'none' }}>
                <Button variant="contained" className={classes.button}>
                    Continue Shopping
                </Button>
            </Link>
        </Box>
    );
}

// FIX 2: Added Default Export
export default Success;