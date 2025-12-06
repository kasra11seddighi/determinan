function createMatrix(containerId, rows, cols, prefix) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  for (let i = 1; i <= rows; i++) {
    const rowDiv = document.createElement("div");
    rowDiv.className = "matrix-row";
    for (let j = 1; j <= cols; j++) {
      const input = document.createElement("input");
      input.type = "number";
      input.className = "matrix-input";
      input.id = `${prefix}-${i}-${j}`;
      input.placeholder = `${i}${j}`;
      rowDiv.appendChild(input);
    }
    container.appendChild(rowDiv);
  }
}

// ساخت ماتریس‌ها
document.getElementById("generate").addEventListener("click", ()=>{
  const rowsA = Number(document.getElementById("rowsA").value);
  const colsA = Number(document.getElementById("colsA").value);
  const rowsB = Number(document.getElementById("rowsB").value);
  const colsB = Number(document.getElementById("colsB").value);
  createMatrix("matrixA", rowsA, colsA, "A");
  createMatrix("matrixB", rowsB, colsB, "B");
});

// گرفتن ماتریس
function getMatrix(prefix, rows, cols){
  const matrix = [];
  for(let i=1;i<=rows;i++){
    const row = [];
    for(let j=1;j<=cols;j++){
      row.push(Number(document.getElementById(`${prefix}-${i}-${j}`).value) || 0);
    }
    matrix.push(row);
  }
  return matrix;
}

// عملیات
function addMatrix(A,B){ return A.map((r,i)=> r.map((v,j)=> v+B[i][j])); }
function subMatrix(A,B){ return A.map((r,i)=> r.map((v,j)=> v-B[i][j])); }
function mulMatrix(A,B){
  const rowsA = A.length, colsA = A[0].length;
  const rowsB = B.length, colsB = B[0].length;
  if(colsA !== rowsB) return null;
  const res = Array.from({length:rowsA},()=> Array(colsB).fill(0));
  for(let i=0;i<rowsA;i++)
    for(let j=0;j<colsB;j++)
      for(let k=0;k<colsA;k++)
        res[i][j]+=A[i][k]*B[k][j];
  return res;
}
function determinant(matrix){
  const n = matrix.length;
  if(!matrix.every(r=> r.length===n)) return null;
  if(n===1) return matrix[0][0];
  if(n===2) return matrix[0][0]*matrix[1][1]-matrix[0][1]*matrix[1][0];
  let det=0;
  for(let col=0;col<n;col++){
    const sub = matrix.slice(1).map(r=> r.filter((_,j)=> j!==col));
    det += ((col%2===0?1:-1)*matrix[0][col]*determinant(sub));
  }
  return det;
}

// نمایش نتیجه به صورت ماتریس
function displayMatrix(containerId, matrix){
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  if(matrix===null){
    container.innerText="عملیات غیرمجاز";
    return;
  }
  if(!Array.isArray(matrix)){
    container.innerText=matrix;
    return;
  }
  matrix.forEach(row=>{
    const rowDiv = document.createElement("div");
    rowDiv.className="matrix-row";
    row.forEach(val=>{
      const cell = document.createElement("div");
      cell.className="matrix-input result-cell";
      cell.innerText=val;
      rowDiv.appendChild(cell);
    });
    container.appendChild(rowDiv);
  });
}

// دکمه‌ها
document.getElementById("addBtn").addEventListener("click", ()=>{
  const rowsA = Number(document.getElementById("rowsA").value);
  const colsA = Number(document.getElementById("colsA").value);
  const rowsB = Number(document.getElementById("rowsB").value);
  const colsB = Number(document.getElementById("colsB").value);
  if(rowsA!==rowsB || colsA!==colsB){
    displayMatrix("result", null);
    return;
  }
  const A=getMatrix("A",rowsA,colsA);
  const B=getMatrix("B",rowsB,colsB);
  displayMatrix("result", addMatrix(A,B));
});

document.getElementById("subBtn").addEventListener("click", ()=>{
  const rowsA = Number(document.getElementById("rowsA").value);
  const colsA = Number(document.getElementById("colsA").value);
  const rowsB = Number(document.getElementById("rowsB").value);
  const colsB = Number(document.getElementById("colsB").value);
  if(rowsA!==rowsB || colsA!==colsB){
    displayMatrix("result", null);
    return;
  }
  const A=getMatrix("A",rowsA,colsA);
  const B=getMatrix("B",rowsB,colsB);
  displayMatrix("result", subMatrix(A,B));
});

document.getElementById("mulBtn").addEventListener("click", ()=>{
  const rowsA = Number(document.getElementById("rowsA").value);
  const colsA = Number(document.getElementById("colsA").value);
  const rowsB = Number(document.getElementById("rowsB").value);
  const colsB = Number(document.getElementById("colsB").value);
  if(colsA!==rowsB){
    displayMatrix("result", null);
    return;
  }
  const A=getMatrix("A",rowsA,colsA);
  const B=getMatrix("B",rowsB,colsB);
  displayMatrix("result", mulMatrix(A,B));
});

document.getElementById("detBtn").addEventListener("click", ()=>{
  const rowsA = Number(document.getElementById("rowsA").value);
  const colsA = Number(document.getElementById("colsA").value);
  if(rowsA!==colsA){
    displayMatrix("result", null);
    return;
  }
  const A=getMatrix("A",rowsA,colsA);
  displayMatrix("result", determinant(A));
});
