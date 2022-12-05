// import { Badge, ShoppingCart } from "@mui/icons-material";
import { ShoppingCart } from '@mui/icons-material';
import { Badge} from '@mui/material';
import {
  AppBar,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
interface Props {
  changeMode: () => void;
  isDarkMode: boolean;
}
const navStyle = { color: "inherit", typography: "h6" , '&:hover' : {color:'grey.500'}, '&.active':{color: 'text.secondary'}}
const midLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];
const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];
const Header = ({ changeMode, isDarkMode }: Props) => {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" component={NavLink} to='/' sx={{textDecoration: 'none', color: 'inherit'}}>RE-Store</Typography>
        <Switch checked={isDarkMode} onChange={changeMode} />
        {/* middelLinks*/}
        <List sx={{ display: "flex" }}>
          {midLinks.map(({ title, path }) => (
            <ListItem
              component={NavLink}
              to={path}
              key={path}
              sx={navStyle}
            >
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>
        {/* Shoppingcart*/}
        <IconButton size='large' sx={{color: 'inherit'}}>
          <Badge badgeContent={4} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>

        {/* rightLinks*/}
        <List sx={{ display: "flex" }}>
          {rightLinks.map(({ title, path }) => (
            <ListItem
              component={NavLink}
              to={path}
              key={path}
              sx={{ color: "inherit", typography: "h6" }}
            >
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
