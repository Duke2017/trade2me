import * as React from "react"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import Image from "mui-image"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useQuery } from "@apollo/client"
import { GET_ALLADVERTS } from "../../backend/requests"
import { advertType } from "../../types"
import { navigate } from "gatsby"

interface IHeaderProps {
  userId?: string
}
export default function AdvertsList({ userId }: IHeaderProps) {
  const moreThan600 = useMediaQuery("(min-width:600px)")
  const moreThan840 = useMediaQuery("(min-width:840px)")
  const moreThan1024 = useMediaQuery("(min-width:1024px)")
  //const moreThan0 = useMediaQuery('(min-width:601px) and (max-width:840px)');

  let cardWidth = moreThan1024
    ? "calc(20% - 6px)"
    : moreThan840
    ? "calc(25% - 6px)"
    : moreThan600
    ? "calc(33.333% - 6px)"
    : "calc(50% - 6px)"

  const handleCardPress = (adv:advertType) => {
    navigate(`/user/${adv.userId}/${adv.id}`)
  }
  const { loading, error, data } = useQuery(GET_ALLADVERTS, {
    variables: { userId },
  })
  console.log("userId", userId)
  console.log("data", data)
  if (loading) return <>Loading...</>
  if (error) return <>Error! {error.message}</>

  return (
    <Box
      flexWrap="wrap"
      display="flex"
      flexDirection="row"
      margin="0 -3px 4px -3px"
    >
      {data.allAdverts.map((adv: advertType) => (
        <Card
          sx={{
            width: cardWidth,
            margin: "2px",
            flexDirection: "column",
            display: "flex",
            overflow: "hidden",
            border: 1,
            borderColor: "grey.300",
          }}
          key={adv.id}
          onClick={() => {handleCardPress(adv)}}
        >
          <CardContent sx={{ padding: "0" }}>
            <Image src={adv.picture} height={150} showLoading />
            <Box sx={{ pl: "0.5rem", pr: "0.5rem" }}>
              <Typography sx={{ mt: "0.4rem" }}>{adv.title} </Typography>
              <Typography
                sx={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {adv.price} ₽
              </Typography>

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
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}
