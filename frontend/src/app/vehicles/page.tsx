import { getVehicles } from '@/services/vehicle.service';
import Link from 'next/link';

export default async function Page() {
  const vehicles = await getVehicles();

  return (
    <ul>
      {vehicles.map((vehicle) => (
        <li key={vehicle.id}>
          <Link href={`/vehicles/${vehicle.id}`}>{vehicle.manufacturer} {vehicle.model}</Link>
        </li>
      ))}
    </ul>
  );
}