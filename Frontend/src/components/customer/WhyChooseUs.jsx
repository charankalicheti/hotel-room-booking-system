import React from "react";
import {
Box,
Grid,
Typography,
Card,
CardContent
} from "@mui/material";

import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import RoomServiceRoundedIcon from "@mui/icons-material/RoomServiceRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";

const data=[

{
title:"5 Star Luxury",
icon:<EmojiEventsRoundedIcon sx={{fontSize:60}}/>,
text:"Premium rooms with world class comfort."
},

{
title:"24/7 Service",
icon:<RoomServiceRoundedIcon sx={{fontSize:60}}/>,
text:"Round the clock room service."
},

{
title:"Safe Stay",
icon:<SecurityRoundedIcon sx={{fontSize:60}}/>,
text:"Secure environment with modern facilities."
}

];

function WhyChooseUs(){

return(

<Box mt={8}>

<Typography
variant="h4"
fontWeight="bold"
mb={4}
>

Why Choose Royal Hotel

</Typography>

<Grid container spacing={3}>

{data.map((item)=>(

<Grid
item
xs={12}
md={4}
key={item.title}
>

<Card
sx={{
textAlign:"center",
borderRadius:4,
height:"100%"
}}
>

<CardContent>

<Box color="#D4AF37">

{item.icon}

</Box>

<Typography
variant="h5"
mt={2}
fontWeight="bold"
>

{item.title}

</Typography>

<Typography
mt={2}
color="text.secondary"
>

{item.text}

</Typography>

</CardContent>

</Card>

</Grid>

))}

</Grid>

</Box>

)

}

export default WhyChooseUs;