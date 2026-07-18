import {
Box,
Grid,
Typography,
Card,
CardMedia
} from "@mui/material";

const images=[

"https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",

"https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80",

"https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",

"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80"

];

function Gallery(){

return(

<Box mt={8}>

<Typography
variant="h4"
fontWeight="bold"
mb={4}
>

Hotel Gallery

</Typography>

<Grid container spacing={3}>

{images.map((img,index)=>(

<Grid
item
xs={12}
sm={6}
md={3}
key={index}
>

<Card
sx={{
borderRadius:4,
overflow:"hidden"
}}
>

<CardMedia

component="img"

height="220"

image={img}

/>

</Card>

</Grid>

))}

</Grid>

</Box>

)

}

export default Gallery;