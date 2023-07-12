import * as React from "react"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import Image from "mui-image"

import { useQuery } from "@apollo/client"
import { GET_ALLADVERTS } from "../../backend/requests"
import { advertType } from "../../types"

export default function AdvertsList() {
  const { loading, error, data } = useQuery(GET_ALLADVERTS)
  if (loading) return <>Loading...</>
  if (error) return <>Error! {error.message}</>

  return (
    <>
      {data.allAdverts.map((adv: advertType) => (
        <Card
          sx={{
            width: 300,
            display: "inline-block",
            overflow: "hidden",
            mt: "1rem",
            mr: "1rem",
            border: 1,
            borderColor: "grey.300",
          }}
          key={adv.id}
        >
          <CardContent>
            <Image src={adv.picture} height={200} showLoading />

            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                flexDirection: "row",
                mt: "1rem",
              }}
            >
              <Typography>{adv.title}</Typography>
              <Typography sx={{
                overflow: "hidden",
                ml: "1rem",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}>{adv.price}</Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "0.8rem",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
              color="text.secondary"
            >
              {adv.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
