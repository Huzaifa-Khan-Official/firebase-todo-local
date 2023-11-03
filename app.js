import { app, db, collection, addDoc, doc, onSnapshot, deleteDoc, updateDoc } from "./firebase.js";


const getul = document.getElementById("list");
const addLi = document.getElementById("addLi");
const delAll = document.getElementById("delAll");
const inputLi = document.getElementById("inp");
let errorPara = document.querySelector("#errorPara"); // get error paragraph
let successPara = document.querySelector("#successPara"); // get success paragraph
const ids = [];

const getTodos = () => {
    onSnapshot(collection(db, "todos"), (data) => {
        data.docChanges().forEach((todo) => {
            ids.push(todo.doc.id)
            if (todo.type === "removed") {
                let dtodo = document.getElementById(todo.doc.id);
                if (dtodo) {
                    dtodo.remove();
                }
            } else if (todo.type === "added") {
                var listLi = document.createElement("li");
                var listText = document.createTextNode(todo.doc.data().todo);
                var listTextDiv = document.createElement("div");
                var divP = document.createElement("p");
                var liDiv = document.createElement("div");
                var editbtn = document.createElement("button");
                var editbtnText = document.createTextNode("EDIT");
                var deletebtn = document.createElement("button");
                var deletebtnText = document.createTextNode("DELETE");

                listTextDiv.setAttribute("class", "w-50 h-auto d-inline-block");
                editbtn.setAttribute("class", "btn btn-success");
                editbtn.setAttribute("onclick", `editLi(this, '${todo.doc.id}')`);
                deletebtn.setAttribute("class", "btn btn-danger float-end ms-3");
                deletebtn.setAttribute("onclick", `delLi('${todo.doc.id}')`);
                listLi.setAttribute("class", "list-group-item pt-2")
                listLi.setAttribute("id", `${todo.doc.id}`)
                liDiv.setAttribute("class", "listbtn float-end");


                divP.appendChild(listText);
                listTextDiv.appendChild(divP);
                listLi.appendChild(listTextDiv);
                editbtn.appendChild(editbtnText)
                deletebtn.appendChild(deletebtnText);
                getul.appendChild(listLi);
                listLi.appendChild(liDiv)
                liDiv.appendChild(editbtn);
                liDiv.appendChild(deletebtn);
            }


        })
    })
}

getTodos()

addLi.addEventListener("click", async () => {
    try {
        const inputLi = document.getElementById("inp");
        const todo = inputLi.value
        const date = new Date();
        const docRef = await addDoc(collection(db, "todos"), {
            todo: todo,
            data: date.toLocaleString()
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }

    inputLi.value = "";
})

inputLi.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        addLi.click()
    }
})


delAll.addEventListener("click", async () => {
    getul.innerHTML = "";
    let arr = []
    for (var i = 0; i < ids.length; i++) {
        arr.push(await deleteDoc(doc(db, "todos", ids[i])));
    }
    Promise.all(arr)
    .then((res) => {
        successPara.innerText = "Successfully deleted all todos!";
        setTimeout(() => {
            successPara.innerHTML = "";
        }, 3000);
    }).catch((err) => {
        errorPara.innerText = "Sorry,couldn't delete todos!";
        setTimeout(() => {
            errorPara.innerHTML = "";
        }, 3000);
    })
})

async function delLi(id) {
    await deleteDoc(doc(db, "todos", id));
}

async function editLi(e, id) {
    var editinputLi = prompt("Enter Edit value", e.parentNode.parentNode.firstChild.firstChild.firstChild.nodeValue);
    await updateDoc(doc(db, "todos", id), {
        todo : editinputLi
    })
    e.parentNode.parentNode.firstChild.firstChild.firstChild.nodeValue = editinputLi;
}

window.delLi = delLi;
window.editLi = editLi;