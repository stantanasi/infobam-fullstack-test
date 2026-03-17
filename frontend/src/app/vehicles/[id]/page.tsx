import { getVehicle } from '@/services/vehicle.service';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; }>;
}) {
  const { id } = await params;
  const vehicle = await getVehicle(id);

  if (!vehicle) {
    notFound();
  }

  return (
    <div>{vehicle.manufacturer} {vehicle.model}</div>
  );
}