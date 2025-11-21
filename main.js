const fs = require("fs");
function decodeValue(value, baseStr) {
  const base = BigInt(baseStr);
  let result = 0n;
  for (let i = 0; i < value.length; i++) {
    const char = value[i].toLowerCase();
    let digitValue;
    if (char >= "0" && char <= "9") {
      digitValue = BigInt(char.charCodeAt(0) - "0".charCodeAt(0));
    } else if (char >= "a" && char <= "z") {
      digitValue = BigInt(char.charCodeAt(0) - "a".charCodeAt(0) + 10);
    } else {
      throw new Error(`Invalid character '${char}' in value`);
    }
    result = result * base + digitValue;
  }
  return result;
}
function gcd(a, b) {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b !== 0n) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}
class Rational {
  constructor(numerator, denominator = 1n) {
    if (denominator === 0n) throw new Error("Denominator cannot be zero");
    this.num = BigInt(numerator);
    this.den = BigInt(denominator);
    this.simplify();
  }
  simplify() {
    const g = gcd(this.num, this.den);
    this.num /= g;
    this.den /= g;
    if (this.den < 0n) {
      this.num = -this.num;
      this.den = -this.den;
    }
  }
  add(other) {
    const num = this.num * other.den + other.num * this.den;
    const den = this.den * other.den;
    return new Rational(num, den);
  }
  multiply(other) {
    const num = this.num * other.num;
    const den = this.den * other.den;
    return new Rational(num, den);
  }
  toString() {
    if (this.den === 1n) return this.num.toString();
    return `${this.num}/${this.den}`;
  }
}
function lagrangeConstantTerm(points) {
  let result = new Rational(0n, 1n);
  for (let i = 0; i < points.length; i++) {
    const xi = BigInt(points[i].x);
    const yi = points[i].y;
    let numerator = 1n;
    let denominator = 1n;

    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        const xj = BigInt(points[j].x);
        numerator *= 0n - xj;
        denominator *= xi - xj;
      }
    }
    const term = new Rational(yi * numerator, denominator);
    result = result.add(term);
  }
  return result;
}
function main() {
  try {
    const data = JSON.parse(fs.readFileSync("input1.json", "utf8"));
    const k = data.keys.k;
    const points = [];

    const numericKeys = Object.keys(data)
      .filter((key) => key !== "keys" && !isNaN(key))
      .map((key) => parseInt(key))
      .sort((a, b) => a - b);
    for (let i = 0; i < k; i++) {
      const key = numericKeys[i];
      const point = data[key.toString()];
      const x = key;
      const y = decodeValue(point.value, point.base);
      points.push({ x, y });
    }
    const constantTerm = lagrangeConstantTerm(points);
    console.log(constantTerm.toString());
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}
main();