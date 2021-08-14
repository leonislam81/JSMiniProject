const myImages = [
    {
        url:'https://loremflickr.com/1040/480/paris',
        title:'Paris City',
        subText:'Paris City That We Love Most'
    },
    {
        url:'https://loremflickr.com/1040/480/cat',
        title:'My Cat Pictures',
        subText:'Do you like cats?'
    },
    {
        url:'https://loremflickr.com/1040/480/bird',
        title:'My Bird Pictures',
        subText:'Here are my bird pictures'
    }
]
const slides = document.querySelector('.slides');
const carousel = document.querySelector('.carousel');
const indDots = document.querySelector('.indDots');
const prevBtn = document.querySelector('.prevBtn');
const nextBtn = document.querySelector('.nextBtn');
const page = {auto:{},slideList:[],dots:[],counter:0,delay:10000};
prevBtn.classList.add('sel');
nextBtn.classList.add('sel');
prevBtn.addEventListener('click',(e)=>{
    page.counter--;
    showImages();
    restartInt();
})
nextBtn.addEventListener('click',(e)=>{
    page.counter++;
    showImages();
    restartInt();
})
window.addEventListener('DOMContentLoaded',startSetup);

function startSetup(){
    myImages.forEach((img,index) => {
    const conCard = document.createElement('div');
    conCard.classList.add('slide');
    conCard.innerHTML = `<h3>${img.title}</h3> 
    <img src='${img.url}' alt='${img.title}'>
    <p>${img.subText}</p>
    `;
    page.slideList.push(conCard);
    slides.append(conCard);
    const dotIcon = document.createElement('span');
    dotIcon.classList.add('dot');
    dotIcon.classList.add('sel');
    dotIcon.addEventListener('click',(e)=>{
        page.counter = index;
        showImages();
        restartInt();
    })
    indDots.append(dotIcon);
    page.dots.push(dotIcon);
    })
    showImages();
    page.auto = setInterval(updateSlide,page.delay);
}
function updateSlide(){
    console.log(page.counter);
    page.counter++;
    showImages();
}

function showImages(){
    if(page.counter < 0){
        page.counter = page.slideList.length -1;
    }
    if(page.counter >= page.slideList.length){
        page.counter = 0;
    }

    page.slideList.forEach((el)=>{
        el.style.display = 'none';
    })
    page.dots.forEach((el)=>{
        el.classList.remove('active');
    })
    page.slideList[page.counter].style.display = 'block';
    page.dots[page.counter].classList.add('active');
}

function restartInt(){
    clearInterval(page.auto);
    page.auto = setInterval(updateSlide,page.delay);
}







