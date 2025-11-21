# Assignment_Submission
This project decodes base-encoded points from a JSON file and uses Lagrange interpolation with BigInt arithmetic to compute the constant term of the polynomial.
## Overview

This project computes the **constant term (C)** of a polynomial that passes through **k decoded points**.  
The coordinates of these points are provided through a JSON file where each **y-value is encoded in a different base**.

The steps performed by the program:

1. **Read** `input.json` dynamically.
2. **Decode** each encoded y-value using its base.
3. **Select the first k points** based on numeric key order.
4. **Construct a polynomial of degree (k − 1)** using  
   **Lagrange Interpolation**.
5. **Compute only the constant term** of the polynomial:
   \\( C = f(0) \\)
6. **Print only the final value of C**  
   (either an integer or simplified fraction).

---

## 📂 Input Format (`input.json`)

The JSON file must follow this structure:

```json
{
  "keys": {
    "n": 10,
    "k": 7
  },
  "1": { "base": "6", "value": "13444211440455345511" },
  "2": { "base": "15", "value": "aed7015a346d635" },
  "3": { "base": "15", "value": "6aeeb69631c227c" },
  "4": { "base": "16", "value": "e1b5e05623d881f" },
  "5": { "base": "8", "value": "316034514573652620673" },
  "6": { "base": "3", "value": "2122212201122002221120200210011020220200" },
  "7": { "base": "3", "value": "20120221122211000100210021102001201112121" },
  "8": { "base": "6", "value": "20220554335330240002224253" },
  "9": { "base": "12", "value": "45153788322a1255483" },
  "10": { "base": "7", "value": "1101613130313526312514143" }
}
```

### What Each Field Means

- **n** → Total number of points provided
- **k** → Number of points required to construct the polynomial
- **Each numeric key ("1", "2", "3", …)**
  - `x` = key number
  - `y` = decoded value of `"value"` in `"base"`

---

## 🔢 Decoding Logic

Each `"value"` is **not stored in decimal**.

Example:

```
"base": "6"
"value": "13444211440455345511"
```

To decode:

- Read each character
- Convert it according to that base
- Accumulate using **BigInt**

This ensures large values are handled accurately.

---

## Mathematical Method Used

### Lagrange Interpolation


<img width="635" height="481" alt="Formula" src="https://github.com/user-attachments/assets/3ef07ac2-81eb-4239-be3b-a8e3c50033be" />

### ✔ Exact Rational Arithmetic

The program uses:

- BigInt numerators
- BigBigInt denominators
- Fraction simplification
- No floating-point operations

This guarantees **perfect accuracy**, even with massive numbers.

---

## How to Run

### 1. Install Node.js

(Version 14 or above recommended)

### 2. Place the files in the same directory:

```
main.js
input.json
README.md
```

### 3. Run the program:

```bash
node main.js
```

### 4. Output

- If C is an integer, prints:

```
123456789012345
```

- If C is fractional, prints simplified result:

```
numerator/denominator
```

---

## Files in This Project

### **main.js**

- Reads the JSON input
- Converts encoded values to BigInt
- Selects first k points
- Computes constant term using Lagrange interpolation
- Outputs only the constant term

### **input.json**

Contains encoded points including bases and values.

---
