function downloadPDF() {
  const element = document.getElementById('cv-page');

  html2pdf(element, {
    margin: 0,
    filename: 'cv.pdf',
    html2canvas: {
      scale: 1,
      scrollX: 0,
      scrollY: 0
    },
    jsPDF: {
      unit: 'px',
      format: [794, 1123],
      orientation: 'portrait'
    }
  });
}

function toedit() {
  let cool = document.querySelectorAll(".editable");
  cool.forEach(el => {
    el.setAttribute('contenteditable', 'true')
    document.querySelector(".toolbar").style.display = "flex"
  });
}

document.addEventListener("focusin", (e) => {
  if (e.target.classList.contains("editable")) {
    const box = e.target.closest(".add-new-topic")?.querySelector(".visibility");
    if (box) box.style.display = "block";
  }
});

// document.addEventListener("focusout", (e) => {
//   if (e.target.classList.contains("editable")) {
//     const box = e.target.closest(".add-new-topic")?.querySelector(".visibility");
//     if (box) box.style.display = "none";
//   }
// });

const html_to_append = `<div class="html-append">
                            <div class="topic">
                                <div>
                                    <span class="font2 editable">Enter your topic</span>
                                    <button class="removebutton button" onclick="remove(this)">remove topic</button>
                                </div>
                                <span class="font2  editable">date e.g Jun 2022 - Jul2022</span>
                            </div>
                            <div class="relative">
                                <ul class="lists">
                                    <li class="editable">Enter the points</li>
                                    <li class="editable">describe the topic</li>
                                    <li class="editable"> do so just by tapping on it </li>
                                </ul>
                            </div>
                        </div>`;

function addtopic(btn) {
  console.log('step1');
  const targetis = btn.closest(".add-new-topic").querySelectorAll(".html-append")
  targetis[targetis.length-1].insertAdjacentHTML("afterend", html_to_append)
  toedit();
}

function format(cmd) {
  document.execCommand(cmd, false, null);
}

function addLink() {
  const selection = window.getSelection().toString();
  if (!selection) {
    alert("Select the redirectng word to attach link, e.g write 'here' => select it and click on add link")
    return
  }
  const url = prompt("Enter link URL");
  if (!url) return;
  document.execCommand("createLink", false, url);

  const link = selection.anchorNode?.parentElement;

  if (link && link.tagName === "A") {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  }
}


document.addEventListener("keydown", (e) => {
  const li = e.target;

  if (!li.matches("li.editable")) return;

  // ---------- ENTER ----------
  if (e.key === "Enter") {
    e.preventDefault();

    const newLi = document.createElement("li");
    newLi.className = "editable font3";
    newLi.contentEditable = "true";
    newLi.innerHTML = "";

    li.after(newLi);
    newLi.focus();
  }


  // ---------- BACKSPACE ----------
  if (e.key === "Backspace") {
    const list = li.parentElement;

    if (
      li.textContent.trim() === "" &&
      list.querySelectorAll("li.editable").length > 1
    ) {
      e.preventDefault();

      const prev = li.previousElementSibling;

      li.remove();

      if (prev) {
        prev.focus();
        placeCaretAtEnd(prev);
      }
    }
  }
});


function placeCaretAtEnd(el) {
  const range = document.createRange();
  const sel = window.getSelection();

  range.selectNodeContents(el);
  range.collapse(false);

  sel.removeAllRanges();
  sel.addRange(range);
}

function remove(btn) {
  const toremove = btn.closest(".html-append")
  let parent = toremove.parentElement
  if(parent.querySelectorAll("div.html-append").length>1) 
    toremove.remove()
}

function saveCheckpoint() {
  const content = document.querySelector(".page")

  localStorage.setItem("saveCheckpoint", content.innerHTML);
}

function restoreCheckpoint(){
  const saved = localStorage.getItem('saveCheckpoint')
  const restore = document.querySelector('.page')
  restore.innerHTML = saved
}




// function downloadPDF() {
//   const element = document.getElementById('cv-page');

// html2pdf().set({
//   html2canvas: {
//     scale: 2,
//     useCORS: true
//   },
//   jsPDF: {
//     unit: 'mm',
//     format: 'a4'
//   }
// }).from(element).save();
// }


//

function downloadHighPDF() {
  window.print();
}



// const puppeteer = require("puppeteer");

// async function downloadPDF() {
//   const browser = await puppeteer.launch({
//     headless: "new"
//   });

//   const page = await browser.newPage();

//   await page.goto("http://localhost:3000/cv", {
//     waitUntil: "networkidle0"
//   });

//   await page.pdf({
//     path: "cv.pdf",
//     format: "A4",
//     printBackground: true,
//     preferCSSPageSize: true
//   });

//   await browser.close();
// }



// window.addEventListener('DOMContentLoaded', () => {
//     document.designMode="on";
// });