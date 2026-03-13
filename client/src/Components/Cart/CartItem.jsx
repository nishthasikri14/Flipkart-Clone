import { Card, makeStyles, Box, Typography, Button } from '@material-ui/core';
import clsx from 'clsx';
import GroupButton from './GroupButton';

const useStyle = makeStyles({
    component: {
        borderTop: '1px solid #f0f0f0',
        borderRadius: 0,
        display: 'flex',
        backgroundColor: '#fff'
    },
    leftComponent: {
        margin: 20, 
        display: 'flex',
        flexDirection: 'column'
    },
    image: {
        height: 110,
        width: 110,
        objectFit: 'contain'
    },
    mid: {
        margin: 20
    },
    greyTextColor: {
        color: '#878787'
    },
    smallText: {
        fontSize: 14,
    },
    price: {
        fontSize: 18,
        fontWeight: 600
    },
    remove: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: 600,
        cursor: 'pointer'
    }
});

const CartItem = ({ item, removeItemFromCart }) => {
    const classes = useStyle();
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';

    // SQL MAPPING LOGIC:
    // 1. Image: SQL mein column 'image' hai. Agar wo nahi hai toh fallback to public/images folder.
    const imageSrc = item.image ? `/images/${item.image}` : `/images/${item.id}.png`;

    // 2. Data: SQL schema ke columns seedhe use honge.
    const title = item.title || 'Product Name';
    const cost = Number(item.price) || 0; // SQL mein 'price' hi aapka actual cost hai
    const mrp = Number(item.mrp) || cost + 2000; // Agar SQL mein MRP nahi hai toh +2000 kar diya display ke liye
    const discount = item.discount || '10%';

    return (
        <Card className={classes.component}>
            <Box className={classes.leftComponent}>
                {/* Image source ab local folder se uthayega */}
                <img src={imageSrc} className={classes.image} alt="product" />
                <GroupButton />
            </Box>
            
            <Box className={classes.mid}>
                <Typography style={{ fontWeight: 600 }}>{title}</Typography>
                
                <Typography className={clsx(classes.greyTextColor, classes.smallText)} style={{ marginTop: 10 }}>
                    Seller: RetailNet
                    <span><img src={fassured} style={{ width: 50, marginLeft: 10 }} alt="fassured" /></span>
                </Typography>

                <Typography style={{ margin: '20px 0' }}>
                    <span className={classes.price}>₹{cost}</span>&nbsp;&nbsp;&nbsp;
                    <span className={classes.greyTextColor}><strike>₹{mrp}</strike></span>&nbsp;&nbsp;&nbsp;
                    <span style={{ color: '#388E3C' }}>{discount} off</span>
                </Typography>
                
                <Button 
                    className={classes.remove} 
                    onClick={() => removeItemFromCart(item.id)}
                >
                    Remove
                </Button>
            </Box>
        </Card>
    );
}

export default CartItem;