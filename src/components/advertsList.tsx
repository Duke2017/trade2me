import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { Description } from '@mui/icons-material';

const client = new ApolloClient({
  uri: "/.netlify/functions/server",
  cache: new InMemoryCache()
});

type adverts = {
  id: string,
  title: string,
  description: string
}

export default function AdvertsList() {
  const fetchData = async () => {
    client.query({
      query: gql`
        query {
          allAdverts {
            id
            title
            description
          }
        }
      `,
    })
    .then((result) => setAdverts(result.data.allAdverts));
  }

  const [adverts, setAdverts] = React.useState([]);
  React.useEffect(()=>{
    fetchData();
  },[])

  return (
    <>
    {adverts.map( (adv:adverts)=> (
      <Card sx={{ marginTop: '1rem'}} key={adv.id}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {adv.title}
          </Typography>
          <Typography>
            {adv.description}
          </Typography>
        </CardContent>
      </Card>
    ))}
    </>
  );
}