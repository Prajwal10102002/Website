import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, TextField, Paper, Container, Box } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const OrderPlacementPage = () => {
    const { productId } = useParams();
    const [activeStep, setActiveStep] = useState(0);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [subtotal, setSubtotal] = useState(0);
    const [addressForm, setAddressForm] = useState({
        name: '',
        contactNumber: '',
        city: '',
        landmark: '',
        street: '',
        state: '',
        zipCode: '',
    });

    useEffect(() => {
        // Fetch product details here based on your API endpoint
        axios.get(`http://localhost:3001/api/v1/products/${productId}`)
            .then(response => {
                setProduct(response.data);
                setSubtotal(response.data.price * quantity); // Update subtotal based on product price and quantity
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
            });
    }, [productId, quantity]);

    const steps = ['Product Details', 'Shipping Address', 'Confirm Order'];

    const handleNext = () => {
        if (activeStep === 0) {
            setActiveStep(prevActiveStep => prevActiveStep + 1);
        } else if (activeStep === 1) {
            // Perform address form validation and update subtotal if necessary
            setActiveStep(prevActiveStep => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleConfirmOrder = () => {
        // Logic to handle confirming the order
        setActiveStep(2); // Move to the "Confirm Order" step
    };

    const handleQuantityChange = newQuantity => {
        setQuantity(newQuantity);
        setSubtotal(product.price * newQuantity); // Update subtotal based on product price and new quantity
    };

    const handleAddressFormChange = event => {
        const { name, value } = event.target;
        setAddressForm(prevAddressForm => ({
            ...prevAddressForm,
            [name]: value,
        }));
    };
    const [orderConfirmed, setOrderConfirmed] = useState(false);

    const handleConfirmOrder1 = () => {
        // Logic to handle confirming the order
        // You can add your own implementation here
        setOrderConfirmed(true); // Set orderConfirmed to true when the order is confirmed
    };

    return (
        <Container component="div" maxWidth="sm" sx={{ my: 4 }}>
            <Paper variant="outlined" sx={{ p: 3 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Order Placement
                </Typography>
                <Stepper activeStep={activeStep} alternativeLabel sx={{ pt: 3, pb: 5 }}>
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Box>
                    {activeStep === 0 && product && (
                        <Box>
                            <Typography variant="h6">Product Details</Typography>
                            <img
                                src={product.imageURL}
                                alt={product.name}
                                style={{ maxWidth: '100%', height: 'auto', marginBottom: '1rem' }}
                            />
                            <Typography variant="subtitle1" gutterBottom>
                                {product.name}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Price: ${product.price}
                            </Typography>
                            <TextField
                                label="Quantity"
                                type="number"
                                value={quantity}
                                onChange={e => handleQuantityChange(e.target.value)}
                                inputProps={{ min: 1 }}
                            />
                            <Typography variant="body1" gutterBottom>Subtotal: ${subtotal}</Typography>
                            <Button variant="contained" color="primary" onClick={handleNext}>
                                Next
                            </Button>
                        </Box>
                    )}
                    {activeStep === 1 && (
                        <Box>
                            <Typography variant="h6">Shipping Address</Typography>
                            <React.Fragment>
                                
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="firstName"
                                            name="firstName"
                                            label="First name"
                                            fullWidth
                                            autoComplete="given-name"
                                            variant="standard"
                                            value={addressForm.firstName}
                                            onChange={handleAddressFormChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="lastName"
                                            name="lastName"
                                            label="Last name"
                                            fullWidth
                                            autoComplete="family-name"
                                            variant="standard"
                                            value={addressForm.lastName}
                                            onChange={handleAddressFormChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            id="address1"
                                            name="address1"
                                            label="Address line 1"
                                            fullWidth
                                            autoComplete="shipping address-line1"
                                            variant="standard"
                                            value={addressForm.address1}
                                            onChange={handleAddressFormChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="address2"
                                            name="address2"
                                            label="Address line 2"
                                            fullWidth
                                            autoComplete="shipping address-line2"
                                            variant="standard"
                                            value={addressForm.address2}
                                            onChange={handleAddressFormChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="city"
                                            name="city"
                                            label="City"
                                            fullWidth
                                            autoComplete="shipping address-level2"
                                            variant="standard"
                                            value={addressForm.city}
                                            onChange={handleAddressFormChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="landmark"
                                            name="landmark"
                                            label="Landmark"
                                            fullWidth
                                            variant="standard"
                                            value={addressForm.landmark}
                                            onChange={handleAddressFormChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            id="street"
                                            name="street"
                                            label="Street"
                                            fullWidth
                                            autoComplete="shipping street"
                                            variant="standard"
                                            value={addressForm.street}
                                            onChange={handleAddressFormChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="state"
                                            name="state"
                                            label="State/Province/Region"
                                            fullWidth
                                            variant="standard"
                                            value={addressForm.state}
                                            onChange={handleAddressFormChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="zipCode"
                                            name="zipCode"
                                            label="Zip / Postal code"
                                            fullWidth
                                            autoComplete="shipping postal-code"
                                            variant="standard"
                                            value={addressForm.zipCode}
                                            onChange={handleAddressFormChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                                            label="Use this address for payment details"
                                        />
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                            <Button disabled={activeStep === 0} onClick={handleBack}>
                                Back
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleNext}>
                                Next
                            </Button>
                        </Box>
                    )}
                    {activeStep === 2 && (
                        <Box>
                        <Typography variant="h6">Confirm Details</Typography>
                        <Typography variant="body1" gutterBottom>
                            Product: {product.name}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Price: ${product.price}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Quantity: {quantity}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Subtotal: ${subtotal}
                        </Typography>
                        <Typography variant="h6">Shipping Address</Typography>
                        <Typography variant="body1" gutterBottom>
                            Name: {addressForm.firstName} {addressForm.lastName}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Address: {addressForm.address1}, {addressForm.address2}, {addressForm.city}, {addressForm.state}, {addressForm.zipCode}
                        </Typography>
                        <Button onClick={handleBack}>
                                Back
                            </Button>
                        <Button variant="contained" color="primary" onClick={handleConfirmOrder1}>
                            Confirm Order
                        </Button>
                        {orderConfirmed && (
                            <Typography variant="body1" color="textSecondary" mt={2}>
                                Your order is confirmed!
                            </Typography>
                        )}
                    </Box>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default OrderPlacementPage;
