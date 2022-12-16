import { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";
import agent from "../../api/agent";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../context/StoreContext";
import { currencyFormat } from "../../util/util";
interface Props {
  product: Product;
}
const ProductCard = ({ product }: Props) => {
  // loading indicator
  const [loading, setLoading] = useState(false);
  const { setBasket } = useStoreContext();
  const handelAddItem = (productId: number) => {
    setLoading(true);
    agent.basket
      .addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor: "secondary.main" }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "primary.main" },
        }}
      />
      <CardMedia
        sx={{
          backgroundSize: "contain",
          height: 140,
          bgcolor: "primary.light",
        }}
        // component="img"
        image={product.pictureUrl}
        // alt="green iguana"
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          {currencyFormat(product.price)} 
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={loading}
          onClick={() => handelAddItem(product.id)}
          size="small"
        >
          Add to cart
        </LoadingButton>
        <Button size="small" component={Link} to={`/catalog/${product.id}`}>
          {" "}
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
