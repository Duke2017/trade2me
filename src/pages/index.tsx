import * as React from "react"
import { PageProps, HeadFC } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import AdvertsList from "../components/advertsList";

type DataProps = {
  site: {
    buildTime: string
  }
}

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout headerButtonsFor="main">
      <AdvertsList/>
    </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head: HeadFC<DataProps> = () => <Seo title="Home" />

export default IndexPage
