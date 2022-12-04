import { AppBar, Switch, Toolbar, Typography } from "@mui/material";
interface Props {
  changeMode: () => void
  isDarkMode: boolean
}
const Header = ({changeMode,isDarkMode}: Props) => {
  return (
    <AppBar position="static" sx={{mb: 4}}>
      <Toolbar>
      <Switch checked={isDarkMode} onChange={changeMode}/>
        <Typography variant="h6">RE-Store</Typography>
        </Toolbar>
    </AppBar>
  );
};

export default Header;
