import { getVehicle } from '@/services/vehicle.service';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; }>;
}) {
  const { id } = await params;
  const vehicle = await getVehicle(id);

  if (!vehicle) {
    return (
      <div>Not found</div>
    );
  }

  return (
    <div>{vehicle.manufacturer} {vehicle.model}</div>
  );
}