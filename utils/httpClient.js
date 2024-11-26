const applyBaseUrl = (input, baseUrl) => {
  if (!baseUrl) {
    return input;
  }

  if (typeof input === 'object' && 'url' in input) {
    return new URL(input.url, baseUrl);
  }

  return new URL(input, baseUrl);
};

export default function httpClient({
  baseUrl,
  interceptors = {},
  ...requestInit
}) {
  return async function (apiUrl, init) {
    // const url = applyBaseUrl(input, baseUrl); // base url 변경 후 applyBaseUrl로 사용
    const url = `${baseUrl}${apiUrl}`;
    const option = { ...requestInit, ...init };
    const interceptorAppliedOption = interceptors.request
      ? await interceptors.request(url, option)
      : option;
    const response = await fetch(url, interceptorAppliedOption);
    if (interceptors.response) {
      return await interceptors.response(response);
    }
    return response;
  };
}
