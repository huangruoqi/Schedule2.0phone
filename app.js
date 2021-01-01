function start() {
    changeNavbar();
    changeContent();
}

let ratio;


const defaultDay = 1;
let days = ["MON", "TUE", "WED", "THU", "FRI"];
const navButtons = document.getElementsByClassName('navButton');
const array = [0, 1, 2, 3, 4];
let day = (new Date()).getDay() - 1;
if (day < 0 || day > 4) {
    day = defaultDay;
}

let data;
fetch("./days.json")
    .then(res => res.json())
    .then(res => {
        data = res;
    })
    .then(res => {
        start();
    })

function changeNavbar() {
    const nav = document.getElementsByClassName("navbar")[0];
    removeAllChildNodes(nav);

    for (let i = 0; i < days.length; i++) {
        let temp = document.createElement('a');
        const text = document.createTextNode(days[i]);
        temp.appendChild(text);
        temp.className = "navButton";
        if (day == i) {
            const special = document.createElement('div');
            special.appendChild(temp);
            special.className = "special";
            temp = special;
        }
        nav.appendChild(temp);
    }
    array.forEach(element => {
        navButtons[element].addEventListener('click', ele => {
            changeDay(element);
            start();
        })
    });
}

function changeDay(element) {
    day = element;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}



function changeContent() {
    changeClasses();
}

function changeClasses() {
    const classData = data[day].classes;
    const finalClass = document.getElementsByClassName("classes")[0];
    removeAllChildNodes(finalClass);

    for (let i = 0; i < classData.length; i++) {
        const tempClass = document.createElement('a');
        tempClass.className = "show1";
        const t1 = document.createElement('h1');
        t1.appendChild(document.createTextNode(classData[i].name));
        tempClass.appendChild(t1);
        const t2 = document.createElement('h1');
        t2.appendChild(document.createTextNode(classData[i].number));
        tempClass.appendChild(t2);
        const t3 = document.createElement('h2');
        t3.appendChild(document.createTextNode(classData[i].time));
        tempClass.appendChild(t3);
        tempClass.href = classData[i].zoomLink;
        tempClass.target = "_blank";
        const t4 = document.createElement('h3');
        t4.appendChild(document.createTextNode(classData[i].password));
        tempClass.appendChild(t4);
        finalClass.appendChild(tempClass);
    }



}