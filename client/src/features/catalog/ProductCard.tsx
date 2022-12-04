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
import { Product } from "../../app/models/product";
interface Props {
  product: Product;
}
const ProductCard = ({ product }: Props) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={<Avatar sx={{backgroundColor:'secondary.main'}}>{product.name.charAt(0).toUpperCase()}</Avatar>}
        title={product.name}
        titleTypographyProps={{sx : {fontWeight: 'bold', color:'primary.main'}}}
      />
      <CardMedia
      sx={{backgroundSize: 'contain', height: 140, bgcolor:'primary.light'}}
        // component="img"
        image={product.pictureUrl}
        // alt="green iguana"
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color='secondary' variant="h5">
          {(product.price/100).toFixed(2)} €
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to cart</Button>
        <Button size="small"> View</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
