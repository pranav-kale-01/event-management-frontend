import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.2)",
  },
}));

const LiveMap: React.FC = () => {
  const maps = [
    {
      name: "Main Entrance",
      src: "https://www.google.com/maps/embed?pb=!4v1732129403013!6m8!1m7!1sCAoSLEFGMVFpcE5zWkkzRFIySTVucUVuSU42TGRxS09WX1VuR0xicERpRktqbFd6!2m2!1d19.87929148367115!2d75.35675051246953!3f0!4f0!5f0.4000000000000002",
    },
    {
      name: "Construction Department",
      src: "https://www.google.com/maps/embed?pb=!4v1732129586190!6m8!1m7!1sCAoSLEFGMVFpcE9VYkduSmNvMXdqVWkxakZlNXV1MXhwMjJGZlJpalRKbDFYd0Ex!2m2!1d19.87906070643083!2d75.35659786905782!3f-1.511564631816101!4f4.324754363251628!5f1.2114769345834837",
    },
    {
      name: "Mini Canteen",
      src: "https://www.google.com/maps/embed?pb=!4v1732129639341!6m8!1m7!1sCAoSLEFGMVFpcFBNVlZGSkUyeTdjdURDVVFpOERoVWo2Nnp1VXlKMHJzTXJXU0Qt!2m2!1d19.87880519373116!2d75.356643679888!3f0!4f0!5f0.4000000000000002",
    },
    {
      name: "University Building",
      src: "https://www.google.com/maps/embed?pb=!4v1732129830310!6m8!1m7!1sCAoSLEFGMVFpcE1GMXVSWFBNMTN6LXEzYjBrRWRKNEo1SjR3eGhkNlFFMWxuV1Zm!2m2!1d19.87992475706306!2d75.35596469970832!3f322.4089440598377!4f-4.750451571874578!5f0.4000000000000002",
    },
    {
      name: "Indoor JNEC",
      src: "https://www.google.com/maps/embed?pb=!4v1732129916439!6m8!1m7!1sCAoSLEFGMVFpcE5obTc5MGNya0pYUGZuQXhPTlBrcl9aSkY2bVlpWEVFaUVZRG42!2m2!1d19.88008693235558!2d75.35677337338693!3f0!4f0!5f0.4000000000000002",
    },
    {
      name: "Einstein Hall",
      src: "https://www.google.com/maps/embed?pb=!4v1732130029823!6m8!1m7!1sCAoSLEFGMVFpcFBNUE1sM0EzVmdsUUZ6TzNjMzJabGY2Q0dWQkNDNU4ta1k2NU5a!2m2!1d19.8797568537483!2d75.35617827679451!3f0!4f0!5f0.4000000000000002",
    },
  ];

  return (
    <Container sx={{ py: 4 }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#333" }}
      >
        Explore Live Maps
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        gutterBottom
        sx={{ mb: 4, color: "#555" }}
      >
        Navigate through our campus with interactive maps.
      </Typography>
      <Grid container spacing={4}>
        {maps.map((map, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StyledCard>
              <CardMedia
                component="iframe"
                src={map.src}
                height="250"
                style={{ border: "none" }}
                loading="lazy"
              />
              <CardContent>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ fontWeight: "bold", color: "#4A4A4A" }}
                >
                  {map.name}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ textAlign: "center", mt: 6, color: "#888" }}>
        <Typography variant="body2">
          Powered by <strong>Google Maps</strong>
        </Typography>
      </Box>
    </Container>
  );
};

export default LiveMap;
