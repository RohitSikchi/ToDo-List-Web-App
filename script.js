
const refElement=document.querySelector(".element");
const inputValue=document.getElementById("inputValue");
        
        const getListFromLocal = () =>{
            return JSON.parse(localStorage.getItem("Task"));
        }

        const addTodoListLocalStorage = (listArr) => {
            return localStorage.setItem("Task",JSON.stringify(listArr));
        }


        let listArr = getListFromLocal() || [] ;

        const addTodoDynamicElement = (curElem) =>{
            const divTag=document.createElement("div");
            divTag.classList.add("list")
            divTag.innerHTML=`<li>${curElem}</li> <button class="delBtn">remove</button>`;
            refElement.append(divTag);
        }

// e.preventDefault - for prevent to form submit (form tag use in html)
        const addTask = (e) => {
            e.preventDefault();
            // console.log("testing");
            const listValue=inputValue.value.trim();
            inputValue.value="";

            if((listValue!=="") && (!listArr.includes(listValue))){

                listArr.push(listValue);
                listArr=[...new Set(listArr)];
                console.log(listArr);
                localStorage.setItem("Task",JSON.stringify(listArr));

                addTodoDynamicElement(listValue);
            }
        };

        const showList = () => {
          console.log(listArr);
          listArr.forEach((curElem) => {
            addTodoDynamicElement(curElem);
          });
          
        }
        showList();
        
        const removeElement = (e) =>{
            const toRemove=e.target;
            let todoData=toRemove.previousElementSibling.innerText;

            let pareElem = toRemove.parentElement;
            console.log(todoData);

            listArr=listArr.filter((curTodo) => {
                return curTodo!==todoData.toLowerCase();

            });

            addTodoListLocalStorage(listArr);
            pareElem.remove();
            console.log(listArr);

        }
        refElement.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(e.target);
            if(e.target.classList.contains("delBtn")){
                removeElement(e);
            }
        });

        document.querySelector(".btn").addEventListener('click',(e) => {

            addTask(e);
        });