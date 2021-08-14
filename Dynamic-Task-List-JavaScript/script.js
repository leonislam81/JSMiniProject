const userTask = document.querySelector('.main input');
const addBtn = document.querySelector('.main button');
const output = document.querySelector('.output');
const main = document.querySelector('.main');
const message = document.createElement('div');
const downloadBtn = document.createElement('div');
const tasks = JSON.parse(localStorage.getItem('tasklist')) || [];
downloadBtn.classList.add('btn');
downloadBtn.textContent = 'Download your List';
document.body.append(downloadBtn);
downloadBtn.style.display = 'none';
message.style.display = 'none';
message.style.color = 'red';
main.append(message);
addBtn.addEventListener('click',createListItem);
userTask.addEventListener('change',(e)=>{
    message.style.display = 'none';
})
downloadBtn.addEventListener('click',downloadFile);
console.log(tasks);
if(tasks.length>0){
    tasks.forEach((task)=>{
        genItem(task.val,task.checked);
    })
    showDownload();
}
function downloadFile(){
    const curList = output.querySelectorAll('li');
    let temp = 'My List\n';
    curList.forEach((el)=>{
        if(el.classList.contains('ready')){
            temp += '-'; 
        }
        temp += `${el.textContent}\n`;
    })
    console.log(temp);
    const element = document.createElement('a');
    element.setAttribute('href','data:text/plain;charset=utf-8,'+encodeURIComponent(temp));
    element.setAttribute('download','Tasks MyList');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function buildTasks(){
    tasks.length = 0;
    const curList = output.querySelectorAll('li');
    curList.forEach((el)=>{
        const tempTask = {
            val : el.textContent,
            checked : false
        };
        if(el.classList.contains('ready')){
      
            tempTask.checked  = true;
        }
        tasks.push(tempTask);
    })
    saveTasks();
}


function errorMsg(msg){
    message.style.display = 'block';
    message.textContent = msg;
    userTask.focus();
}
function showDownload(){
    const curList = output.querySelectorAll('li');
    if(curList.length > 0 ){
        downloadBtn.style.display = 'block';
    }else{
        downloadBtn.style.display = 'none';
    }
}

function genItem(val,complete){
    const li = document.createElement('li');
    const temp = document.createTextNode(val);
    li.appendChild(temp);
    output.append(li);
    userTask.value = '';
    if(complete){
        li.classList.add('ready');
    }
    li.addEventListener('click',(e)=>{
        li.classList.toggle('ready');
        buildTasks();
    })
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    li.append(btn);
    btn.addEventListener('click',(e)=>{
        li.remove();
        showDownload();
        buildTasks();
    })
    return val;
}


function saveTasks(){
    localStorage.setItem('tasklist',JSON.stringify(tasks));
}

function createListItem(){
    const val = userTask.value;
    if(val.length > 0){
        const myObj = {
            val:genItem(val,false),
            checked:false
        };
        tasks.push(myObj);
        saveTasks();
        showDownload();
    }else{
        errorMsg('Please add text to the input');
    }
}