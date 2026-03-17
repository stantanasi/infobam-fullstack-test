import { getVehicles } from '@/services/vehicle.service';

export default async function Page() {
  const vehicles = await getVehicles();

  return (
    <ul>
      {vehicles.map((vehicle) => (
        <li key={vehicle.id}>{vehicle.manufacturer} {vehicle.model}</li>
      ))}
    </ul>
  );
}