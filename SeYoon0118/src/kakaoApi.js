// Kakao API 요청을 모아둔 파일이에요.
// 컴포넌트가 아니라 평범한 함수들이라서, 어느 컴포넌트에서든 import해서 쓸 수 있어요.

// 모든 요청이 공통으로 거치는 함수
async function requestKakao(path, params) {
  const query = new URLSearchParams(params);
  const response = await fetch(`/kakao${path}?${query}`);
  const data = await response.json();

  if (!response.ok) {
    console.error('Kakao API 에러 응답:', data);
    throw new Error(`Kakao API 요청 실패 (${response.status})`);
  }

  return data;
}

// 장소 이름이나 주소 → { name, address, x, y }
// 키워드 검색 결과가 없으면 주소 검색으로 한 번 더 시도해요. (결정 3)
export async function searchPlace(text) {
  const keywordData = await requestKakao('/v2/local/search/keyword.json', {
    query: text,
    size: 1,
  });

  const place = keywordData.documents[0];
  if (place) {
    return {
      name: place.place_name,
      address: place.road_address_name || place.address_name,
      x: place.x,
      y: place.y,
    };
  }

  const addressData = await requestKakao('/v2/local/search/address.json', {
    query: text,
  });

  const address = addressData.documents[0];
  if (address) {
    return {
      name: address.address_name,
      address: address.address_name,
      x: address.x,
      y: address.y,
    };
  }

  return null; // 둘 다 결과가 없으면 null
}

// 출발지/도착지 좌표 → 대중교통 경로 응답 원본
// 5단계에서는 가공하지 않고 그대로 돌려줘요. 구조를 확인한 뒤 6단계에서 가공할게요.
export async function searchTransitRoutes(startPlace, endPlace) {
  return requestKakao('/v2/routing/publictraffic', {
    start_x: startPlace.x,
    start_y: startPlace.y,
    end_x: endPlace.x,
    end_y: endPlace.y,
  });
}
