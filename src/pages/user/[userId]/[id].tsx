import * as React from "react"
import { PageProps, HeadFC } from "gatsby"
import Layout from "../../../components/layout"
import Seo from "../../../components/seo"
import Box from "@mui/material/Box"
import Image from "mui-image"
import Typography from "@mui/material/Typography"
import { useQuery } from "@apollo/client"
import { GET_ADVERT } from "../../../../backend/requests"

type DataProps = {
  site: {
    buildTime: string
  }
}

const AdvertPage: React.FC<PageProps> = pageProps => {
  const id = pageProps.params.id
  const { loading, error, data } = useQuery(GET_ADVERT, {
    variables: { id },
  })
  console.log("id", id)
  if (loading) return <>Loading...</>
  if (error) return <>Error! {error.message}</>

  return (
    <Layout headerButtonsFor="advert">
      <Box sx={{ pl: "0.5rem", pr: "0.5rem" }}>
        {data.advert.picture.length > '' &&
          <Image src={data.advert.picture} showLoading />
        }
        <Typography sx={{ mt: "0.4rem" }} variant="h4">{data.advert.title} </Typography>
        <Typography
        variant="h5"
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {data.advert.price} ₽
        </Typography>

        <Typography>
          {data.advert.description}
        </Typography>
      </Box>
    </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head: HeadFC<DataProps> = () => <Seo title="advert" />

export default AdvertPage
