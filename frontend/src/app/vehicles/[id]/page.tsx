import { FuelTypeLabels, VehicleTypeLabels } from '@/models/vehicle.model';
import { getVehicle } from '@/services/vehicle.service';
import { Box, Button, Chip, Container, Divider, Grid, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Page({ params }: {
  params: Promise<{ id: string; }>;
}) {
  const { id } = await params;
  const vehicle = await getVehicle(id);

  if (!vehicle) {
    notFound();
  }

  return (
    <Container>
      <Link href="/vehicles">
        <Typography color="primary">
          Retour au catalogue
        </Typography>
      </Link>

      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column-reverse', md: 'row' },
        gap: 8,
        marginTop: 4,
      }}>

        <Box
          sx={{
            display: 'flex',
            flex: '1 1 60%',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          <Box
            component="img"
            sx={{
              width: '100%',
              aspectRatio: '16/9',
              backgroundColor: '#eeeeee',
              borderRadius: 2,
              objectFit: 'cover',
              overflow: 'hidden',
            }}
            alt={`${vehicle.manufacturer} ${vehicle.model}`}
            src={vehicle.images[0]}
          />

          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
              Description
            </Typography>
            <Typography>
              {vehicle.description}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
              Fonctionnalitées
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {vehicle.features.map((feature, index) => (
                <Chip
                  key={index}
                  label={feature}
                  sx={{ borderRadius: 2 }}
                />
              ))}
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flex: '1 1 40%',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <Typography sx={{ textTransform: 'uppercase' }}>
            {VehicleTypeLabels[vehicle.type]}
          </Typography>

          <Box>
            <Typography variant="h1" sx={{ fontSize: '3rem', fontWeight: 'bold' }}>
              {vehicle.manufacturer}
            </Typography>
            <Typography variant="h1" sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
              {vehicle.model}
            </Typography>
          </Box>

          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {vehicle.price.toLocaleString()} €
          </Typography>

          <Divider />

          <Grid container spacing={4}>
            <Grid size={6}>
              <Typography sx={{ color: '#777', textTransform: 'uppercase' }}>
                Année
              </Typography>
              <Typography sx={{ fontWeight: 'bold' }}>
                {vehicle.year}
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ color: '#777', textTransform: 'uppercase' }}>
                Kilométrage
              </Typography>
              <Typography sx={{ fontWeight: 'bold' }}>
                {vehicle.mileage?.toLocaleString() || 0} km
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ color: '#777', textTransform: 'uppercase' }}>
                Carburant
              </Typography>
              <Typography sx={{ fontWeight: 'bold' }}>
                {FuelTypeLabels[vehicle.fuelType]}
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ color: '#777', textTransform: 'uppercase' }}>
                Transmission
              </Typography>
              <Typography sx={{ fontWeight: 'bold' }}>
                {vehicle.transmission}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}