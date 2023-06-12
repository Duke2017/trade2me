import * as React from "react"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

import { gql, useQuery } from "@apollo/client"

type adverts = {
  id: string
  title: string
  description: string
  price: number
  picture: string
}

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

export default function AdvertsList() {
  const { loading, error, data } = useQuery(GET_ALLADVERTS)
  if (loading) return <>Loading...</>
  if (error) return <>Error! {error.message}</>

  return (
    <>
      {data.allAdverts.map((adv: adverts) => (
        <Card
          sx={{ marginTop: "1rem", border: 1, borderColor: "grey.500" }}
          key={adv.id}
        >
          <CardContent>
            <Typography gutterBottom>{adv.title}</Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              {adv.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
