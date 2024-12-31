import { Suspense } from 'react';
// COMPONENT
import SearchMap from '@/app/(none-footer-navigation)/pet-tour/search-map/SearchMap';

export default async function SearchMapPage({ params }) {
  return (
    <Suspense>
      <SearchMap />
    </Suspense>
  );
}
