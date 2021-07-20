/**
 * 다양한 연극을 외주 받아서 공연하는 극단이 있음
 * 극단은 비극과 희극 장르만 공연함
 * 공연료와 별도로 포인트를 지급해 다음번 의뢰 시 공연료를 할인 받을 수 있음
 *
 * 출력 결과물이 문자열로 고정되어 있기 때문에 html로 출력하는 기능을 추가하려고 한다면
 * result의 형식만 다른 새로운 함수인 statementHTML과 같은 함수를 새로 만들어야한다.
 *
 * 이 때 변경사항이 생긴다면 두 함수를 모두 변경해야하고 변경사항이 제대로 적용되었는지 두 함수 모두 확인해야한다.
 * 여기서 버그가 발생할 확률이 높고 관리하기가 어려워진다.
 */

const fs = require("fs");

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;

    switch (play.type) {
      case "tragedy": // 비극
        thisAmount = 40000;
        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;

      case "comedy": // 희극
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;

      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }

    // 포인트 적립
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트 제공
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

    // 청구내역 출력
    result += `  ${play.name}: ${format(thisAmount / 100)} (${
      perf.audience
    }석)\n`;
    totalAmount += thisAmount;
  }

  // 청구내역 출력
  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}

const invoice = JSON.parse(
  fs.readFileSync("./chapter1/data/invoice.json").toString("utf-8")
);
const plays = JSON.parse(
  fs.readFileSync("./chapter1/data/plays.json").toString("utf-8")
);

console.log(statement(invoice, plays));
