import { FuelType, FuelTypeLabels, VehicleType, VehicleTypeLabels } from '@/models/vehicle.model';
import { getManufacturers } from '@/services/manufacturer.service';
import { getVehicles } from '@/services/vehicle.service';
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
    <div>
      <div>
        Trier par :
        <ul>
          {sortBy.map((sort) => {
            const isSelected = searchParams.sort === sort.key;
            const newParams: Partial<SearchParams> = {
              ...searchParams,
              sort: sort.key,
            };

            return (
              <li key={sort.key}>
                <Link href={`?${new URLSearchParams(newParams).toString()}`}>
                  {sort.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        Filtres :

        <div>
          Marque :
          <ul>
            {manufacturers.map((manufacturer) => {
              const isSelected = !!searchParams.manufacturer?.split(',').includes(manufacturer.name);
              const newParams: Partial<SearchParams> = {
                ...searchParams,
                manufacturer: isSelected
                  ? searchParams.manufacturer?.split(',').filter(v => v !== manufacturer.name).join(',')
                  : [...(searchParams.manufacturer?.split(',') ?? []), manufacturer.name].join(','),
              };

              return (
                <li key={manufacturer.name}>
                  <Link href={`?${new URLSearchParams(newParams).toString()}`}>
                    {manufacturer.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          Type de voiture :
          <ul>
            {Object.values(VehicleType).map((type) => {
              const isSelected = !!searchParams.type?.split(',').includes(type);
              const newParams: Partial<SearchParams> = {
                ...searchParams,
                type: isSelected
                  ? searchParams.type?.split(',').filter(v => v !== type).join(',')
                  : [...(searchParams.type?.split(',') ?? []), type].join(','),
              };

              return (
                <li key={type}>
                  <Link href={`?${new URLSearchParams(newParams).toString()}`}>
                    {VehicleTypeLabels[type]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          Carburant :
          <ul>
            {Object.values(FuelType).map((fuel) => {
              const isSelected = !!searchParams.fuel_type?.split(',').includes(fuel);
              const newParams: Partial<SearchParams> = {
                ...searchParams,
                fuel_type: isSelected
                  ? searchParams.fuel_type?.split(',').filter(v => v !== fuel).join(',')
                  : [...(searchParams.fuel_type?.split(',') ?? []), fuel].join(','),
              };

              return (
                <li key={fuel}>
                  <Link href={`?${new URLSearchParams(newParams).toString()}`}>
                    {FuelTypeLabels[fuel]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div>
        Voitures :
        <ul>
          {vehicles.map((vehicle) => (
            <li key={vehicle.id}>
              <Link href={`/vehicles/${vehicle.id}`}>
                {vehicle.manufacturer} {vehicle.model}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Link href={(() => {
          const currentPage = +(searchParams.page ?? 1);
          const newParams: Partial<SearchParams> = {
            ...searchParams,
            page: (currentPage <= 1 ? 1 : currentPage - 1).toString(),
          };

          return `?${new URLSearchParams(newParams).toString()}`;
        })()}>
          {'<'}
        </Link>

        <Link href={(() => {
          const currentPage = +(searchParams.page ?? 1);
          const newParams: Partial<SearchParams> = {
            ...searchParams,
            page: (currentPage + 1).toString(),
          };

          return `?${new URLSearchParams(newParams).toString()}`;
        })()}>
          {'>'}
        </Link>
      </div>
    </div>
  );
}