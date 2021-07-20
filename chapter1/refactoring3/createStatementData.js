class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  get amount() {
    let result = 0;

    switch (this.play.type) {
      case "tragedy": // 비극
        result = 40000;
        if (this.performance.audience > 30) {
          result += 1000 * (this.performance.audience - 30);
        }
        break;

      case "comedy": // 희극
        result = 30000;
        if (this.performance.audience > 20) {
          result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        break;

      default:
        throw new Error(`알 수 없는 장르: ${this.play.type}`);
    }

    return result;
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

export default function createStatementData(invoice, plays) {
  const result = {};
  result.customer = invoice.customer;
  result.performances = invoice.performances.map(enrichPerformance);
  result.totalAmount = totalAmount(result);
  result.totalVolumeCredits = totalVolumeCredits(result);
  return result;

  function enrichPerformance(aPerformance) {
    const calculator = new PerformanceCalculator(
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
