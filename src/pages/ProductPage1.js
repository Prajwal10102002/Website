import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Grid, Typography } from '@mui/material'; // Import MUI components
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';

const ProductPage = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [sortingOption, setSortingOption] = useState('default');

    useEffect(() => {
        setIsLoggedIn(true); // Set to true for demonstration

        // Fetch categories
        axios.get('http://localhost:3001/api/v1/products/categories')
            .then(response => {
                setCategories(response.data); // Assuming response.data is your array of category names
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });

        // Fetch products
        fetch('http://localhost:3001/api/v1/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const handleSortingChange = (event, newSortingOption) => {
        setSortingOption(newSortingOption);
        let sortedProducts = [...products];

        switch (newSortingOption) {
            case 'default':
                break;
            case 'highToLow':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'lowToHigh':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'newest':
                sortedProducts.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                break;
            default:
                break;
        }

        setProducts(sortedProducts);
    };

    const filteredProducts = selectedCategory
        ? products.filter(product => product.category === selectedCategory)
        : products;

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Filter by Category:
            </Typography>
            <ToggleButtonGroup
                value={selectedCategory}
                exclusive
                onChange={(event, newCategory) => setSelectedCategory(newCategory)}
            >
                {categories.map(category => (
                    <ToggleButton key={category} value={category}>
                        {category}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
            
            <Typography variant="h5" sx={{ marginTop: 3, marginBottom: 2 }}>
                Sort by:
            </Typography>

            <ToggleButtonGroup
                value={sortingOption}
                exclusive
                onChange={handleSortingChange}
                sx={{ mt: 2 }} // Add margin-top for spacing
            >
                <ToggleButton value="default">Default</ToggleButton>
                <ToggleButton value="highToLow">Price High to Low</ToggleButton>
                <ToggleButton value="lowToHigh">Price Low to High</ToggleButton>
                <ToggleButton value="newest">Newest</ToggleButton>
            </ToggleButtonGroup>

            <Grid container spacing={3} sx={{ mt: 3 }}>
                {filteredProducts.map(product => (
                    <Grid item key={product._id} xs={3} sm={20} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                src={product.imageURL}
                                alt={product.name}
                                sx={{ height: 200, objectFit: 'cover' }} // Set the desired height and use object-fit
                            />
                            <CardContent>
                                <Typography variant="h6">{product.name}</Typography>
                                <Typography variant="body1">
                                    Price: ${product.price}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <a href={`/products/${product._id}`}>View Details</a>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ProductPage;
