// COMPONENT
import Modal from '@/components/common/Modal';
import SearchMap from '@/app/(none-footer-navigation)/pet-tour/search-map/SearchMap';

export default function SearchMapModal({ params }) {
  return (
    <Modal title="지도 검색" full bottomSlide>
      <SearchMap />
    </Modal>
  );
}
