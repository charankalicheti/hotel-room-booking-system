import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";

import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";

const offers = [
  {
    title: "Weekend Offer",
    discount: "30% OFF",
    description: "Book Friday to Sunday and save more.",
  },
  {
    title: "Family Package",
    discount: "25% OFF",
    description: "Free Breakfast + Swimming Pool Access.",
  },
  {
    title: "Luxury Suite",
    discount: "20% OFF",
    description: "Complimentary Spa Session Included.",
  },
];

function Offers() {

  return (

    <Box mt={7}>

      <Typography
        variant="h4"
        fontWeight="bold"
      >
        Exclusive Offers
      </Typography>

      <Typography
        color="text.secondary"
        mb={4}
      >
        Save more with our latest hotel deals.
      </Typography>

      <Grid container spacing={3}>

        {offers.map((offer) => (

          <Grid
            item
            xs={12}
            md={4}
            key={offer.title}
          >

            <Card
              sx={{
                borderRadius:4,
                background:
                  "linear-gradient(135deg,#0F172A,#1E293B)",
                color:"#fff",
              }}
            >

              <CardContent>

                <LocalOfferRoundedIcon
                  sx={{
                    fontSize:50,
                    color:"#D4AF37",
                  }}
                />

                <Typography
                  variant="h5"
                  mt={2}
                  fontWeight="bold"
                >
                  {offer.title}
                </Typography>

                <Typography
                  variant="h4"
                  color="#D4AF37"
                  mt={2}
                >
                  {offer.discount}
                </Typography>

                <Typography
                  sx={{
                    mt:2,
                    color:"#CBD5E1",
                  }}
                >
                  {offer.description}
                </Typography>

                <Button
                  variant="contained"
                  sx={{
                    mt:3,
                    bgcolor:"#D4AF37",
                    color:"#000",
                  }}
                >
                  Claim Offer
                </Button>

              </CardContent>

            </Card>

          </Grid>

        ))}

      </Grid>

    </Box>

  );

}

export default Offers;