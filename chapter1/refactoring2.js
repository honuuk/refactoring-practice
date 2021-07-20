/**
 * statement 함수에서 결과를 text가 아닌 html로 출력해야 한다고 가정해보자.
 * 리팩터링을 통해 statement 함수의 본문 코드를 줄였기 때문에 html로 변환하는 본문 코드만 작성하면 된다.
 * 하지만 데이터를 만드는 함수들이 중첩함수로 들어있기 때문에 html 버전을 만들기 위해서 중첩함수들도 다같이 복사해야한다.
 *
 * 이 문제를 해결하기 위해 statement 함수를 데이터를 만드는 부분과 결과를 출력하는 부분으로 나눈다.
 * 분리한 renderPlainText 함수에 데이터 객체를 전달하도록 변경한다.
 */

const fs = require("fs");

function statement(invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  return renderPlainText(statementData, plays);

  function enrichPerformance(aPerformance) {
    const result = Object.assign({}, aPerformance);
    result.play = playFor(result);
    result.amount = amountFor(result);
    result.volumeCredit = volumeCreditsFor(result);
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }
  function amountFor(aPerformance) {
    let result = 0;

    switch (aPerformance.play.type) {
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

  function volumeCreditsFor(aPerformance) {
    let result = 0;

    // 포인트 적립
    result += Math.max(aPerformance.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트 제공
    if ("comedy" === aPerformance.play.type)
      result += Math.floor(aPerformance.audience / 5);

    return result;
  }

  function renderPlainText(data, plays) {
    let result = `청구 내역 (고객명: ${data.customer})\n`;

    for (let perf of data.performances) {
      // 청구내역 출력
      result += `  ${perf.play.name}: ${usd(perf.amount)} (${
        perf.audience
      }석)\n`;
    }

    // 청구내역 출력
    result += `총액: ${usd(totalAmount())}\n`;
    result += `적립 포인트: ${totalVolumeCredits()}점\n`;
    return result;

    function totalAmount() {
      let result = 0;
      for (let perf of data.performances) {
        result += perf.amount;
      }
      return result;
    }

    function totalVolumeCredits() {
      let result = 0;
      for (let perf of data.performances) {
        result += perf.volumeCredit;
      }
      return result;
    }

    function usd(aNumber) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }).format(aNumber / 100);
    }
  }
}

const invoice = JSON.parse(
  fs.readFileSync("./chapter1/data/invoice.json").toString("utf-8")
);
const plays = JSON.parse(
  fs.readFileSync("./chapter1/data/plays.json").toString("utf-8")
);

console.log(statement(invoice, plays));
