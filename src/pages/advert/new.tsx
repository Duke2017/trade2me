import * as React from "react"
import { PageProps, HeadFC, navigate } from "gatsby"
import { Box, Button, TextField } from "@mui/material"
import { gql, useMutation } from "@apollo/client"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

import { typeDefs } from '../../../backend/schema'

type DataProps = {
  site: {
    buildTime: string
  }
}

const AdvertPage: React.FC<PageProps> = () => {
  const [picture, setPicture] = React.useState("")
  const [title, setTitle] = React.useState("")
  const [price, setPrice] = React.useState(0)
  const [description, setDescription] = React.useState("")

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPicture(event.target.value)
  }
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(+event.target.value)
  }
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value)
  }

  const CREATE_ADVERT = gql`
    mutation ($advertInput: AdvertInput) {
      createAdvert(advertInput: $advertInput) {
        id
        title
        description
        price
        picture
      }
    }
  `
  const GET_ALLADVERTS = gql`
  query {
    allAdverts {
      id
      title
      price
      description
      picture
    }
  }
`

  const [createAdvert, { data, loading, error }] = useMutation(CREATE_ADVERT, {
    refetchQueries: [
      GET_ALLADVERTS
    ],
  })

  const handleAdvertCreate = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()

    createAdvert({
      variables: {
        advertInput: {
          title,
          description,
          price,
          picture,
        },
      },
    })
    //if (loading) return <>Loading...</>
    //if (error) return <>Error! {error.message}</>

    navigate("/")
  }

  return (
    <Layout headerButtonsFor="new">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          mt: "1rem",
        }}
      >
        <TextField
          placeholder="Picture URL"
          aria-label="picture"
          value={picture}
          onChange={handlePictureChange}
        />
        <TextField
          placeholder="Title"
          aria-label="title"
          value={title}
          onChange={handleTitleChange}
        />
        <TextField
          placeholder="Price"
          aria-label="price"
          value={price}
          onChange={handlePriceChange}
        />
        <TextField
          placeholder="Description"
          aria-label="description"
          multiline
          rows={4}
          value={description}
          onChange={handleDescriptionChange}
        />
        <Button onClick={handleAdvertCreate}>Create</Button>
      </Box>
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
