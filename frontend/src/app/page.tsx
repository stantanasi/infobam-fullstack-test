import { Box, Button, Container, Typography } from "@mui/material";
import Image from 'next/image';
import Link from "next/link";

export default function Home() {
  return (
    <Container
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 8,
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Image
        src="/directions_car_filled.svg"
        alt="Logo"
        width={80}
        height={80}
      />

      <Box>
        <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
          INFOBAM Technical Test
        </Typography>
        <Typography variant="h6">
          Développé par <span style={{ fontWeight: 'bold' }}>Lory-Stan TANASI</span>
        </Typography>
      </Box>

      <Link href="/vehicles">
        <Button
          variant="contained"
          size="large"
          sx={{
            padding: '10px 20px',
            borderRadius: '12px',
            textTransform: 'none',
          }}
        >
          Accéder au voitures
        </Button>
      </Link>
    </Container>
  );
}
