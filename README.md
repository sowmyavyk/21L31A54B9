Sure, here is a README file for your project:

```markdown
# Project Overview

This repository contains solutions to two tasks: `Average Calculator` and `Companies Product Fetcher`. Both solutions are organized into their respective directories with associated code and output screenshots.

## Contents

1. [Average Calculator](#average-calculator)
2. [Companies Product Fetcher](#companies-product-fetcher)

---

## Average Calculator

The `Average Calculator` project calculates the average of a set of numbers fetched from an API. The implementation is provided in `server.js`.

### Files and Directories

- **Directory:** `test-server/average_calculator`
- **Code File:** `server.js`
- **Output Screenshot:** `average_calculator/output.png`

### How to Run

1. Navigate to the `average_calculator` directory:
   ```bash
   cd test-server/average_calculator
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node server.js
   ```

4. Make a POST request to fetch and calculate the average of numbers:
   ```bash
   curl -X POST http://localhost:9876/numbers/e
   ```

### Description

- The server listens on port 9876.
- It fetches numbers from an external API based on the specified type (`p`, `f`, `e`, `r`).
- The unique numbers are stored, and their average is calculated and returned in the response.

### Output

The output of this project is a screenshot (`output.png`) showing the successful response of the server.

---

## Companies Product Fetcher

The `Companies Product Fetcher` project retrieves the top products for a specific company and product category within a specified price range. The implementation is provided in `main.js`.

### Files and Directories

- **Directory:** `test-server/companies`
- **Code File:** `main.js`
- **Output Screenshot:** `companies/output.png`

### How to Run

1. Navigate to the `companies` directory:
   ```bash
   cd test-server/companies
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Execute the script to fetch products:
   ```bash
   node main.js
   ```

### Description

- The script sends a GET request to an API to fetch the top products for a specified company (`AMZ`, `FLP`, etc.) and product category (`Laptop`, `Phone`, etc.).
- The response includes details like product name, price, rating, discount, and availability.

### Output

The output of this project is a screenshot (`output.png`) showing the successful response of the script with product details.

---

## Notes

- Ensure you have Node.js and npm installed on your machine.
- The screenshots of the outputs are available in the respective directories.
- Make sure to replace any placeholder tokens or URLs with actual values if needed.

## .gitignore Configuration

The `.gitignore` file is configured to exclude the following:

- `node_modules/`
- `package-lock.json`
- `.babelrc`

---

## Contact

For any questions or issues, please contact the repository owner.

```

This README provides an overview of the project structure, how to run the code, and what the output looks like. It also includes instructions for setting up the environment and executing the scripts.
