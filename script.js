const armSpan = document.querySelector(".arm-span");
const availableCards = ["blocks/mnv2.png", "blocks/mnv2_stride.png", "blocks/resnet.png", "blocks/dense.png"];

let cardUl = document.querySelectorAll(".card ul");
let isMachineWorks = true;
let isTriggerOn = false;
const timeRoll = 2000;

const liCreator = () => {
    cardUl.forEach(ul => {
        const liElement = ul.children[ul.children.length - 1];
        ul.style.transition = "none";
        ul.innerHTML = "";
        ul.append(liElement);
        ul.style.bottom = "0";
        setTimeout(() => {
            ul.style.transition = "bottom 2s ease";
        }, 100);
    });
};

const drawRandomItems = () => {
    cardUl.forEach(ul => {
        const randomNumberDraw = Math.floor(Math.random() * 9 + 40);
        let indexDraw = Math.floor(Math.random() * availableCards.length);
        let liArray = [];
        for (let i = 0; i < randomNumberDraw; i++) {
            if (indexDraw === availableCards.length) indexDraw = 0;
            const li = document.createElement("li");
            li.style.backgroundImage = `url('${availableCards[indexDraw]}')`;
            li.dataset.index = indexDraw;
            liArray.push(li);
            indexDraw++;
        }
        ul.append(...liArray);
        const height = parseInt(getComputedStyle(ul.children[0]).height);
        ul.style.bottom = height * liArray.length + "px";
    });

    setTimeout(liCreator, timeRoll);
};

const handleGameStart = () => {
    armSpan.classList.add("arm-clicked");
    setTimeout(() => {
        armSpan.classList.remove("arm-clicked");
    }, timeRoll);
    drawRandomItems();
};


const myTriggerTop = document.querySelector(".arm-span span");
const myTriggerBottom = document.querySelector(".arm-span2 span");

myTriggerTop.addEventListener("mousedown", () => {
    if (!isMachineWorks) {
        return;
    } else {
        isTriggerOn = true;
    }
});
myTriggerTop.addEventListener("mouseup", () => {
    if (isTriggerOn) {
        isTriggerOn = false;
        armSpan.style.transition = "transform 1s";
        armSpan.style.transform = "rotate(15deg)";
        setTimeout(() => {
            armSpan.style.transition = "none";
        }, 1000);
    }
});
document.body.addEventListener("mouseup", () => {
    if (isTriggerOn) {
        isTriggerOn = false;
        armSpan.style.transition = "transform 1s";
        armSpan.style.transform = "rotate(15deg)";
        setTimeout(() => {
            armSpan.style.transition = "none";
        }, 1000);
    }
});

const spanTopY = myTriggerTop.getBoundingClientRect().top;
const spanBottomY = myTriggerBottom.getBoundingClientRect().top;

document.body.addEventListener("mousemove", e => {
    if (isTriggerOn) {
        const angleArm = 150;
        const betweenArmSpans = spanBottomY - spanTopY;
        const cursorPosition = e.clientY - spanTopY;
        const newDeg = (cursorPosition * angleArm) / betweenArmSpans;
        armSpan.style.transform = `rotate(${newDeg}deg)`;
        if (newDeg >= 165) {
            isTriggerOn = false;
            handleGameStart();
            armSpan.style.transition = "transform 1s";
            armSpan.style.transform = "rotate(15deg)";
            setTimeout(() => {
                armSpan.style.transition = "none";
            }, 1000);
        }
    }
});
