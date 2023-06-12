/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"

import Header from "./header"

type layout = {
  children: JSX.Element,
  headerButtonsFor: string
}
const Layout = ({ children, headerButtonsFor }:layout) => {

  return (
    <>
      <Header forPage={headerButtonsFor}/>
      <div>{children}</div>
    </>
  )
}

export default Layout
