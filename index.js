document.addEventListener("DOMContentLoaded", function () {
  const containerDiv = document.getElementById("container");
  const squareNumberBtn = document.getElementById("square-number");
  const colorPicker = document.getElementById("color-picker");
  const randomColorBtn = document.getElementById("random-color");
  const rainbowBtn = document.getElementById("rainbow-btn");
  const eraserBtn = document.getElementById("eraser-btn");
  const clearBtn = document.getElementById("clear-btn");
  let mouseDown = false;
  document.addEventListener("mousedown", () => {mouseDown = true});
  document.addEventListener("mouseup", () => {mouseDown = false});

  let currentColor = colorPicker.value;
  let mode = "normal";

  function createGrid(number) {
    //clears the existing grid to then reate a new one
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
      sqr = 16;
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
    attachPaintListeners();;
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
      
          box.addEventListener("mouseover", () => {
            if (!mouseDown) return;
            
            switch (mode) {
              case "normal":
              case "random":
                paintBox()
                break;
              case "rainbow":
                currentColor = getRandomColor(); // updates currentColor for each box before painting
                rainbowBtn.style.backgroundColor = currentColor;
                paintBox()
                break;
              case "eraser":
                if (box.painted) {
                  box.style.backgroundColor = "";
                  box.painted = false;
                }
                break;
            }
          });

    });
  }

  function clear() {
    const column = document.querySelectorAll(".column");
    column.forEach((box) => {
        box.painted = false;
        box.style.backgroundColor = "";
    });
  }

  eraserBtn.addEventListener("click", () => {
    mode = "eraser"
  })

  squareNumberBtn.addEventListener("click", () => {
    let gridSquare = prompt("enter a number between 2 and 100");
    createGrid(gridSquare);
  });

  colorPicker.addEventListener("input", () => {
    mode = "normal";
    currentColor = colorPicker.value;
  });

  function getRandomColor() {
    let maxVal = 0xFFFFFF;
    let randomNum = Math.floor(Math.random() * maxVal).toString(16);
    let padColor = randomNum.padStart(6, '0');
      return `#${padColor.toUpperCase()}`;
  }

  randomColorBtn.addEventListener("click", () => {
    mode = "random";
    currentColor = getRandomColor();
    randomColorBtn.style.backgroundColor = currentColor;
  });

  rainbowBtn.addEventListener("click", () => {
    mode = "rainbow";
    currentColor = getRandomColor();
  });

  clearBtn.addEventListener("click", clear);
   

 createGrid(16);
});
  