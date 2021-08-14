const timeInd = document.querySelector('.timeInd');
const eventInfo = document.querySelector('.eventInfo');
const orderListEvents = eventInfo.querySelector('ol');
const orderListInd = timeInd.querySelector('ol');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let move = 100;
const page = {
    ind: [],
    info: [],
    pos: 0
};
const myData = [];
genEvents();
outputTimeLine();
next.addEventListener('click', (e) => {
    let box = orderListInd.getBoundingClientRect();
    page.pos -= move;
    if ((box.left - box.width) < (myData.length * move * -1) + (move * 2)) {
        page.pos = (myData.length * move * -1) + (move * 3);
    }
    setValue(orderListInd, 'translateX', page.pos + 'px');
})
prev.addEventListener('click', (e) => {
    let box = orderListInd.getBoundingClientRect();
    page.pos += move;
    if (box.left > move) {
        page.pos = move;
    }
    setValue(orderListInd, 'translateX', page.pos + 'px');
})

function setValue(ele, prop, val) {
    ele.style["transform"] = prop + "(" + val + ")";
}

function showEvent(val) {
    page.ind.forEach((el, index) => {
        if (index <= (val + 1)) {
            el.classList.add('done');
        } else {
            el.classList.remove('done');
        }
        if (index == val) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    })
    page.info.forEach((el, index) => {
        if (index == val) {
            el.style.opacity = 1;
        } else {
            el.style.opacity = 0;
        }
    })
}

function outputTimeLine() {
    sortData(myData, 'val');
    myData.forEach((el, index) => {
        const li1 = document.createElement('li');
        let tempDate = new Date(el.val);
        let tempHolder = tempDate.toDateString().split(' ');
        tempHolder[2] = parseInt(tempHolder[2]);
        li1.style.left = move * index + 'px';
        li1.textContent = tempHolder.slice(1, 3).join('. ');
        li1.addEventListener('click', (e) => {
            showEvent(index);
        })
        orderListInd.append(li1);
        const li = document.createElement('li');
        orderListEvents.append(li);
        li.style.opacity = 0;
        const div1 = document.createElement('div');
        div1.style.fontSize = '2em';
        div1.textContent = el.title.toUpperCase();
        li.append(div1);
        div1.style.padding = '10px';
        const div3 = document.createElement('div');
        div3.textContent = tempDate.toDateString();
        div3.style.fontSize = '1.4em';
        div3.style.padding = '10px';
        div3.style.backgroundColor = 'black';
        div3.style.color = 'white';
        li.append(div3);
        const div2 = document.createElement('div');
        div2.innerHTML = '<img src="https://loremflickr.com/320/240" />';
        div2.innerHTML += el.content;
        div2.style.padding = '10px';
        li.append(div2);
        const hr = document.createElement('hr');
        li.append(hr);
        page.ind.push(li1);
        page.info.push(li);
        showEvent(0);
    })
}

function sortData(obj, prop) {
    obj.sort((a, b) => {
        if (a[prop] < b[prop]) {
            return -1;
        }
        if (a[prop] > b[prop]) {
            return 1;
        }
        return 0;
    })
}



function genEvents() {
    function ranDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
    for (let x = 0; x < 50; x++) {
        let desc = '';
        let ran = Math.floor(Math.random() * 5) + 2;
        for (let i = 0; i < ran; i++) {
            desc += (getPara()) + '\n';
        }
        let randomDate = ranDate(new Date(2021, 0, 1), new Date(2022, 0, 1));
        let tempObj = {
            val: randomDate.getTime(),
            title: genWords(5),
            content: desc
        }
        myData.push(tempObj);
    }
}

function getPara() {
    let temp = '';
    let ran = Math.floor(Math.random() * 10) + 3;
    for (let i = 0; i < ran; i++) {
        let ran2 = Math.floor(Math.random() * 10);
        temp += genWords(ran2).trim() + '. ';
    }
    return (temp);
}

function genWords(val) {
    const charsRan = 'Modern Web';
    let pos = Math.floor(Math.random() * charsRan.length);
    let result = charsRan.charAt(pos).toUpperCase();
    while (val > 0) {
        const letters = Math.floor(Math.random() * 7) + 2;
        for (let i = 0; i < letters; i++) {
            let pos = Math.floor(Math.random() * charsRan.length);
            result += charsRan.charAt(pos);
        }
        val--;
        result += ' ';
    }
    return (result);
}
