import { ArrowLeftIcon } from '@heroicons/react/24/outline';
// SERVICE
import KorPetTourService from '@/service/KorPetTourService ';
// COMPONENT
import TopBackButtonLayout from '@/components/layout/TopBackButtonLayout';

export default async function PetTourDetailLayout({ children }) {
  return (
    <TopBackButtonLayout tilte="개떼놀이터 인천점">
      {children}
    </TopBackButtonLayout>
  );
}
