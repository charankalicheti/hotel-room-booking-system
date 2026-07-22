import React from "react";
import {
Box,
Button,
Card,
CardContent,
TextField,
Typography
} from "@mui/material";

function Newsletter(){

return(

<Card
sx={{
mt:8,
borderRadius:5,
background:"linear-gradient(135deg,#0F172A,#1E293B)",
color:"#fff"
}}
>

<CardContent
sx={{
p:5,
textAlign:"center"
}}
>

<Typography
variant="h4"
fontWeight="bold"
>

Stay Updated

</Typography>

<Typography
mt={2}
mb={4}
color="#CBD5E1"
>

Subscribe to receive exclusive hotel offers.

</Typography>

<TextField

placeholder="Enter Email"

sx={{
width:350,
bgcolor:"#fff",
borderRadius:2
}}

/>

<Button

variant="contained"

sx={{
ml:2,
bgcolor:"#D4AF37",
color:"#000",
height:56
}}

>

Subscribe

</Button>

</CardContent>

</Card>

)

}

export default Newsletter;