import { Suspense } from 'react';
// COMPONENT
import PetTourMap from '@/app/(none-footer-navigation)/pet-tour/detail/map/PetTourMap';
export default async function MapPage({ params }) {
  return (
    <Suspense>
      <PetTourMap />
    </Suspense>
  );
}
