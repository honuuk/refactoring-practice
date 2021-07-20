/**
 * 코드를 분석하지 않고도 코드의 역할이 무엇인지 빠르게 파악할 수 있어야한다.
 * 그렇게 하기위해 코드 일부분을 함수로 추출하고 함수에 이름을 붙인다.
 *
 * 리팩토링을 진행하기 전 반드시 테스트 코드를 작성해야한다.
 * 그리고 한 가지를 수정할 때마다 테스트를 해야한다.
 * 그래야 오류가 발생하더라도 변경 폭이 작기 때문에 문제를 해결하기가 쉽다.
 *
 * switch 문 코드를 amountFor(perf, play) 함수로 분리한다.
 * play 정보를 가져오는 부분을 playFor(aPerformance) 함수로 분리한다.
 * volumeCredits 계산 부분을 volumnCreditsFor(aPerformance) 함수로 분리한다.
 *
 * 함수를 분리하고 나면 변수의 이름을 더 명확하게 바꾼다
 * thisAmount, volumeCredits -> result, perf -> aPerformance
 *
 * thisAmount, play 변수를 인라인한다.
 *
 * format 변수를 임시변수가 아닌 함수로 변경한다.
 * format 함수의 이름이 역할을 잘 드러내지 못한다. format 함수를 usd 함수로 변경하고 단위 변환 로직도 함수 안으로 이동한다.
 *
 * volumnCredits 계산 부분을 반복문에서 분리하고 함수로 변경한 후 volumnCredits 변수를 인라인한다.
 * totalAmount 계산 부분도 함수로 변경한 후 totalAmount 변수를 인라인 한다.
 */

const fs = require("fs");

function statement(invoice, plays) {
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  for (let perf of invoice.performances) {
    // 청구내역 출력
    result += `  ${playFor(perf).name}: ${usd(amountFor(perf))} (${
      perf.audience
    }석)\n`;
  }

  // 청구내역 출력
  result += `총액: ${usd(totalAmount())}\n`;
  result += `적립 포인트: ${totalVolumnCredits()}점\n`;
  return result;

  function totalAmount() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += amountFor(perf);
    }
    return result;
  }

  function totalVolumnCredits() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += volumeCreditsFor(perf);
    }
    return result;
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0;

    // 포인트 적립
    result += Math.max(aPerformance.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트 제공
    if ("comedy" === playFor(aPerformance).type)
      result += Math.floor(aPerformance.audience / 5);

    return result;
  }

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance) {
    let result = 0;

    switch (playFor(aPerformance).type) {
      case "tragedy": // 비극
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;

      case "comedy": // 희극
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;

      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }

    return result;
  }
}

const invoice = JSON.parse(
  fs.readFileSync("./chapter1/data/invoice.json").toString("utf-8")
);
const plays = JSON.parse(
  fs.readFileSync("./chapter1/data/plays.json").toString("utf-8")
);

console.log(statement(invoice, plays));
