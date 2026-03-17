import { FuelType, FuelTypeLabels, VehicleType, VehicleTypeLabels } from '@/models/vehicle.model';
import { getManufacturers } from '@/services/manufacturer.service';
import { getVehicles } from '@/services/vehicle.service';
import Link from 'next/link';

export default async function Page(props: {
  searchParams: Promise<{
    manufacturer?: string;
    type?: string;
    fuel_type?: string;
    year?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const manufacturers = await getManufacturers();
  const vehicles = await getVehicles({
    manufacturers: searchParams.manufacturer?.split(',') ?? [],
    type: searchParams.type?.split(',') as VehicleType[] ?? [],
    fuel_type: searchParams.fuel_type?.split(',') as FuelType[] ?? [],
    year: searchParams.year?.split('-').map((year) => +year) ?? [],
  });

  const getFilterLink = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);

    const existing = newParams.get(key)?.split(',') || [];

    const updated = existing.includes(value)
      ? existing.filter(v => v !== value)
      : [...existing, value];

    if (updated.length > 0) {
      newParams.set(key, updated.join(','));
    } else {
      newParams.delete(key);
    }

    return `?${newParams.toString()}`;
  };

  return (
    <div>
      <div>
        Filtres :

        <div>
          Marque :
          <ul>
            {manufacturers.map((manufacturer) => (
              <li key={manufacturer.name}>
                <Link href={getFilterLink('manufacturer', manufacturer.name)}>
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
                <Link href={getFilterLink('type', type)}>
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
                <Link href={getFilterLink('fuel_type', fuel)}>
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