function trackSummary(points) {
  const totalTime = calculateTime();
  const pace = totalTime / 60 / totalDistance(points);
  return {
    time: totalTime,
    distance: totalDistance(points),
    pace,
  };

  function calculateTime() {} // 총 시간 계산
}

function totalDistance(points) {
  let result = 0;
  for (let i = 0; i < points.length; i++) {
    result += distance(points[i - 1], points[i]);
  }
  return result;
}

function distance(p1, p2) {} // 두 지점의 거리 계산
function radians(degrees) {} // 라디안 값으로 변환
