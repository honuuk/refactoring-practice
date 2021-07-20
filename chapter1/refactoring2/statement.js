/**
 * statement 함수에서 결과를 text가 아닌 html로 출력해야 한다고 가정해보자.
 * 리팩터링을 통해 statement 함수의 본문 코드를 줄였기 때문에 html로 변환하는 본문 코드만 작성하면 된다.
 * 하지만 데이터를 만드는 함수들이 중첩함수로 들어있기 때문에 html 버전을 만들기 위해서 중첩함수들도 다같이 복사해야한다.
 *
 * 이 문제를 해결하기 위해 statement 함수를 데이터를 만드는 부분과 결과를 출력하는 부분으로 나눈다.
 * 분리한 renderPlainText 함수에 데이터 객체를 전달하도록 변경한다.
 *
 * 반복문을 파이프라인으로 변경하고 데이터 객체를 생성하는 부분을 함수로 분리한다.
 *
 * 데이터 객체를 생성하는 createStatementData 함수와 관련 함수들을 별도 파일로 분리한다.
 */

import * as fs from "fs";
import createStatementData from "./createStatementData.js";

function usd(aNumber) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}

function statement(invoice, plays) {
  return renderHtml(createStatementData(invoice, plays));
}

function renderPlainText(data) {
  let result = `청구 내역 (고객명: ${data.customer})\n`;

  for (let perf of data.performances) {
    // 청구내역 출력
    result += `  ${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
  }

  // 청구내역 출력
  result += `총액: ${usd(data.totalAmount)}\n`;
  result += `적립 포인트: ${data.totalVolumeCredits}점\n`;
  return result;
}

function renderHtml(data) {
  let result = `<h1>청구 내역 (고객명: ${data.customer}</h1>\n`;
  result += "<table>\n";
  result += "<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>";
  for (let perf of data.performances) {
    result += `  <tr><td>${perf.play.name}</td><td>(${perf.audience}석)</td>`;
    result += `<td>${usd(perf.amount)}</td></tr>`;
  }
  result += "</table>\n";
  result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>적립 포인트: <em>${usd(data.totalVolumeCredits)}</em>점</p>\n`;
  return result;
}

const invoice = JSON.parse(
  fs.readFileSync("./chapter1/data/invoice.json").toString("utf-8")
);
const plays = JSON.parse(
  fs.readFileSync("./chapter1/data/plays.json").toString("utf-8")
);

console.log(statement(invoice, plays));
