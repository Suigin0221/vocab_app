let words = [];
let currentWord = null;

fetch("data_words.json")
  .then(res => res.json())
  .then(data => {
    words = data;
    nextWord();
  });

function nextWord() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  document.getElementById("word").textContent = currentWord.headword;
  document.getElementById("answer").value = "";
  document.getElementById("result").textContent = "";
}

function submitAnswer() {
  const input = document.getElementById("answer").value.trim();
  if (!input) return;

  const inputs = input.split(/[／,、;]/).map(s => s.trim());
  let correct = false;
  let details = [];

  for (const ans of inputs) {
    let ok = false;
    for (const sense of currentWord.senses) {
      if (sense.meanings.includes(ans)) {
        ok = true;
        correct = true;
      }
    }
    details.push(`${ans}：${ok ? "○" : "×"}`);
  }

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML =
    (correct
      ? `<div class="correct">正解（1点）</div>`
      : `<div class="wrong">不正解（0点）</div>`)
    + "<div>" + details.join("<br>") + "</div>";

  setTimeout(nextWord, 2000);
}

document.getElementById("answer")
  .addEventListener("keydown", e => {
    if (e.key === "Enter") submitAnswer();
  });
