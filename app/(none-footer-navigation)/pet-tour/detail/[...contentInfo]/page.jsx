import DOMPurify from 'dompurify';
import Image from 'next/image';
import Link from 'next/link';

// ICON
import {
  PhoneIcon,
  MapIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/outline';
// SERVICE
import KorPetTourService from '@/service/KorPetTourService ';
// UTIL
import {
  formatCommaNumber,
  introCategorizedFields,
  categories,
} from '@/utils/format';
// COMPONENT
import ImgCarousel from '@/components/carousel/ImgCarousel';

const sectionClassName =
  'flex flex-col gap-3 px-4 py-5 border-b-8 border-[#F3F6F6] text-sm';
const h2ClassName = 'text-lg font-bold text-[#0E0E0E]';

// 상세 데이터 가져오기
async function getDetailItems(contentTypeId, contentId) {
  const [detailPetTour, detailInfo, detailIntro, detailImages, detailCommon] =
    await Promise.all([
      KorPetTourService.getDetailPetTour({ contentId }),
      KorPetTourService.getDetailInfo({ contentTypeId, contentId }),
      KorPetTourService.getDetailIntro({ contentTypeId, contentId }),
      KorPetTourService.getDetailImage({ contentId }),
      KorPetTourService.getDetailCommon({
        contentId,
        defaultYN: 'Y',
        firstImageYN: 'Y',
        areacodeYN: 'Y',
        catcodeYN: 'Y',
        addrinfoYN: 'Y',
        mapinfoYN: 'Y',
        overviewYN: 'Y',
      }),
    ]);
  const intro = detailIntro?.response?.body?.items?.item?.[0];
  const newIntroData = introCategorizedFields?.[contentTypeId].map((column) => {
    const value = intro[column?.key];
    return { ...column, value };
  });

  const detailItems = {
    petTour: detailPetTour?.response?.body?.items?.item?.[0],
    info: detailInfo?.response?.body?.items?.item,
    intro: newIntroData,
    images: detailImages?.response?.body?.items?.item,
    common: detailCommon?.response?.body?.items?.item?.[0],
  };
  return detailItems;
}

export default async function PetTourDetailPage({ params }) {
  const { contentInfo } = await params;
  const contentTypeId = contentInfo?.[0];
  const contentId = contentInfo?.[1];
  const detailItems = await getDetailItems(contentTypeId, contentId); // 서버에서 데이터 가져오기
  const { petTour, info, intro, images, common } = detailItems;
  console.log('detailItems', detailItems);
  // TODO common 노출 될 데이터
  // 1.사진 리스트 --> images 로 노출
  // 2.제목 O
  // 3.주소 O
  // 4.내용
  // 5.관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점) 넣을지 말지 고민
  // 6.홈페이지 주소 --> 넣을지 말지 고민
  // 7.전화번호 , 전화번호명(넣을지 말지 고민) O

  // TODO petTour 노출 될 데이터
  // 1. 동반시 필요사항 (acmpyNeedMtr)
  // 2. 관련 사고 대비사항(relaAcdntRiskMtr)
  // 3. 동반유형코드(동반구분)(acmpyTypeCd) --> 이거 코드가 맞는지 확인필요
  // 4. 관련 구비 시설 (relaPosesFclty)
  // 5. 관련 비치 품목 (relaFrnshPrdlst)
  // 6. 기타 동반 정보(etcAcmpyInfo)
  // 7. 관련 구매 품목(relaPurcPrdlst)
  // 8. 동반가능동물(acmpyPsblCpam)
  // 9. 관련 렌탈 품목(relaRntlPrdlst)

  // TODO info 노출 될 데이터
  // 1. 숙박 시설(32)이랑 나머지 다르게 노출

  // TODO intro 노출될 데이터
  // 1. 타입별로 다 다르게 내려옴
  const sanitizedData = (data) => ({
    __html: DOMPurify.sanitize(data),
  });

  function getTitle() {
    const name = categories?.find(
      (category) => category?.key == contentTypeId,
    )?.name;
    return `${name}정보`;
  }

  // 상단 이미지 모음
  function getImages() {
    const firstimageImg = {
      url: common?.firstimage || null,
      imgName: common?.title,
    };
    const imagesData =
      images?.map((image) => {
        return { url: image?.originimgurl, imgName: image?.imgname };
      }) || [];
    return [firstimageImg, ...imagesData];
  }

  return (
    <div>
      <ImgCarousel images={getImages()} />
      <div className="px-4 py-5 text-sm">
        <h1 className="text-xl font-bold text-[#0E0E0E] mb-4">
          {common?.title}
        </h1>
        <div className="flex flex-col gap-2">
          <Link
            href={{
              pathname: '/pet-tour/detail/map',
              query: {
                mapx: common?.mapx,
                mapy: common?.mapy,
                addr: common?.addr1 || common?.addr2,
              },
            }}
            scroll={false}
          >
            <div className="flex items-center ">
              <MapIcon className="h-5 w-5 text-[#4ED1AD] mr-1 flex-shrink-0 self-start" />{' '}
              <span className="text-[#4E5354]">
                {common?.addr1 || common?.addr2 || '-'}
              </span>
            </div>
          </Link>

          <div className="flex items-center">
            <PhoneIcon className="h-5 w-5 text-[#4ED1AD] mr-1 flex-shrink-0 self-start" />{' '}
            <span className="text-[#4E5354]">{common?.tel || '-'}</span>
          </div>
        </div>
      </div>
      <div className={sectionClassName}>
        <h2 className={h2ClassName}>소개</h2>
        <span
          className="text-[#83898C]"
          dangerouslySetInnerHTML={{
            __html: common?.overview || '-',
          }}
        />
      </div>
      <div className={sectionClassName}>
        <h2 className={h2ClassName}>반려동물 동행정보</h2>
        <div className="flex items-center gap-x-3">
          <span className="flex-shrink-0 self-start">동반시 필요사항</span>
          <span className="text-[#83898C]">{petTour?.acmpyNeedMtr || '-'}</span>
        </div>
        <div className="flex items-center gap-x-3">
          <span className="flex-shrink-0 self-start">사고 대비사항</span>
          <span className="text-[#83898C]">
            {petTour?.relaAcdntRiskMtr || '-'}
          </span>
        </div>
        <div className="flex items-center gap-x-3">
          <span className="flex-shrink-0 self-start">동반 유형 코드</span>
          <span className="text-[#83898C]">{petTour?.acmpyTypeCd || '-'}</span>
        </div>
        <div className="flex items-center gap-x-3">
          <span className="flex-shrink-0 self-start">구비 시설</span>
          <span className="text-[#83898C]">
            {petTour?.relaPosesFclty || '-'}
          </span>
        </div>
        <div className="flex items-center gap-x-3">
          <span className="flex-shrink-0 self-start">비치 품목</span>
          <span className="text-[#83898C]">
            {petTour?.relaFrnshPrdlst || '-'}
          </span>
        </div>
        <div className="flex items-center gap-x-3">
          <span className="flex-shrink-0 self-start">기타 동반 정보</span>
          <span className="text-[#83898C] flex-grow">
            {petTour?.etcAcmpyInfo || '-'}
          </span>
        </div>
        <div className="flex items-center gap-x-3">
          <span className="flex-shrink-0 self-start">구매 품목</span>
          <span className="text-[#83898C]">
            {petTour?.relaPurcPrdlst || '-'}
          </span>
        </div>
        <div className="flex items-center gap-x-3">
          <span className="flex-shrink-0 self-start">동반 가능 동물</span>
          <span className="text-[#83898C]">
            {petTour?.acmpyPsblCpam || '-'}
          </span>
        </div>
        <div className="flex items-center gap-x-3">
          <span className="flex-shrink-0 self-start">렌탈 품목</span>
          <span className="text-[#83898C]">
            {petTour?.relaRntlPrdlst || '-'}
          </span>
        </div>
      </div>
      {contentTypeId == '32' ? (
        <div className={`${sectionClassName} bg-[#F8FAFB]`}>
          <h2 className={h2ClassName}>객실정보</h2>
          <div className="flex flex-col gap-4">
            {info?.map((item) => {
              return (
                <div className="flex flex-col rounded-lg p-3 bg-[#FFFFFF] -mx-1 gap-3">
                  <div className="flex gap-x-3">
                    <div className="relative after:content-[''] after:pb-[90%] after:block basis-2/4 flex-shrink-0">
                      <Image
                        fill
                        className="object-cover rounded-lg box-border border border-[#F3F6F6]"
                        src={item?.roomimg1 || '/images/DefaultImage.webp'}
                        alt={item?.roomimg1alt || '사진 없음'}
                        sizes="100%"
                      />
                    </div>
                    <div className="flex flex-col flex-grow gap-2">
                      <h4 className="text-base font-bold text-[#0E0E0E]">
                        {item?.roomtitle}
                      </h4>
                      <span>
                        기준 {item?.roombasecount}인 / 최대 {item?.roommaxcount}
                        인
                      </span>
                      {/* TODO 평수(roomsize1), 객실수(roomcount)도 있음 넣을 지 고민  */}
                      <span>{item?.roomintro}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div>
                      <h5 className="text-sm font-bold text-[#0E0E0E] mb-2">
                        비수기
                      </h5>
                      <div className="flex flex-col">
                        <div className="flex bg-gray-100 text-gray-800">
                          <div className="flex-1 text-center border border-gray-300 py-2">
                            <span>주중</span>
                          </div>
                          <div className="flex-1 text-center border border-gray-300 py-2">
                            <span>주말</span>
                          </div>
                        </div>
                        <div className="flex even:bg-gray-50 ">
                          <div className="flex-1 text-center border border-gray-300 py-2">
                            <span>
                              {formatCommaNumber(
                                Number(item?.roomoffseasonminfee1),
                              )}
                            </span>
                          </div>
                          <div className="flex-1 text-center border border-gray-300 py-2">
                            <span>
                              {formatCommaNumber(
                                Number(item?.roomoffseasonminfee2),
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-[#0E0E0E] mb-2">
                        성수기
                      </h5>
                      <div className="flex flex-col">
                        <div className="flex bg-gray-100 text-gray-800">
                          <div className="flex-1 text-center border border-gray-300 py-2">
                            <span>주중</span>
                          </div>
                          <div className="flex-1 text-center border border-gray-300 py-2">
                            <span>주말</span>
                          </div>
                        </div>
                        <div className="flex even:bg-gray-50 ">
                          <div className="flex-1 text-center border border-gray-300 py-2">
                            <span>
                              {formatCommaNumber(
                                Number(item?.roompeakseasonminfee1),
                              )}
                            </span>
                          </div>
                          <div className="flex-1 text-center border border-gray-300 py-2">
                            <span>
                              {formatCommaNumber(
                                Number(item?.roompeakseasonminfee2),
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={sectionClassName}>
          <h2 className={h2ClassName}>정보</h2>
          {info?.map((item) => {
            return (
              <div className="flex items-center gap-x-3">
                <span className="flex-shrink-0 self-start">
                  {item?.infoname}
                </span>
                <span
                  className="text-[#83898C]"
                  // dangerouslySetInnerHTML={sanitizedData(item?.infotext)} // TODO SSR에서 실행 못함 해결방법 필요 --> dynamic  이라고 있는데 찾아보자
                  dangerouslySetInnerHTML={{
                    __html: item?.infotext || '-',
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
      <div className={sectionClassName}>
        <h2 className={h2ClassName}>{getTitle()}</h2>
        {intro?.map((item) => {
          return (
            <div key={item.key} className="flex items-center gap-x-3">
              <span className="flex-shrink-0 self-start">{item?.name}</span>
              <span
                className="text-[#83898C]"
                dangerouslySetInnerHTML={{
                  __html: item?.value || '-',
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
