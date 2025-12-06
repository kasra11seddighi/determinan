// ساخت ورودی‌ها بر اساس اندازه ماتریس
document.getElementById("generate").addEventListener("click", () => {
  const size = Number(document.getElementById("matrixSize").value);
  const container = document.getElementById("matrixInputs");

  container.innerHTML = ""; // پاک کردن قبلی

  for (let i = 1; i <= size; i++) {
    const rowDiv = document.createElement("div"); // هر ردیف یک div
    rowDiv.className = "matrix-row"; 

    for (let j = 1; j <= size; j++) {
      const input = document.createElement("input");
      input.type = "number";
      input.className = "matrix-input";
      input.placeholder = `${i}${j}`;
      input.id = `cell-${i}-${j}`;
      rowDiv.appendChild(input);
    }

    container.appendChild(rowDiv);
  }
});

// تابع بازگشتی برای دترمینان
function determinant(matrix) {
  const n = matrix.length;
  if (n === 1) return matrix[0][0];
  if (n === 2)
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

  let det = 0;
  for (let col = 0; col < n; col++) {
    const subMatrix = matrix.slice(1).map(row => row.filter((_, j) => j !== col));
    det += ((col % 2 === 0 ? 1 : -1) * matrix[0][col] * determinant(subMatrix));
  }
  return det;
}

// گرفتن مقادیر و محاسبه
document.getElementById("calcBtn").addEventListener("click", () => {
  const size = Number(document.getElementById("matrixSize").value);
  const matrix = [];

  for (let i = 1; i <= size; i++) {
    const row = [];
    for (let j = 1; j <= size; j++) {
      const val = Number(document.getElementById(`cell-${i}-${j}`).value);
      row.push(val);
    }
    matrix.push(row);
  }

  const det = determinant(matrix);
  document.getElementById("result").innerText = `نتیجه: ${det}`;
});
