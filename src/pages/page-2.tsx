import * as React from "react"
import { PageProps, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import ApolloClient from "apollo-boost";
import { InMemoryCache, ApolloProvider, gql } from '@apollo/client';
const client = new ApolloClient({
  uri: "/.netlify/functions/graphql"
});

// client
//   .query({
//     query: gql`
//     query hello{
//       hello
//     }
//     `,
//   })
//   .then((result) => console.log(result));

function createData(
  name: string,
  price: number
) {
  return { name, price };
}

const rows = [
  createData('Frozen yoghurt', 159),
  createData('Ice cream sandwich', 237),
  createData('Eclair', 262),
  createData('Cupcake', 305),
  createData('Gingerbread', 356),
];

const SecondPage: React.FC<PageProps> = () => {
  const fetchData = async () => {
    const results = await fetch('../.netlify/functions/hello');
    if (results.ok) {
      const json = await results.json();
      setMessage(json.message);
    } else {
      console.error("Ошибка HTTP: " + results.status);
    }
  }

  const [message, setMessage] = React.useState('');
  React.useEffect(()=>{
    fetchData();
  },[])

  return (
    <Layout>
      <h1>Hi from the {message}</h1>
      <p>Welcome to page 2</p>
      <Link to="/">Go back to the homepage</Link>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  )
}

export const Head = () => <Seo title="Page two" />

export default SecondPage
