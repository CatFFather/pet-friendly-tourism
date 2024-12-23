import { Suspense } from 'react';
// COMPONENT
import PetTourMap from '@/app/(none-footer-navigation)/pet-tour/detail/map/PetTourMap';
export default async function MapPage({ params }) {
  return (
    <div className="w-full h-screen">
      <Suspense>
        <PetTourMap />
      </Suspense>
    </div>
  );
}
