import { useState } from "react";
import {
  Container,
  Paper,
  Grid,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function SearchBox() {

  const navigate = useNavigate();

  const [searchData, setSearchData] = useState({

    checkIn: null,

    checkOut: null,

    guests: 2,

    roomType: "Luxury",

  });

  const handleSearch = () => {

    if (!searchData.checkIn) {
      alert("Please select Check-In Date");
      return;
    }

    if (!searchData.checkOut) {
      alert("Please select Check-Out Date");
      return;
    }

    if (searchData.checkOut.isBefore(searchData.checkIn, "day")) {
      alert("Check-Out must be after Check-In");
      return;
    }

    console.log({
      checkIn: searchData.checkIn.format("YYYY-MM-DD"),
      checkOut: searchData.checkOut.format("YYYY-MM-DD"),
      guests: searchData.guests,
      roomType: searchData.roomType,
    });

    navigate("/login");

  };

  return (

    <LocalizationProvider dateAdapter={AdapterDayjs}>

      <Container
        maxWidth="xl"
        sx={{
          mt: -8,
          position: "relative",
          zIndex: 20,
        }}
      >

        <Paper
          elevation={12}
          sx={{
            p: 4,
            borderRadius: 5,
          }}
        >

          <Grid
            container
            spacing={3}
            alignItems="center"
          >

            <Grid item xs={12} md={3}>

              <DatePicker

                label="Check-In"

                value={searchData.checkIn}

                disablePast

                onChange={(value) =>
                  setSearchData({
                    ...searchData,
                    checkIn: value,
                  })
                }

                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}

              />

            </Grid>

            <Grid item xs={12} md={3}>

              <DatePicker

                label="Check-Out"

                value={searchData.checkOut}

                minDate={
                  searchData.checkIn || dayjs()
                }

                onChange={(value) =>
                  setSearchData({
                    ...searchData,
                    checkOut: value,
                  })
                }

                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}

              />

            </Grid>

            <Grid item xs={12} md={2}>

              <TextField

                fullWidth

                select

                label="Guests"

                value={searchData.guests}

                onChange={(e) =>
                  setSearchData({
                    ...searchData,
                    guests: e.target.value,
                  })
                }

              >

                {[1,2,3,4,5,6].map((guest)=>(

                  <MenuItem
                    key={guest}
                    value={guest}
                  >
                    {guest} Guest{guest>1?"s":""}
                  </MenuItem>

                ))}

              </TextField>

            </Grid>

            <Grid item xs={12} md={2}>

              <TextField

                fullWidth

                select

                label="Room"

                value={searchData.roomType}

                onChange={(e)=>
                  setSearchData({
                    ...searchData,
                    roomType:e.target.value,
                  })
                }

              >

                <MenuItem value="Luxury">
                  Luxury Suite
                </MenuItem>

                <MenuItem value="Deluxe">
                  Deluxe Room
                </MenuItem>

                <MenuItem value="Executive">
                  Executive Room
                </MenuItem>

                <MenuItem value="Family">
                  Family Room
                </MenuItem>

              </TextField>

            </Grid>

            <Grid item xs={12} md={2}>

              <Button

                fullWidth

                variant="contained"

                startIcon={<SearchIcon />}

                onClick={handleSearch}

                sx={{

                  height:56,

                  background:"#D4AF37",

                  color:"#000",

                  fontWeight:"bold",

                  fontSize:16,

                  "&:hover":{

                    background:"#C49A2C",

                  }

                }}

              >

                SEARCH

              </Button>

            </Grid>

          </Grid>

        </Paper>

      </Container>

    </LocalizationProvider>

  );

}

export default SearchBox;