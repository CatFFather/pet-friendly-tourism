import localFont from 'next/font/local';
import Script from 'next/script';
import './globals.css';
// COMPONENT
import RootContainer from '@/components/container/RootContainer';
import { GlobalStoreProvider } from '@/providers/GlobalProvider';
import AxiosProvider from '@/providers/AxiosProvider';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata = {
  title: '개모임',
  description:
    '반려동물 동반여행 가능한 관광지, 문화시설, 축제공연행사, 숙박, 음식점, 레포츠, 쇼핑의 관광정보를 제공하는 홈페이지',
};

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer&autoload=false`;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className="antialiased"
      >
        {/* <script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer`}
        ></script> */}
        {/* <Script src="https://developers.kakao.com/sdk/js/kakao.js" async /> */}

        {/* <Script strategy="beforeInteractive" src={KAKAO_SDK_URL} /> */}

        <AxiosProvider>
          <GlobalStoreProvider>
            <RootContainer>{children}</RootContainer>
          </GlobalStoreProvider>
        </AxiosProvider>
      </body>
    </html>
  );
}
