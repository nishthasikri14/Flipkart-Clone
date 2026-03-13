import { useState, useEffect, useCallback } from 'react'; 
import { Box, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';

const useStyle = makeStyles({
    header: {
        padding: '15px 24px',
        background: '#fff'
    },
    greyTextColor: {
        color: '#878787'
    },
    container: {
        '& > *': {
            marginBottom: 20,
            fontSize: 14
        }
    },
    price: {
        float: 'right'
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 600,
        borderTop: '1px dashed #e0e0e0',
        padding: '20px 0',
        borderBottom: '1px dashed #e0e0e0'
    }
});

const TotalView = ({ cartItems }) => {
    const classes = useStyle();
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);

    const calculateTotal = useCallback(() => {
        let totalMrp = 0, totalDiscount = 0;
        
        cartItems.forEach(item => {
            // FIX: Quantity ko fetch karein, default 1 rakhein
            const qty = item.quantity || 1;
            
            // SQL Schema Logic + Quantity Multiplication
            // Price = Selling Price, MRP = Original Price
            const cost = (Number(item.price) || 0) * qty; 
            const mrp = (Number(item.mrp) || (Number(item.price) + 500)) * qty;

            totalMrp += mrp;
            totalDiscount += (mrp - cost);
        });

        setPrice(totalMrp);
        setDiscount(totalDiscount);
    }, [cartItems]);

    useEffect(() => {
        calculateTotal();
    }, [calculateTotal]);

    return (
        <Box>
            <Box className={classes.header} style={{borderBottom: '1px solid #f0f0f0'}}>
                <Typography className={classes.greyTextColor}>PRICE DETAILS</Typography>
            </Box>
            <Box className={clsx(classes.header, classes.container)}>
                <Typography>Price ({cartItems?.length} item)
                    <span className={classes.price}>₹{price}</span>
                </Typography>
                
                <Typography>Discount
                    <span className={classes.price}>-₹{discount}</span>
                </Typography>
                
                <Typography>Delivery Charges
                    <span className={classes.price}>₹40</span>
                </Typography>
                
                <Typography className={classes.totalAmount}>Total Amount
                    <span className={classes.price}>₹{(price - discount) + 40}</span>
                </Typography>
                
                <Typography style={{fontSize: 16, color: 'green', fontWeight: 500}}>
                    You will save ₹{discount} on this order
                </Typography>
            </Box>
        </Box>
    )
}

export default TotalView;