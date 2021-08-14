// Lorem articles
const lorem = `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum vel voluptate, a quae atque iure dolore debitis ullam fugit esse nisi sapiente tenetur itaque voluptatum asperiores accusamus. Exercitationem architecto voluptates sapiente repudiandae? Cupiditate, officia a? Accusantium pariatur sequi aliquam nesciunt animi culpa, vitae in molestias iste corrupti asperiores, quaerat fugit.`;

// defind the variable name

const words = document.querySelector("input[name='words']");
const paragraphs = document.querySelector("input[name='paragraphs']");
const button = document.querySelector(".btn");
const bodyWrapper = document.querySelector(".bodyWrapper");
const regex = /([^A-Za-z ])/g;
const data = lorem.replace(regex, '');
const myArr = data.split(' ');
console.log(myArr);
button.addEventListener("click", loremResult);

function loremResult(e){
  myArr.sort(function(a, b) {
    return .5 - Math.random();
    });
    const numParas = Number(paragraphs.value);
    const numWords = Number(words.value);
    for(let i=0;i<numParas;i++){
        genParagraphs(numWords);
    }
}

function genParagraphs(num){
const p = document.createElement('p');
    p.textContent = getSen('',num);
    bodyWrapper.append(p);
}
function getSen(temp,num,cnt){
    let total = num > 10 ? 10 : num;
    let ranWords = Math.floor(Math.random()*total) + 2;
    let holder = '';
    let selWord = '';
    let oldWord = '';
    for(let i=0;i<ranWords;i++){
        if(num>0){
          if(cnt >= myArr.length){
                myArr.sort((a, b) => .5 - Math.random());
                cnt=0;
            }
            selWord = myArr[cnt];
            while(oldWord==selWord){
                selWord = myArr[Math.floor(Math.random()*myArr.length)];
            }
            holder += ` ${selWord}`;
            cnt++;
            oldWord = selWord;
        }
        num--;
    }
    if(holder.length > 0){
        temp += capWord(holder.trim().toLowerCase());
    }
    if(num < 0 ){
        return temp;
    }else{
        return getSen(temp,num,cnt);
    }
}

function capWord(str){
    let first = str.charAt(0).toUpperCase();
    let readySentence = first + str.slice(1) + '. ';
    console.log(first);
    return readySentence;
}