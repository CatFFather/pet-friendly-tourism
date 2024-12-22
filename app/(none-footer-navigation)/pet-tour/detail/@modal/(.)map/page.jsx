// COMPONENT
import Modal from '@/components/common/Modal';
import PetTourMap from '@/app/(none-footer-navigation)/pet-tour/detail/map/PetTourMap';

export default function DetailMapModal({ params }) {
  return (
    <Modal title="지도" full bottomSlide>
      <PetTourMap />
    </Modal>
  );
}
