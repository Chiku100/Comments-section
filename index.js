var dataGlobal;
const getData = async () => {
  const response = await fetch("./data.json");
  const data = await response.json();
  dataGlobal = data;
  return data;
};
(async () => {
  await getData();
  let comments = dataGlobal.comments;
  localStorage.setItem("data1", `${JSON.stringify(comments)}`)
  let subComments = dataGlobal.comments[1].replies;
  let data1 = JSON.parse(localStorage.getItem("data1"));
  console.log(data1);
  localStorage.setItem("data2", `${JSON.stringify(subComments)}`)
  let data2 = JSON.parse(localStorage.getItem("data2"))
  console.log(data1);
  populate(data1, ".maincontent");
  populate(data2, ".psuedo ");
  document.querySelector("#inputs").innerHTML = `<img src=${dataGlobal.currentUser.image.png}></img>
    <input type="text" placeholder="Add a comment...">
    <button class="send" type="submit">SEND</button>`;
  function populate(x, y) {

    var createContent = x.map((cont) => {
      if (cont.user.username !== "juliusomo") {
        return `<div class=container${cont.id}> <section >
          <div class="buttons">
            <button class="plusbuttons" type="button">+</button>
            <b class=${cont.user.username}>${cont.score}</b>
            <button class="minusbuttons" type="button">-</button>
          </div>
          <article>
            <div class="outerbox">
              <div class="innerbox">
                <img src="${cont.user.image.png}" alt="">
                <span>${cont.user.username}</span>
                <small>${cont.createdAt}</small>
              </div>
              <div class="box reply">
                <img src="./images/icon-reply.svg" alt="icon-reply">
                <span>Reply</span>
              </div>
            </div>
            <p id="oop">${cont.content}</p>
          </article>
        </section> 
        </div>`
      }
      else {
        return `<div class=container${cont.id}> <section >
            <div class="buttons">
              <button class="plusbuttons" type="button">+</button>
              <b class=${cont.user.username}>${cont.score}</b>
              <button class="minusbuttons" type="button">-</button>
            </div>
            <article>
              <div class="outerbox reouter">
                <div class="innerbox ">
                  <img src="${cont.user.image.png}" alt="">
                  <span>${cont.user.username}</span>
                  <b class="you">you</b>
                  <small>${cont.createdAt}</small>
                </div>
                <div class="box remake">
                <span class="delete"><img src="./images/icon-delete.svg" alt="">Delete</span>
                <span class="edit"><img src="./images/icon-edit.svg" alt="">Edit</span>
                 </div>
              </div>
              <p id="oop">${cont.content}</p>
            </article>
          </section> 
          </div>`

      }
    })


    document.querySelector(y).innerHTML = createContent.join("");
  }
  function likeDislike() {
    let plusButtons = document.querySelectorAll(".plusbuttons");
    let minuminusButtons = document.querySelectorAll(".minusbuttons");
   
    plusButtons.forEach((a) => {
      let checkStatus = true;
      a.addEventListener("click", (e) => {
        
        if (checkStatus == true) {
          let myNum = e.currentTarget.nextElementSibling.className;
          if (myNum !== dataGlobal.currentUser.username) { document.querySelector("." + myNum).innerHTML++; }
          checkStatus=false;
          
        }
       
      })
    })
    minuminusButtons.forEach((x) => {
      let checkStatus = true;
      x.addEventListener("click", (e) => {
        if(checkStatus==true){
          let myNum = e.currentTarget.previousElementSibling.className;
          if (myNum !== dataGlobal.currentUser.username) { document.querySelector("." + myNum).innerHTML--; }
          checkStatus=false;
        }


      })
    })
  }
  likeDislike()
  let newReply = document.createElement("form");
  newReply.innerHTML = `<img src=${dataGlobal.currentUser.image.png}></img>
    <input type="text" placeholder="Add a comment...">
    <button class="send btns" type="submit">Reply</button>
    `
  newReply.id = "inputs";
  let replies = document.querySelectorAll(".box");
  replies.forEach((cont) => {
    cont.addEventListener("click", (e) => {
      document.querySelector("#inputs").style.display = "flex"
      let parent = e.currentTarget.parentElement.parentElement.parentElement.parentElement;
      let semiParent = e.currentTarget.previousElementSibling.children[1].innerHTML;
      console.log(semiParent);
      if (semiParent !== "juliusomo") {
        document.querySelector("section").style.flexDirection.parentElement = "column"
        parent.appendChild(newReply);
      }

    })
  })
  document.querySelector("button.send").addEventListener("click", (e) => {
    let parent = e.currentTarget.parentElement.parentElement.previousElementSibling;
    console.log(parent);
    let semi=e.currentTarget.parentElement.parentElement;
    console.log(semi);
    let elem = document.createElement("article");
    let val = e.currentTarget.parentElement.children[1].value;
    elem.innerHTML = `<div><section >
    <div class="buttons">
      <button class="plusbuttons" type="button">+</button>
      <b class=${dataGlobal.currentUser.username}>0</b>
      <button class="minusbuttons" type="button">-</button>
    </div>
    <article>
      <div class="outerbox">
        <div class="innerbox">
          <img src="${dataGlobal.currentUser.image.png}" alt="">
          <span>${dataGlobal.currentUser.username}</span>
          <b class="you">you</b>
          <small>0 minutes ago</small>
        </div>
        <div class="box">
       <span class="delete"><img src="./images/icon-delete.svg" alt="">Delete</span>
       <span class="edit"><img src="./images/icon-edit.svg" alt="">Edit</span>
        </div>
      </div>
      <p class="x">${val}</p>
    </article>
  </section> </div>`;
    comments.push(elem);
    console.log(comments);
    parent.appendChild(elem);
    let myDel = document.querySelectorAll(".delete");
    myDel.forEach((myD) => {
      myD.addEventListener("click", (e) => {
        let currentTarget = e.currentTarget.parentElement.parentElement.parentElement.parentElement;
        let alert = document.createElement("article");
        alert.className = "ola";
        alert.innerHTML = ` <article class="popup">
                    <h2>Delete Comment</h2>
                    <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone</p>
                    <div>
                      <button class="cancel" type="button">NO,CANCEL</button>
                      <button class="dlt" type="button">YES,DELETE</button>
                    </div>
                  </article>`;
        document.querySelector("body").appendChild(alert)
        document.querySelector(".ola").style.display = "block";
        let myBtns = document.querySelectorAll(".popup div button");
        myBtns.forEach((btn) => {
          btn.addEventListener("click", (x) => {
            if (x.currentTarget.className == "cancel") {
              document.querySelector(".ola").style.display = "none";
            } else {
              document.querySelector(".ola").style.display = "none";
              replyArray = [];
              currentTarget.remove();
            }
          })
        })
      })
    })
    console.log(myDel);
    let myEdt = document.querySelectorAll(".edit");
    myEdt.forEach((myE) => {
      myE.addEventListener("click", (e) => {
        let currentTarget = e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement;
        let nx = e.currentTarget.parentElement.parentElement.nextElementSibling.className;
        let pakka = e.currentTarget.parentElement.parentElement.nextElementSibling.className;
        console.log(pakka);
        let bx = e.currentTarget.parentElement.parentElement.parentElement.parentElement.nextSibling.nextElementSibling;
        currentTarget.appendChild(newReply);
        document.querySelector("form#inputs").style.display = "flex";
        newReply.addEventListener("click", (e) => {

          document.querySelector(`.${pakka}`).innerHTML = document.querySelector(`#${e.currentTarget.id} input`).value;
        })
      })
    })
  })
  newReply.addEventListener("submit", (e) => {
    e.preventDefault();
    let val = e.currentTarget[0].value;
    var replyArray = [];
    let unqid = e.currentTarget.parentElement.className;
    document.querySelector("#inputs").style.display = "none";


    hardData(comments);
    hardData(subComments);
    function hardData(data) {
      data.forEach((cont) => {
        if ("container" + cont.id == unqid) {
          cont.replies = replyArray;
          replyArray.push(val)
          innerPopulate(replyArray, "." + unqid);
          let myDel = document.querySelectorAll(".delete");
          let myEdt = document.querySelectorAll(".edit");
          myEdt.forEach((myE) => {
            myE.addEventListener("click", (e) => {
              let currentTarget = e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement;
              let nx = e.currentTarget.parentElement.parentElement.nextElementSibling.className;
              let pakka = e.currentTarget.parentElement.parentElement.nextElementSibling.className;
              console.log(pakka);
              let bx = e.currentTarget.parentElement.parentElement.parentElement.parentElement.nextSibling.nextElementSibling;
              console.log(bx);
              currentTarget.appendChild(newReply);
              document.querySelector("form#inputs").style.display = "flex";
              newReply.addEventListener("click", (e) => {

                document.querySelector(`.${pakka}`).innerHTML = document.querySelector(`#${e.currentTarget.id} input`).value;
              })
            })
          })
          myDel.forEach((myD) => {
            myD.addEventListener("click", (e) => {
              let currentTarget = e.currentTarget.parentElement.parentElement.parentElement.parentElement;
              let alert = document.createElement("article");
              alert.className = "ola";
              alert.innerHTML = ` <article class="popup">
                          <h2>Delete Comment</h2>
                          <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone</p>
                          <div>
                            <button class="cancel" type="button">NO,CANCEL</button>
                            <button class="dlt" type="button">YES,DELETE</button>
                          </div>
                        </article>`;
              document.querySelector("body").appendChild(alert)
              document.querySelector(".ola").style.display = "block";
              let myBtns = document.querySelectorAll(".popup div button");
              myBtns.forEach((btn) => {
                btn.addEventListener("click", (x) => {
                  if (x.currentTarget.className == "cancel") {
                    document.querySelector(".ola").style.display = "none";
                  } else {
                    document.querySelector(".ola").style.display = "none";
                    replyArray = [];
                    currentTarget.remove();
                  }
                })
              })
            })
          })
          function innerPopulate(x, y) {
            let mapThis = x.map((cont) => {
              return `<div > <section >
                      <div class="buttons">
                        <button class="plusbuttons" type="button">+</button>
                        <b class=${dataGlobal.currentUser.username}>0</b>
                        <button class="minusbuttons" type="button">-</button>
                      </div>
                      <article>
                        <div class="outerbox">
                          <div class="innerbox">
                            <img src="${dataGlobal.currentUser.image.png}" alt="">
                            <span>${dataGlobal.currentUser.username}</span>
                            <b class="you">you</b>
                            <small>0 minutes ago</small>
                          </div>
                          <div class="box">
                         <span class="delete"><img src="./images/icon-delete.svg" alt="">Delete</span>
                         <span class="edit"><img src="./images/icon-edit.svg" alt="">Edit</span>
                          </div>
                        </div>
                        <p class=${val}>${val}</p>
                      </article>
                    </section> 
                    </div>`
            })
            let ayu = document.createElement("div");
            ayu.innerHTML = mapThis.join("");
            document.querySelector(y).appendChild(ayu);
          }
        }
      })
    }

  })
})();
