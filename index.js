document.addEventListener("DOMContentLoaded", function () {
  const containerDiv = document.getElementById("container");
  const squareNumberBtn = document.getElementById("square-number");
  const colorPicker = document.getElementById("color-picker");
  const randomColorBtn = document.getElementById('random-color');
  const clearBtn = document.getElementById("clear-btn");
  let randomColor;

  function clear() {
    const column = document.querySelectorAll(".column");
    column.forEach((box) => {
      box.painted = false;
      box.style.backgroundColor = "";
      paint(colorPicker.value);
      paint(randomColor)
    });
  }
   clearBtn.addEventListener("click", clear);

  randomColorBtn.addEventListener('click',() => {
    let maxVal = 0xFFFFFF;
    let randomNum = Math.floor(Math.random() * maxVal).toString(16);
    let padColor = randomNum.padStart(6, '0');
   randomColor = `#${padColor.toUpperCase()}`;
    paint(randomColor);
  })

  squareNumberBtn.addEventListener("click", () => {
    let gridSquare = prompt("enter a number between 2 and 100");
    createGrid(gridSquare);
  });

  function updateSqrNumBtn(sqr) {
    squareNumberBtn.textContent = `${sqr} X ${sqr}`;
  }

  function createGrid(number) {
    while (containerDiv.firstChild) {
      containerDiv.removeChild(containerDiv.firstChild);
    }
    if (
      number < 1 ||
      number > 100 ||
      number == undefined ||
      number == "" ||
      number.match(/[a-zA-Z]/)
    ) {
      for (let i = 0; i < 10; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        containerDiv.appendChild(row);
        for (let k = 0; k < 10; k++) {
          let column = document.createElement("div");
          column.classList.add("column");
          row.appendChild(column);
        }
      }
      sqr = 10;
    } else {
      for (let i = 0; i < number; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        containerDiv.appendChild(row);
        for (let k = 0; k < number; k++) {
          let column = document.createElement("div");
          column.classList.add("column");
          row.appendChild(column);
        }
      }
      sqr = number;
    }
    updateSqrNumBtn(sqr);
    paint(colorPicker.value);
  }
  createGrid();

  function paint(color) {
    const column = document.querySelectorAll(".column");
    column.forEach((box) => {
      if (!box.painted) {
        box.addEventListener("mouseover", () => {
          box.style.backgroundColor = color ? color : "black";
          box.painted = true;
        });
      }
    });
  }

  colorPicker.addEventListener("input", () => {
    paint(colorPicker.value);
  });

  
});
 