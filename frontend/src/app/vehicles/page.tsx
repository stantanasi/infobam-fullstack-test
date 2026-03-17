import { FuelType, FuelTypeLabels, VehicleType, VehicleTypeLabels } from '@/models/vehicle.model';
import { getManufacturers } from '@/services/manufacturer.service';
import { getVehicles } from '@/services/vehicle.service';
import Link from 'next/link';

interface VehiclesParams {
  manufacturers: string[];
  type: VehicleType[];
  fuel_type: FuelType[];
  year: number[];
  sort: string[];
}

export default async function Page(props: {
  searchParams: Promise<{
    manufacturer?: string;
    type?: string;
    fuel_type?: string;
    year?: string;
    sort?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const params: VehiclesParams = {
    manufacturers: searchParams.manufacturer?.split(',') ?? [],
    type: searchParams.type?.split(',') as VehicleType[] ?? [],
    fuel_type: searchParams.fuel_type?.split(',') as FuelType[] ?? [],
    year: searchParams.year?.split('-').map((year) => +year) ?? [],
    sort: searchParams.sort?.split(',') ?? [],
  };

  const manufacturers = await getManufacturers();
  const vehicles = await getVehicles(params);

  const getFilterLink = (params: VehiclesParams) => {
    const searchParams = new URLSearchParams();

    for (const [key, val] of Object.entries(params ?? {})) {
      if (Array.isArray(val) ? val.length === 0 : !val) continue;

      searchParams.append(key, Array.isArray(val) ? val.join(',') : val.toString());
    }

    return `?${searchParams.toString()}`;
  };

  return (
    <div>
      <div>
        Trier par :
        <ul>
          <li>
            <Link href={getFilterLink({
              ...params,
              sort: ['price'],
            })}>
              Prix croissant
            </Link>
          </li>
          <li>
            <Link href={getFilterLink({
              ...params,
              sort: ['-price'],
            })}>
              Prix décroissant
            </Link>
          </li>
          <li>
            <Link href={getFilterLink({
              ...params,
              sort: ['year'],
            })}>
              Année croissante
            </Link>
          </li>
          <li>
            <Link href={getFilterLink({
              ...params,
              sort: ['-year'],
            })}>
              Année décroissante
            </Link>
          </li>
        </ul>
      </div>

      <div>
        Filtres :

        <div>
          Marque :
          <ul>
            {manufacturers.map((manufacturer) => (
              <li key={manufacturer.name}>
                <Link href={getFilterLink({
                  ...params,
                  manufacturers: params.manufacturers?.includes(manufacturer.name)
                    ? params.manufacturers.filter(v => v !== manufacturer.name)
                    : [...(params.manufacturers ?? []), manufacturer.name]
                })}>
                  {manufacturer.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          Type de voiture :
          <ul>
            {Object.values(VehicleType).map((type) => (
              <li key={type}>
                <Link href={getFilterLink({
                  ...params,
                  type: params.type?.includes(type)
                    ? params.type.filter(v => v !== type)
                    : [...(params.type ?? []), type]
                })}>
                  {VehicleTypeLabels[type]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          Carburant :
          <ul>
            {Object.values(FuelType).map((fuel) => (
              <li key={fuel}>
                <Link href={getFilterLink({
                  ...params,
                  fuel_type: params.fuel_type?.includes(fuel)
                    ? params.fuel_type.filter(v => v !== fuel)
                    : [...(params.fuel_type ?? []), fuel]
                })}>
                  {FuelTypeLabels[fuel]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        Voitures :
        <ul>
          {vehicles.map((vehicle) => (
            <li key={vehicle.id}>
              <Link href={`/vehicles/${vehicle.id}`}>{vehicle.manufacturer} {vehicle.model}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}