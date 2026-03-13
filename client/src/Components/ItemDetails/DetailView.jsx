import { useState, useEffect, useCallback } from 'react'; // useCallback add kiya
import { Box, Typography, makeStyles, Grid } from '@material-ui/core';
import ProductDetail from './ProductDetail';
import ActionItem from './ActionItem';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import { getProductById } from '../../service/api';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../redux/actions/productActions';

const useStyles = makeStyles(theme => ({
    component: {
        marginTop: 55,
        background: '#F2F2F2'
    },
    container: {
        background: '#FFFFFF',
        display: 'flex',
        [theme.breakpoints.down('md')]: {
            margin: 0
        }
    },
    rightContainer: {
        marginTop: 50,
        paddingLeft: 20, // thoda space ke liye
        '& > *': {
            marginTop: 10
        }
    },
    price: {
        fontSize: 28
    },
    smallText: {
        fontSize: 14,
    },
    greyTextColor: {
        color: '#878787'
    }
}));

const DetailView = () => {
    const classes = useStyles();
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';
    
    const { id } = useParams();
    const dispatch = useDispatch();

    // Redux se data nikalna
    const { loading, product } = useSelector(state => state.getProductDetails);

    useEffect(() => {
        if(product && id !== product.id)   
            dispatch(getProductDetails(id));
    }, [dispatch, id, product, loading]);

    // SQL MAPPING LOGIC (PostgreSQL Flat Data)
    // Agar product object mil jata hai, toh ye variables use honge
    const title = product?.title?.longTitle || product?.title || 'Product Loading...';
    const cost = product?.price?.cost || product?.price || 0;
    const mrp = product?.price?.mrp || product?.mrp || (Number(cost) + 2000);
    const discount = product?.price?.discount || product?.discount || '10%';

    return (
        <Box className={classes.component}>
            { product && Object.keys(product).length > 0 &&
                <Grid container className={classes.container}> 
                    <Grid item lg={4} md={4} sm={8} xs={12}>
                        {/* ActionItem ke andar image fix hogi */}
                        <ActionItem product={product} />
                    </Grid>
                    <Grid item lg={8} md={8} sm={8} xs={12} className={classes.rightContainer}>
                        {/* SQL Title use karein */}
                        <Typography style={{ fontSize: 20, fontWeight: 600 }}>{title}</Typography>
                        
                        <Typography className={clsx(classes.greyTextColor, classes.smallText)} style={{marginTop: 5}}>
                            8 Ratings & 1 Reviews
                            <span><img src={fassured} style={{width: 77, marginLeft: 20}} alt="fassured" /></span>
                        </Typography>

                        <Typography>
                            {/* SQL Price use karein */}
                            <span className={classes.price}>₹{cost}</span>&nbsp;&nbsp;&nbsp; 
                            <span className={classes.greyTextColor}><strike>₹{mrp}</strike></span>&nbsp;&nbsp;&nbsp;
                            <span style={{color: '#388E3C'}}>{discount} off</span>
                        </Typography>

                        {/* Baaki details ke liye component */}
                        <ProductDetail product={product} />
                    </Grid>
                </Grid>
            }   
        </Box>
    )
}

export default DetailView;