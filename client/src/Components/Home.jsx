import { Box, makeStyles } from '@material-ui/core';
import NavBar from './Home/NarBar';
import Banner from './Home/Banner';
import MidSlide from './Home/MidSlide';
// import MidSection from './Home/MidSection';
import Slide from './Home/Slide';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts as listProducts } from '../redux/actions/productActions';

const useStyle = makeStyles({
    component: {
        padding: 10,
        background: '#F2F2F2'
    }
})

const Home = () => {

    const classes = useStyle();

    const getProducts = useSelector(state => state.getProducts);
    const { products } = getProducts;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <>
            <NavBar />

            <Box className={classes.component}>
                <Banner />

                {/* Main Deals Section */}
                <MidSlide products={products || []} />

                {/* Single slider for products */}
                <Slide
                    data={products || []}
                    title="Discounts for You"
                    timer={false}
                    multi={true}
                />

                {/* Other sliders temporarily removed to improve performance */}

                {/*
                <MidSection />

                <Slide
                    data={products}
                    title='Suggested Items'
                    timer={false}
                    multi={true}
                />

                <Slide
                    data={products}
                    title='Top Selection'
                    timer={false}
                    multi={true}
                />

                <Slide
                    data={products}
                    title='Recommended Items'
                    timer={false}
                    multi={true}
                />
                */}

            </Box>
        </>
    )
}

export default Home;