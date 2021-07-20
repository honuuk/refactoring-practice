/**
 * 연극 장르를 추가하고 장르마다 공연료와 적립 포인트 계산법을 다르게 지정하도록 할 수 있게 하기위해
 * class를 이용하여 조건부 로직을 다형성으로 바꾼다.
 *
 * PerformanceCalculator 클래스에서 amount와 volumeCredit을 계산하도록 하고
 * TragedyCalculator, ComedyCalculator 서브클래스가 PerformanceCalculator 클래스를 상속받도록 한다.
 * 그리고 서브클래스에서 각각의 amount, volumeCredit을 계산하도록 한다.
 */

class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  get amount() {
    throw new Error("서브클래스에서 처리하도록 설계되었습니다.");
  }

  get volumeCredit() {
    let result = 0;

    // 포인트 적립
    result += Math.max(this.performance.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트 제공
    if ("comedy" === this.play.type)
      result += Math.floor(this.performance.audience / 5);

    return result;
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000;
    if (this.performance.audience > 0) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }
}

function createPerformanceCalculator(aPerformance, aPlay) {
  switch (aPlay.type) {
    case "tragedy":
      return new TragedyCalculator(aPerformance, aPlay);
    case "comedy":
      return new ComedyCalculator(aPerformance, aPlay);
    default:
      throw new Error(`알 수 없는 장르: ${aPlay.type}`);
  }
}

export default function createStatementData(invoice, plays) {
  const result = {};
  result.customer = invoice.customer;
  result.performances = invoice.performances.map(enrichPerformance);
  result.totalAmount = totalAmount(result);
  result.totalVolumeCredits = totalVolumeCredits(result);
  return result;

  function enrichPerformance(aPerformance) {
    const calculator = createPerformanceCalculator(
      aPerformance,
      playFor(aPerformance)
    );
    const result = Object.assign({}, aPerformance);
    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredit = calculator.volumeCredit;
    return result;
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredit, 0);
  }

  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0);
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }
}
