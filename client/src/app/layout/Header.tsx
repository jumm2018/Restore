import { AppBar, Switch, Toolbar, Typography } from "@mui/material";
interface Props {
  changeDarkMode: () => void
}
const Header = ({changeDarkMode}: Props) => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  return (
    <AppBar position="static" sx={{mb: 4}}>
      <Toolbar>
      <Switch {...label}  sx={{backgroundColor:'primary.main'}} onClick={()=> changeDarkMode()}/>
        <Typography variant="h6">RE-Store</Typography>
        </Toolbar>
    </AppBar>
  );
};

export default Header;
