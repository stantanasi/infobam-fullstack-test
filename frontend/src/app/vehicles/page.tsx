import { FuelType, FuelTypeLabels, VehicleType, VehicleTypeLabels } from '@/models/vehicle.model';
import { getManufacturers } from '@/services/manufacturer.service';
import { getVehicles } from '@/services/vehicle.service';
import Link from 'next/link';

export default async function Page() {
  const manufacturers = await getManufacturers();
  const vehicles = await getVehicles();

  return (
    <div>
      <div>
        Filtres :

        <div>
          Marque :
          <ul>
            {manufacturers.map((manufacturer) => (
              <li key={manufacturer.name}>{manufacturer.name}</li>
            ))}
          </ul>
        </div>

        <div>
          Type de voiture :
          <ul>
            {Object.values(VehicleType).map((type) => (
              <li key={type}>
                {VehicleTypeLabels[type]}
              </li>
            ))}
          </ul>
        </div>

        <div>
          Carburant :
          <ul>
            {Object.values(FuelType).map((type) => (
              <li key={type}>
                {FuelTypeLabels[type]}
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