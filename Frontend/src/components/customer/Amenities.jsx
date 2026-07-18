import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import PoolRoundedIcon from "@mui/icons-material/PoolRounded";
import WifiRoundedIcon from "@mui/icons-material/WifiRounded";
import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import SpaRoundedIcon from "@mui/icons-material/SpaRounded";
import LocalParkingRoundedIcon from "@mui/icons-material/LocalParkingRounded";

const amenities = [

{
title:"Swimming Pool",
icon:<PoolRoundedIcon sx={{fontSize:50}}/>
},

{
title:"Restaurant",
icon:<RestaurantRoundedIcon sx={{fontSize:50}}/>
},

{
title:"Spa",
icon:<SpaRoundedIcon sx={{fontSize:50}}/>
},

{
title:"Gym",
icon:<FitnessCenterRoundedIcon sx={{fontSize:50}}/>
},

{
title:"Parking",
icon:<LocalParkingRoundedIcon sx={{fontSize:50}}/>
},

{
title:"Free WiFi",
icon:<WifiRoundedIcon sx={{fontSize:50}}/>
}

];

function Amenities(){

return(

<Box mt={7}>

<Typography
variant="h4"
fontWeight="bold"
mb={4}
>

Hotel Amenities

</Typography>

<Grid container spacing={3}>

{amenities.map((item)=>(

<Grid
item
xs={6}
md={2}
key={item.title}
>

<Card
sx={{
textAlign:"center",
borderRadius:4,
p:3,
transition:".3s",

"&:hover":{

transform:"translateY(-6px)"

}

}}
>

<CardContent>

<Box color="#D4AF37">

{item.icon}

</Box>

<Typography
mt={2}
fontWeight="bold"
>

{item.title}

</Typography>

</CardContent>

</Card>

</Grid>

))}

</Grid>

</Box>

)

}

export default Amenities;