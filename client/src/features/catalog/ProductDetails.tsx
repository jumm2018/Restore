import { LoadingButton } from "@mui/lab";
import {
  Divider,
  Grid,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../api/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import { useStoreContext } from "../../context/StoreContext";

const ProductDetails = () => {
  const { basket } = useStoreContext();
  // const { id } = useParams<{id: string}>() // problem with parseInt
  const { id } = useParams() as { id: string };
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  /* How many of the items does the user already have of this item inside the basket?
   a separate loading indicator for when we do updates the quantity inside the basket or as an item */
  const [quantity, setQuantity] = useState(0);
  // for submitting the.Functionality to the API.
  const [submitting, setSubmitting] = useState(false);
  const item = basket?.items.find((i) => i.productId === product?.id);
  useEffect(() => {
    if (item) setQuantity(item.quantity);
    agent.Catalog.details(parseInt(id))
      .then((response) => setProduct(response))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [id]);
  if (loading) return <LoadingComponent message="loading product..." />;
  if (!product) return <NotFound />;
  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h4">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          {(product.price / 100).toFixed(2)}€
        </Typography>
        <TableContainer>
          <table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Desciption</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6} />
          <TextField
            variant="outlined"
            type="number"
            label="quantity in cart"
            fullWidth
            value={quantity}
          />
        </Grid>
        <Grid item xs={6}>
          <LoadingButton sx={{height: '55px'}} color='primary' size="large" variant="contained" fullWidth>
            {item ? "Update quantity" : "Add to cart"}
          </LoadingButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
