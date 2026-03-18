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
        flexDirection: 'row',
        gap: '20px',
        padding: '10px 10px',
      }}
    >

      <Box
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        <Link
          href={`?`}
          style={{ textDecoration: 'underline' }}
        >
          Réinitialiser
        </Link>


        <Box
          sx={{
            display: 'flex',
            backgroundColor: '#ededed',
            borderRadius: '8px',
            flexDirection: 'column',
            gap: '8px',
            padding: '8px 16px',
          }}
        >
          <Typography>
            <Box sx={{ fontSize: '20px', fontWeight: 'bold' }}>
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
                gap: '2px',
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
                    gap: '2px',
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
            borderRadius: '8px',
            flexDirection: 'column',
            gap: '14px',
            padding: '12px',
          }}
        >
          <Typography>
            <Box sx={{ fontSize: '20px', fontWeight: 'bold' }}>
              Filtres
            </Box>
          </Typography>

          <Box
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              padding: '8px 16px',
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
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              padding: '8px 16px',
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
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              padding: '8px 16px',
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
          backgroundColor: '#ededed',
          borderRadius: '8px',
          flex: 3,
          flexDirection: 'column',
          gap: '20px',
          padding: '20px 16px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
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
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  flexDirection: 'row',
                }}
              >
                <Box
                  component="img"
                  sx={{
                    width: '300px',
                    height: '200px',
                  }}
                  src={vehicle.images[0]}
                />

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    justifyContent: 'space-between',
                    padding: '20px 10px',
                  }}
                >
                  <Box>
                    <Typography>
                      <Box sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                        {vehicle.manufacturer}
                      </Box>
                    </Typography>

                    <Typography>
                      {vehicle.model}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '30px',
                    }}
                  >
                    <Typography>
                      {vehicle.year}
                    </Typography>

                    <Typography>
                      {VehicleTypeLabels[vehicle.type]}
                    </Typography>

                    <Typography>
                      {FuelTypeLabels[vehicle.fuelType]}
                    </Typography>
                  </Box>

                  <Typography variant="h4">
                    {vehicle.price} €
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
            gap: '50px',
          }}
        >
          <Link
            href={`?${new URLSearchParams({
              ...searchParams,
              page: (currentPage <= 1 ? 1 : currentPage - 1).toString(),
            }).toString()}`}
            style={{
              color: currentPage <= 1 ? '#d4d4de' : 'inherit',
              pointerEvents: currentPage <= 1 ? 'none' : 'unset',
            }}
          >
            {'<'}
          </Link>

          <Link
            href={`?${new URLSearchParams({
              ...searchParams,
              page: (currentPage + 1).toString(),
            }).toString()}`}
          >
            {'>'}
          </Link>
        </Box>
      </Box>
    </Container>
  );
}