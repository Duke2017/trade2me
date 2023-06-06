import * as React from "react"
import { PageProps, Link, HeadFC } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
const client = new ApolloClient({
  uri: "/.netlify/functions/server",
  cache: new InMemoryCache()
});

type DataProps = {
  site: {
    buildTime: string
  }
}

const IndexPage: React.FC<PageProps> = () => {
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
    <Layout>
      <p>All adverts:</p>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adverts.map((row:any) => (
              <TableRow
                key={row.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
