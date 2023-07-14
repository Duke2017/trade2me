import * as React from "react"
import { PageProps, HeadFC, navigate } from "gatsby"
import { Box, Button, TextField } from "@mui/material"
import { useMutation } from "@apollo/client"
import { NumericFormat, NumericFormatProps } from 'react-number-format';

import Layout from "../../components/layout"
import Seo from "../../components/seo"

import { GET_ALLADVERTS, CREATE_ADVERT } from '../../../backend/requests'

type DataProps = {
  site: {
    buildTime: string
  }
}

interface IState {
  picture: string;
  title: string;
  price: number | '';
  description: string;
}

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}
const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        allowNegative={false}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
      />
    );
  },
);

const AdvertPage: React.FC<PageProps> = () => {
  const [values, setValues] = React.useState<IState>({
    picture: '',
    title: '',
    price: '',
    description: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.name === 'price' ? Number(event.target.value) : event.target.value,
    });
  };

  const [createAdvert, { data, loading, error }] = useMutation(CREATE_ADVERT, {
    refetchQueries: [
      GET_ALLADVERTS
    ],
  })

  const handleAdvertCreate = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()

    createAdvert({
      variables: {
        advertInput: values,
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
          name="picture"
          value={values.picture}
          onChange={handleChange}
        />
        <TextField
          placeholder="Title"
          name="title"
          value={values.title}
          onChange={handleChange}
        />
        <TextField
          placeholder="Price"
          name="price"
          value={values.price}
          InputProps={{
            inputComponent: NumericFormatCustom as any,
          }}
          onChange={handleChange}
        />
        <TextField
          placeholder="Description"
          name="description"
          multiline
          rows={4}
          value={values.description}
          onChange={handleChange}
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
