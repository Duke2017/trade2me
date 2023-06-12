import * as React from "react"
import { PageProps, Link, HeadFC } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

type DataProps = {
  site: {
    buildTime: string
  }
}

const AdvertPage: React.FC<PageProps> = () => {
  return (
    <Layout headerButtonsFor="advert">
      <div>old advert</div>
    </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head: HeadFC<DataProps> = () => <Seo title="Home" />

export default AdvertPage
