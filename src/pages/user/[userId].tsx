import * as React from "react"
import { PageProps, HeadFC } from "gatsby"
import AdvertsList from "../../components/advertsList";

import Layout from "../../components/layout"
import Seo from "../../components/seo"

type DataProps = {
  site: {
    buildTime: string
  }
}

const UserPage: React.FC<PageProps> = (pageProps) => {
  const userId = pageProps.params.userId
  return (
    <Layout headerButtonsFor="usersadverts">
      <AdvertsList userId={pageProps.params.userId}/>
    </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head: HeadFC<DataProps> = () => <Seo title="User's adverts" />

export default UserPage