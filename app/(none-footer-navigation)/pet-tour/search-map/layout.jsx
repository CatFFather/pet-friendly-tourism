// COMPONENT
import TopBackButtonLayout from '@/components/layout/TopBackButtonLayout';

export default async function PetTourSearchMapLayout({ children }) {
  return (
    <TopBackButtonLayout tilte="지도 검색">{children}</TopBackButtonLayout>
  );
}
