document.addEventListener("DOMContentLoaded", function () {
  const containerDiv = document.getElementById("container");
  const squareNumberBtn = document.getElementById("square-number");
  const colorPicker = document.getElementById("color-picker");
  const randomColorBtn = document.getElementById('random-color');
  const clearBtn = document.getElementById("clear-btn");
  let currentColor = colorPicker.value;

  function createGrid(number) {
    while (containerDiv.firstChild) {
      containerDiv.removeChild(containerDiv.firstChild);
    }

    let sqr;
    if (
      number < 2 ||
      number > 100 ||
      number == undefined ||
      number == "" ||
      String(number).match(/[^0-9]/)
    ) {
      sqr = 10;
    } else {
      sqr = number;
      } 
      for (let i = 0; i < sqr; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        containerDiv.appendChild(row);
        for (let k = 0; k < sqr; k++) {
          let column = document.createElement("div");
          column.classList.add("column");
          row.appendChild(column);
        }
    }
    attachPaintListeners();
    updateSqrNumBtn(sqr);
  }
  
  function updateSqrNumBtn(sqr) {
    squareNumberBtn.textContent = `${sqr} X ${sqr}`;
  }

  function attachPaintListeners() {
    const column = document.querySelectorAll(".column");
    column.forEach((box) => {
      const paintBox = function () {
        if (!box.painted) {
          box.style.backgroundColor = currentColor;
          box.painted = true;
        }
      };
      box.addEventListener("mouseover", paintBox);
    });
  }

  function clear() {
    const column = document.querySelectorAll(".column");
    column.forEach((box) => {
        box.painted = false;
        box.style.backgroundColor = "";
    });
  }

  squareNumberBtn.addEventListener("click", () => {
    let gridSquare = prompt("enter a number between 2 and 100");
    createGrid(gridSquare);
  });

  colorPicker.addEventListener("input", () => {
    currentColor = colorPicker.value;
  });

  randomColorBtn.addEventListener('click',() => {
    let maxVal = 0xFFFFFF;
    let randomNum = Math.floor(Math.random() * maxVal).toString(16);
    let padColor = randomNum.padStart(6, '0');
    currentColor = `#${padColor.toUpperCase()}`;
    randomColorBtn.style.backgroundColor = currentColor;
  });

  clearBtn.addEventListener("click", clear);
   

  console.log(createGrid(10));
});
  