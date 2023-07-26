/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"

import Header from "./header"
import { ThemeProvider } from "@mui/material"
import { createTheme } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
  },
  typography: {
    fontSize: 12
  }
});

type layout = {
  children: JSX.Element,
  headerButtonsFor: string
}
const Layout = ({ children, headerButtonsFor }:layout) => {

  return (
    <ThemeProvider theme={theme}>
      <Header forPage={headerButtonsFor}/>
      <div>{children}</div>
    </ThemeProvider>
  )
}

export default Layout
