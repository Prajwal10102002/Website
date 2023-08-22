import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, TextField, Typography, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  card: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
  },
  price: {
    marginTop: theme.spacing(2),
    fontWeight: 'bold',
  },
  quantityInput: {
    margin: theme.spacing(2, 0),
    width: '100px',
  },
  buyButton: {
    width: '100%',
  },
  additionalInfo: {
    marginTop: theme.spacing(2),
  },
  fixedSizeImage: {
    width: '450px', // Adjust the width as needed
    height: '450px', // Adjust the height as needed
  },
}));



const ProductDetailsPage = () => {
  const classes = useStyles();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/v1/products/${productId}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, [productId]);

  return (
    <div className={classes.root}>
      {product ? (
        <Paper className={classes.card}>
          <img src={product.imageURL} alt={product.name} className={`${classes.image} ${classes.fixedSizeImage}`} />
          <Typography variant="h4" align="center" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            {product.description}
          </Typography>
          <Typography variant="h6" align="center" className={classes.price}>
            Price: ${product.price}
          </Typography>
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            inputProps={{ min: 1 }}
            className={classes.quantityInput}
          />
          <Link to={`/order-placement/${productId}?quantity=${quantity}`}>
            <Button
              variant="contained"
              color="primary"
              className={classes.buyButton}
            >
              Buy
            </Button>
          </Link>
          <div className={classes.additionalInfo}>
            <Typography variant="subtitle1" align="center">
              Category: {product.category}
            </Typography>
            <Typography variant="subtitle1" align="center">
              Manufacturer: {product.manufacturer}
            </Typography>
            <Typography variant="subtitle1" align="center">
              Available Items: {product.availableItems}
            </Typography>
          </div>
        </Paper>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </div>
  );
};

export default ProductDetailsPage;
