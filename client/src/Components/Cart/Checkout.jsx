import { Box, Grid, TextField, Button, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import TotalView from './TotalView';
import { loadRazorpay } from '../../razorpay/loadPayment';

const Checkout = () => {
    const { cartItems } = useSelector(state => state.cart);

    const handlePayment = async () => {
        // Amount calculate logic (TotalView se match karein)
        // Yahan aap real amount loadRazorpay mein bhej sakte hain
        await loadRazorpay(1000); 
        // Note: Real flow mein backend order generate karta hai fir payment hoti hai
    }

    return (
        <Grid container style={{ padding: '30px 130px' }}>
            <Grid item lg={8} md={8} sm={12} xs={12}>
                <Box style={{ background: '#fff', padding: 20 }}>
                    <Typography variant="h6" style={{ marginBottom: 20 }}>Delivery Address</Typography>
                    <form>
                        <TextField fullWidth label="Full Name" margin="normal" />
                        <TextField fullWidth label="Phone Number" margin="normal" />
                        <TextField fullWidth label="Pincode" margin="normal" />
                        <TextField fullWidth label="Address (Area and Street)" margin="normal" multiline rows={3} />
                        <Button 
                            variant="contained" 
                            style={{ background: '#fb641b', color: '#fff', marginTop: 20 }}
                            onClick={handlePayment}
                        >
                            Confirm Payment
                        </Button>
                    </form>
                </Box>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12} style={{ paddingLeft: 20 }}>
                <TotalView cartItems={cartItems} />
            </Grid>
        </Grid>
    );
}

export default Checkout;