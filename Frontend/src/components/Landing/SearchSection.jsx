import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";

export default function SearchSection() {
  return (
    <Box
      sx={{
        py: 5,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                type="date"
                label="Check In"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                type="date"
                label="Check Out"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                select
                fullWidth
                label="Guests"
                defaultValue="2"
              >
                <MenuItem value="1">1 Guest</MenuItem>
                <MenuItem value="2">2 Guests</MenuItem>
                <MenuItem value="3">3 Guests</MenuItem>
                <MenuItem value="4">4+ Guests</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={3}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  height: "56px",
                  bgcolor: "#D4AF37",
                  "&:hover": {
                    bgcolor: "#b8952f",
                  },
                }}
              >
                Search Rooms
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}