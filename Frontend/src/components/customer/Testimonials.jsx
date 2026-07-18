import {
Box,
Typography,
Grid,
Card,
CardContent,
Avatar
} from "@mui/material";

const reviews=[

{
name:"Rahul",
review:"Excellent rooms and amazing service."
},

{
name:"Anjali",
review:"Very clean rooms and friendly staff."
},

{
name:"Harsha",
review:"Luxury experience at an affordable price."
}

];

function Testimonials(){

return(

<Box mt={7} mb={7}>

<Typography
variant="h4"
fontWeight="bold"
mb={4}
>

Guest Reviews

</Typography>

<Grid container spacing={3}>

{reviews.map((item)=>(

<Grid
item
xs={12}
md={4}
key={item.name}
>

<Card
sx={{
borderRadius:4
}}
>

<CardContent>

<Avatar
sx={{
mb:2,
bgcolor:"#D4AF37",
color:"#000"
}}
>

{item.name[0]}

</Avatar>

<Typography>

"{item.review}"

</Typography>

<Typography
mt={3}
fontWeight="bold"
>

{item.name}

</Typography>

</CardContent>

</Card>

</Grid>

))}

</Grid>

</Box>

)

}

export default Testimonials;