import { FuelType, FuelTypeLabels, VehicleType, VehicleTypeLabels } from '@/models/vehicle.model';
import { getManufacturers } from '@/services/manufacturer.service';
import { getVehicles } from '@/services/vehicle.service';
import { Box, Checkbox, Container, Divider, Radio, Typography } from '@mui/material';
import Link from 'next/link';

const VEHICLES_LIMIT = 10;

interface SearchParams {
  manufacturer: string;
  type: string;
  fuel_type: string;
  year: string;
  sort: string;
  page: string;
}

export default async function Page(props: {
  searchParams: Promise<Partial<SearchParams>>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = +(searchParams.page ?? 1);

  const sortBy = [
    {
      key: 'price',
      label: 'Prix croissant',
    },
    {
      key: '-price',
      label: 'Prix décroissant',
    },
    {
      key: 'year',
      label: 'Année croissante',
    },
    {
      key: '-year',
      label: 'Année décroissante',
    },
  ];
  const manufacturers = await getManufacturers();
  const vehicles = await getVehicles({
    manufacturer: searchParams.manufacturer?.split(',') ?? [],
    type: searchParams.type?.split(',') as VehicleType[] ?? [],
    fuel_type: searchParams.fuel_type?.split(',') as FuelType[] ?? [],
    year: searchParams.year?.split('-').map((year) => +year) ?? [],
    sort: searchParams.sort?.split(',') ?? [],
    limit: VEHICLES_LIMIT,
    offset: +(searchParams.page ?? 1) * VEHICLES_LIMIT - VEHICLES_LIMIT,
  });

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 8,
      }}
    >

      <Box
        sx={{
          display: 'flex',
          flex: '1 1 30%',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Link href="/vehicles">
          <Typography color="primary">
            Réinitialiser
          </Typography>
        </Link>

        <Box
          sx={{
            display: 'flex',
            backgroundColor: '#ededed',
            borderRadius: 2,
            flexDirection: 'column',
            gap: 1,
            padding: 2,
          }}
        >
          <Typography>
            <Box sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
              Trier par
            </Box>
          </Typography>
          <Divider />
          <Link
            href={`?${new URLSearchParams({
              ...searchParams,
              sort: '',
            }).toString()}`}
          >
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                gap: 1,
              }}
            >
              <Radio checked={!searchParams.sort} sx={{ padding: 0 }} />
              <Typography>Défaut</Typography>
            </Box>
          </Link>
          {sortBy.map((sort) => {
            const isSelected = searchParams.sort === sort.key;
            const newParams: Partial<SearchParams> = {
              ...searchParams,
              sort: sort.key,
            };

            return (
              <Link
                key={sort.key}
                href={`?${new URLSearchParams(newParams).toString()}`}
              >
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1,
                  }}
                >
                  <Radio checked={isSelected} sx={{ padding: 0 }} />
                  <Typography>{sort.label}</Typography>
                </Box>
              </Link>
            );
          })}
        </Box>

        <Box
          sx={{
            display: 'flex',
            backgroundColor: '#ededed',
            borderRadius: 2,
            flexDirection: 'column',
            gap: 2,
            padding: 2,
          }}
        >
          <Typography>
            <Box sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
              Filtres
            </Box>
          </Typography>

          <Box
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              padding: 2,
            }}
          >
            <Typography>
              Marque
            </Typography>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                gap: '2px',
                flexDirection: 'column',
                maxHeight: '200px',
                overflowY: 'auto',
              }}
            >
              {manufacturers.map((manufacturer) => {
                const isSelected = !!searchParams.manufacturer?.split(',').includes(manufacturer.name);
                const newParams: Partial<SearchParams> = {
                  ...searchParams,
                  manufacturer: isSelected
                    ? searchParams.manufacturer?.split(',').filter(v => v !== manufacturer.name).join(',')
                    : [...(searchParams.manufacturer?.split(',') ?? []), manufacturer.name].join(','),
                };

                return (
                  <Link
                    key={manufacturer.name}
                    href={`?${new URLSearchParams(newParams).toString()}`}
                  >
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '2px',
                      }}
                    >
                      <Checkbox checked={isSelected} sx={{ padding: 0 }} />
                      <Typography>{manufacturer.name}</Typography>
                    </Box>
                  </Link>
                );
              })}
            </Box>
          </Box>

          <Box
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              padding: 2,
            }}
          >
            <Typography>
              Type de voiture
            </Typography>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                gap: '2px',
                flexDirection: 'column',
                maxHeight: '200px',
                overflowY: 'auto',
              }}
            >
              {Object.values(VehicleType).map((type) => {
                const isSelected = !!searchParams.type?.split(',').includes(type);
                const newParams: Partial<SearchParams> = {
                  ...searchParams,
                  type: isSelected
                    ? searchParams.type?.split(',').filter(v => v !== type).join(',')
                    : [...(searchParams.type?.split(',') ?? []), type].join(','),
                };

                return (
                  <Link
                    key={type}
                    href={`?${new URLSearchParams(newParams).toString()}`}
                  >
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '2px',
                      }}
                    >
                      <Checkbox checked={isSelected} sx={{ padding: 0 }} />
                      <Typography>{VehicleTypeLabels[type]}</Typography>
                    </Box>
                  </Link>
                );
              })}
            </Box>
          </Box>

          <Box
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              padding: 2,
            }}
          >
            <Typography>
              Carburant
            </Typography>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                gap: '2px',
                flexDirection: 'column',
                maxHeight: '200px',
                overflowY: 'auto',
              }}
            >
              {Object.values(FuelType).map((fuel) => {
                const isSelected = !!searchParams.fuel_type?.split(',').includes(fuel);
                const newParams: Partial<SearchParams> = {
                  ...searchParams,
                  fuel_type: isSelected
                    ? searchParams.fuel_type?.split(',').filter(v => v !== fuel).join(',')
                    : [...(searchParams.fuel_type?.split(',') ?? []), fuel].join(','),
                };

                return (
                  <Link
                    key={fuel}
                    href={`?${new URLSearchParams(newParams).toString()}`}
                  >
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '2px',
                      }}
                    >
                      <Checkbox checked={isSelected} sx={{ padding: 0 }} />
                      <Typography>{FuelTypeLabels[fuel]}</Typography>
                    </Box>
                  </Link>
                );
              })}
            </Box>
          </Box>

        </Box>
      </Box>


      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: 2,
          flex: '1 1 70%',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h1" sx={{ fontSize: '3rem' }}>
          Voitures
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {vehicles.map((vehicle) => (
            <Link
              key={vehicle.id}
              href={`/vehicles/${vehicle.id}`}
            >
              <Box
                sx={{
                  display: 'flex',
                  border: '1px solid #eee',
                  borderRadius: 2,
                  flexDirection: { xs: 'column', md: 'row' },
                  overflow: 'hidden',
                }}
              >
                <Box
                  component="img"
                  sx={{
                    width: { xs: '100%', sm: '260px' },
                    height: '180px',
                    backgroundColor: '#eee',
                    objectFit: 'cover',
                  }}
                  alt={`${vehicle.manufacturer} ${vehicle.model}`}
                  src={vehicle.images[0]}
                />

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: 2,
                  }}
                >
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {vehicle.manufacturer} {vehicle.model}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                      <Typography>{vehicle.year}</Typography>
                      <Typography>•</Typography>
                      <Typography>{FuelTypeLabels[vehicle.fuelType]}</Typography>
                      <Typography>•</Typography>
                      <Typography>{VehicleTypeLabels[vehicle.type]}</Typography>
                    </Box>
                  </Box>

                  <Typography variant="h5" color="primary" sx={{ fontWeight: 800, mt: { xs: 2, sm: 0 } }}>
                    {vehicle.price.toLocaleString()} €
                  </Typography>
                </Box>
              </Box>
            </Link>
          ))}
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Link
            href={`?${new URLSearchParams({ ...searchParams, page: (currentPage - 1).toString() }).toString()}`}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              textDecoration: 'none',
              color: currentPage <= 1 ? '#ccc' : '#1976d2',
              pointerEvents: currentPage <= 1 ? 'none' : 'auto'
            }}
          >
            Précédent
          </Link>
          <Typography sx={{ fontWeight: 'bold' }}>Page {currentPage}</Typography>
          <Link
            href={`?${new URLSearchParams({ ...searchParams, page: (currentPage + 1).toString() }).toString()}`}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              textDecoration: 'none',
              color: '#1976d2'
            }}
          >
            Suivant
          </Link>
        </Box>
      </Box>
    </Container>
  );
}