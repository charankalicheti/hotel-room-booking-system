import {
Box,
Container,
Typography,
Grid
} from "@mui/material";

function Footer(){

return(

<Box
sx={{
mt:8,
background:"#111827",
color:"#fff",
py:5
}}
>

<Container>

<Grid container spacing={4}>

<Grid item xs={12} md={4}>

<Typography
variant="h5"
fontWeight="bold"
>

Royal Hotel

</Typography>

<Typography mt={2}>

Luxury Beyond Expectations

</Typography>

</Grid>

<Grid item xs={12} md={4}>

<Typography fontWeight="bold">

Contact

</Typography>

<Typography mt={2}>

support@royalhotel.com

</Typography>

<Typography>

+91 9876543210

</Typography>

</Grid>

<Grid item xs={12} md={4}>

<Typography fontWeight="bold">

Address

</Typography>

<Typography mt={2}>

Hyderabad, Telangana

</Typography>

</Grid>

</Grid>

</Container>

</Box>

)

}

export default Footer;