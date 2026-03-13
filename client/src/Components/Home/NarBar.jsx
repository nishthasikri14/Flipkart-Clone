import { Box, makeStyles, Typography } from '@material-ui/core';
import { navData } from '../../constant/data';
import { Link } from 'react-router-dom'; // Import Link

const useStyle = makeStyles(theme => ({
    component: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '55px 130px 0 130px',
        overflowX: 'overlay',
        [theme.breakpoints.down('md')]: {
            margin: 0
        }
    },
    container: {
        padding: '12px 8px',
        textAlign: 'center',
        textDecoration: 'none', // Link ki default blue line hatane ke liye
        color: 'inherit',       // Text color black/inherit rakhne ke liye
        cursor: 'pointer',
        '&:hover': {
            color: '#2874f0'    // Hover karne par Flipkart blue color
        }
    },
    image: {
        width: 64
    },
    text: {
        fontSize: 14,
        fontWeight: 600,
        fontFamily: 'inherit'
    }
}));

const NavBar = () => {
    const classes = useStyle();
    
    return (
        <Box className={classes.component}>
            {
                navData.map(temp => (
                    /* Box ki jagah Link use kiya aur text ko dynamic slug banaya */
                    <Link 
                        to={`/products/${temp.text.toLowerCase().replace(/ /g, '-')}`} 
                        className={classes.container}
                        key={temp.text}
                    >
                        <img src={temp.url} className={classes.image} alt="nav icon" />
                        <Typography className={classes.text}>{temp.text}</Typography>
                    </Link>
                ))
            }
        </Box>
    )
}

export default NavBar;