
// 配列を生成
let array = [];
for (let i = 0; i < 20; i++) {
  array.push(Math.floor(Math.random() * 75) + 1);
}

// 配列をグラフィカルに表示
const bars = document.getElementById("bars");
for (let i = 0; i < array.length; i++) {
  const bar = document.createElement("div");
  bar.className = "bar";
  bar.style.height = array[i] + "px";
  bars.appendChild(bar);
}

// バブルソートアルゴリズムを実装
async function bubbleSort() {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      const bars = document.querySelectorAll(".bar");
      bars[j].classList.add("selected"); // 現在の要素に色を付ける
      bars[j + 1].classList.add("selected"); // 次の要素に色を付ける
      await sleep(100); // 100ミリ秒待機
      bars[j].classList.remove("selected"); // 現在の要素の色を戻す
      bars[j + 1].classList.remove("selected"); // 次の要素の色を戻す
      if (array[j] > array[j + 1]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        updateBars();
      }
    }
  }
}

// クイックソートアルゴリズムを実装
async function quickSort() {
  await quickSortHelper(array, 0, array.length - 1);
}

async function quickSortHelper(array, low, high) {
  if (low < high) {
    const pivotIndex = await partition(array, low, high);
    await quickSortHelper(array, low, pivotIndex - 1);
    await quickSortHelper(array, pivotIndex + 1, high);
  }
}

async function partition(array, low, high) {
  const pivot = array[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    const bars = document.querySelectorAll(".bar");
    bars[j].classList.add("selected"); // 現在の要素に色を付ける
    await sleep(100); // 100ミリ秒待機
    bars[j].classList.remove("selected"); // 現在の要素の色を戻す
    if (array[j] < pivot) {
      i++;
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      updateBars();
    }
  }
  const temp = array[i + 1];
  array[i + 1] = array[high];
  array[high] = temp;
  updateBars();
  return i + 1;
}

// 挿入ソートアルゴリズムを実装
async function insertionSort() {
  for (let i = 1; i < array.length; i++) {
    const key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      const bars = document.querySelectorAll(".bar");
      bars[j].classList.add("selected"); // 現在の要素に色を付ける
      bars[j + 1].classList.add("selected"); // 次の要素に色を付ける
      await sleep(100); // 100ミリ秒待機
      bars[j].classList.remove("selected"); // 現在の要素の色を戻す
      bars[j + 1].classList.remove("selected"); // 次の要素の色を戻す
      array[j + 1] = array[j];
      j--;
      updateBars();
    }
    array[j + 1] = key;
    updateBars();
  }
}

// マージソートアルゴリズムを実装
async function mergeSort() {
  await mergeSortHelper(array, 0, array.length - 1);
}

async function mergeSortHelper(array, left, right) {
  if (left < right) {
    const middle = Math.floor((left + right) / 2);
    await mergeSortHelper(array, left, middle);
    await mergeSortHelper(array, middle + 1, right);
    await merge(array, left, middle, right);
  }
}

async function merge(array, left, middle, right) {
  const leftArray = array.slice(left, middle + 1);
  const rightArray = array.slice(middle + 1, right + 1);
  let i = 0;
  let j = 0;
  let k = left;
  while (i < leftArray.length && j < rightArray.length) {
    const bars = document.querySelectorAll(".bar");
    bars[left + i].classList.add("selected"); // 左側の要素に色を付ける
    bars[middle + 1 + j].classList.add("selected"); // 右側の要素に色を付ける
    await sleep(100); // 100ミリ秒待機
    bars[left + i].classList.remove("selected"); // 左側の要素の色を戻す
    bars[middle + 1 + j].classList.remove("selected"); // 右側の要素の色を戻す
    if (leftArray[i] <= rightArray[j]) {
      array[k] = leftArray[i];
      i++;
    } else {
      array[k] = rightArray[j];
      j++;
    }
    k++;
    updateBars();
  }
  while (i < leftArray.length) {
    array[k] = leftArray[i];
    i++;
    k++;
    updateBars();
  }
  while (j < rightArray.length) {
    array[k] = rightArray[j];
    j++;
    k++;
    updateBars();
  }
}

// 配列をランダムに初期化
function shuffle() {
  array = [];
  for (let i = 0; i < 20; i++) {
    array.push(Math.floor(Math.random() * 75) + 1);
  }
  updateBars();
}

// 配列をグラフィカルに更新
function updateBars() {
  const bars = document.getElementById("bars");
  while (bars.firstChild) {
    bars.removeChild(bars.firstChild);
  }
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = array[i] + "px";
    bars.appendChild(bar);
  }
}

// 指定した時間待機する関数
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 配列をランダムにソートする関数
async function sort() {
let sortFunctions = [bubbleSort, quickSort, insertionSort, mergeSort];
let randomIndex = Math.floor(Math.random() * sortFunctions.length);
let sortFunction = sortFunctions[randomIndex];
await sortFunction();
let result = document.getElementById("result");
algorithmName = "";
if (sortFunction === bubbleSort) {
    algorithmName = "Bubble Sort";
} else if (sortFunction === quickSort) {
    algorithmName = "Quick Sort";
} else if (sortFunction === insertionSort) {
    algorithmName = "Insertion Sort";
} else if (sortFunction === mergeSort) {
    algorithmName = "Merge Sort";
}
result.innerHTML = "<p>この配列はどのアルゴリズムによってソートされましたか？</p>" + "<button onclick=\"checkAnswer('Bubble Sort')\">Bubble Sort</button>\n    <button onclick=\"checkAnswer('Quick Sort')\">Quick Sort</button>\n    <button onclick=\"checkAnswer('Insertion Sort')\">Insertion Sort</button>\n    <button onclick=\"checkAnswer('Merge Sort')\">Merge Sort</button>\n";
}
function checkAnswer(answer) {
    let result = document.getElementById("result");
    if (answer == algorithmName) {
        result.innerHTML = "正解！";
    } else {
        result.innerHTML = "不正解！この配列は" + algorithmName + "でソートされました。";
    }
}
