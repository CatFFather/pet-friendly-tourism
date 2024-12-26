import { useState, useEffect } from 'react';

export default function useObserver({
  callback, // 감지 시 실행할 callback 함수
  threshold = 1.0, // ref가 100% 보여질 때 callback이 실행 (0.1 ~ 1 사이)
  dependency, // useEffect 의존성 필요시 사용
}) {
  const [ref, setRef] = useState(null);

  function onIntersect([entry], observer) {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      callback();
      observer.observe(entry.target);
    }
  }
  useEffect(() => {
    let observer;
    if (ref) {
      observer = new IntersectionObserver(onIntersect, { threshold });
      observer.observe(ref);
    }
    return () => observer && observer.disconnect();
  }, [ref, dependency && dependency]);

  return { ref, setRef };
}
