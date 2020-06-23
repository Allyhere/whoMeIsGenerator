const toggleTheme = document.getElementById("switch");
const body = document.body;
const cleanImages = document.getElementById("clean");
const imageList = document.querySelectorAll(".card__image");
const inputList = document.querySelectorAll("input.card__input");
const printEv = document.getElementById("download");
const modal = document.getElementById("modal");
const cardCancel = document.querySelectorAll(".card__cancel");
let background;

/**
 * Change page theme (light and dark)
 */

toggleTheme.addEventListener("click", function (ev) {
  this.firstElementChild.checked
    ? (body.classList.remove("style--main"), 
       body.classList.add("style--night"),
       background = "#3f3f3f")
    : (body.classList.add("style--main"),
      body.classList.remove("style--night"),
      background = "#ffffff");
});

/**
 * Clean card image
 */

cardCancel.forEach((el) =>
  el.addEventListener("click", (evt) => {
    evt.preventDefault();
    let image = evt.target.nextElementSibling;
    let info = evt.target.nextElementSibling.nextElementSibling;
    info.style.display = "flex";
    image.style.zIndex = 0;
    image.style.background = "";
    el.classList.remove("card__cancel--active");
  })
);

/**
 * Clean all images src's
 */

cleanImages.addEventListener("click", (ev) => {
  ev.preventDefault();
  limparImagens();
});

/**
 * Input an image in the respective image tag
 */
inputList.forEach((el) =>
  el.addEventListener("change", (evt) => {
    let tgt = evt.target || window.event.srcElement,
      files = tgt.files;

    if (FileReader && files && files.length) {
      try {
        let fr = new FileReader();
        fr.onload = function () {
          let cancel =
            evt.target.parentNode.previousElementSibling.previousElementSibling;
          let image = evt.target.parentNode.previousElementSibling;
          let info = evt.target.parentNode;
          console.log(info)
          info.style.display = "none";
          image.src = fr.result;
          image.style.background = "transparent";
          image.style.zIndex = 1;
          cancel.classList.add("card__cancel--active");
        };
        fr.readAsDataURL(files[0]);
      } catch (err) {
        console.log(err, "erro");
      }
    }
  })
);

/**
 * Print image from HTML
 */

printEv.addEventListener("click", (ev) => {
  ev.preventDefault();
  generateImage();
});

function generateImage() {
    cardCancel.forEach(el => el.classList.remove("card__cancel--active"))
  html2canvas(document.getElementById("print"), {
    allowtaint: "true",
    windowWidth: 1079,
    x: 0,
    backgroundColor: background,
  }).then((canvas) => {
    let image = canvas.toDataURL("image/png");
    var a = document.createElement("a"); //Create <a>
    a.href = `data:image/png;base64${image}`; //Image Base64 Goes here
    a.download = "Image.png"; //File name Here
    a.click(); //Downloaded file
  });
}

function limparImagens() {
  imageList.forEach((el) => {
    el.style.zIndex = 0;
    el.style.background = "";
    el.nextElementSibling.style.display = "flex";
  });
}
