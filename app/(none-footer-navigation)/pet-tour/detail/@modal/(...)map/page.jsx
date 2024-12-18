'use client';

// COMPONENT
import Modal from '@/components/common/Modal';

export default function DetailMappage({ params }) {
  return (
    <Modal title="지도" full bottomSlide>
      <div className="w-full h-60 bg-gray-300 flex items-center justify-center">
        <div>
          <div>여기는 테스트 모달</div> <div>여기는 테스트 모달</div>{' '}
          <div>여기는 테스트 모달</div> <div>여기는 테스트 모달</div>{' '}
          <div>여기는 테스트 모달</div> <div>여기는 테스트 모달</div>{' '}
          <div>여기는 테스트 모달</div> <div>여기는 테스트 모달</div>{' '}
          <div>여기는 테스트 모달</div>
        </div>
      </div>
    </Modal>
  );
}
