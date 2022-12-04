import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
function App() {
  const[darkMode,setDarkMode] = useState(false)
  const paletteType = darkMode? 'dark': 'light'
  const theme = createTheme({
    palette: {
      mode: paletteType,
    },
  });
const changeMode = ()=>{
  setDarkMode(!darkMode)
}
  return (
    <ThemeProvider theme={theme}>
      {/*  <CssBaseline /> reset padding margin etc.. */}
      <CssBaseline />
      <Header changeDarkMode = {changeMode}/>
      <Container>
        <Catalog />
      </Container>
    </ThemeProvider>
  );
}

export default App;
