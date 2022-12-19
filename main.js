let displapyInfo = document.getElementById("displapyInfo");



let blockItem = document.createElement("div");
blockItem.setAttribute("class", "displapyInfoChild displapyInfoChildBlock");

let itemNameDisplay = document.createElement("label");
itemNameDisplay.setAttribute("class", "displapyInfoChild displapyInfoChildLabel");
itemNameDisplay.innerHTML = "対象";
blockItem.appendChild(itemNameDisplay);

let itemNameInput = document.createElement("input");
itemNameInput.setAttribute("class", "displapyInfoChild displapyInfoChildInput");
itemNameInput.setAttribute("id", "item");
itemNameInput.setAttribute("type", "text");
blockItem.appendChild(itemNameInput);

displapyInfo.appendChild(blockItem);



let blockPeriod = document.createElement("div");
blockPeriod.setAttribute("class", "displapyInfoChild displapyInfoChildBlock");

let periodDisplay = document.createElement("label");
periodDisplay.setAttribute("class", "displapyInfoChild displapyInfoChildLabel");
periodDisplay.innerHTML = "期間"
blockPeriod.appendChild(periodDisplay);

let periodInput = document.createElement("input");
periodInput.setAttribute("class", "displapyInfoChild displapyInfoChildInput");
periodInput.setAttribute("id", "digit");
blockPeriod.appendChild(periodInput);

let periodSelect = document.createElement("select");
periodSelect.setAttribute("class", "displapyInfoChild");
periodSelect.setAttribute("id", "periodSelect");

let periodSelectItems = ["年", "日"];
for (let i = 0; i < periodSelectItems.length; i++) {
  console.log(periodSelectItems[i]);
  let periodSelectItem = document.createElement("option");
  periodSelectItem.setAttribute("id", "pref");
  periodSelectItem.setAttribute("value", periodSelectItems[i]);
  periodSelectItem.innerHTML = periodSelectItems[i];
  periodSelect.appendChild(periodSelectItem);
}
blockPeriod.appendChild(periodSelect);
displapyInfo.appendChild(blockPeriod);




let blockStartPeriod = document.createElement("div");
blockStartPeriod.setAttribute("class", "displapyInfoChild displapyInfoChildBlock");


let startPeriodDisplay = document.createElement("label");
startPeriodDisplay.setAttribute("class", "displapyInfoChild displapyInfoChildLabel")
startPeriodDisplay.innerHTML = "保守開始日";
blockStartPeriod.appendChild(startPeriodDisplay);


let selectPeriodDate = document.createElement("input");
selectPeriodDate.setAttribute("class", "displapyInfoChild displapyInfoChildInput")
selectPeriodDate.setAttribute("id", "start");
selectPeriodDate.setAttribute('type', 'date');
blockStartPeriod.appendChild(selectPeriodDate);
displapyInfo.appendChild(blockStartPeriod);


let blockButton = document.createElement("div");
blockButton.setAttribute("class", "displapyInfoChild displapyInfoChildBlock displapyInfoChildBlockButton");

let generateButton = document.createElement("a");
generateButton.innerHTML = "期間表示";
generateButton.setAttribute("class", "original-button");
generateButton.setAttribute("id", "generateButton");
blockButton.appendChild(generateButton);
displapyInfo.appendChild(blockButton);


let test = document.getElementById('generateButton')
test.addEventListener("click", clickBtn1); 

function clickBtn1() {
    const digit = Number(document.getElementById("digit").value);
    const item = document.getElementById("item").value;
    const pref = periodSelectValue = document.getElementById("periodSelect").value;
    const start = document.getElementById("start").value;


    let start_dt = new Date(start);
    let end_dt = new Date(start)


    if (pref === '年'){
      end_dt.setFullYear(end_dt.getFullYear() + digit);
    } else if (pref === '月'){
      end_dt.setMonth(end_dt.getMonth() + digit);
    } else if (pref === '日'){
      end_dt.setDate(end_dt.getDate() + digit);
    }

    end_dt.setDate(end_dt.getDate() - 1);

    let start_date = (start_dt.getFullYear() + '.' + Number(start_dt.getMonth() + 1) + '.' + start_dt.getDate());
    let end_date = (end_dt.getFullYear() + '.' + Number(end_dt.getMonth() + 1) + '.' + end_dt.getDate());

    let result_text = (item + ': '+ start_date + ' ～ ' + end_date);

    console.log(result_text);

    navigator.clipboard.writeText(result_text);
    

    if (document.getElementById("resultBlock") == null){

      createResultElement("対象・期間", "result");
      createResultElement("開始", "resultStart");
      createResultElement("終了", "resultEnd");

    }

    document.getElementById("resultInput").value = result_text;
    document.getElementById("resultStartInput").value = changeDateTaxt(start_date);
    document.getElementById("resultEndInput").value = changeDateTaxt(end_date);


    let copyButton = document.getElementsByClassName("resultButton");
    let copyButtons = Array.from(copyButton );

    copyButtons.forEach(function(element) {
      element.addEventListener("click", valueCopy); 
    })

    function valueCopy(event) {

      targetInputElement = event.target.id.replace("Button", "Input");
      
      navigator.clipboard.writeText(document.getElementById(targetInputElement).value);

    }

  }






const changeDateTaxt = (dateText) => {
  return dateText.replace(/\./g, "/");

}

const createResultElement = (displayValue, resultText) => {
  let blockItem = document.createElement("div");
  blockItem.setAttribute("class", "displapyInfoChild displapyInfoChildBlock displapyInfoChildBlockResult");
  blockItem.setAttribute("id", "resultBlock");

  let resultDisplay = document.createElement("label");
  resultDisplay.setAttribute("class", "displapyInfoChild displapyInfoChildLabel");
  resultDisplay.innerHTML = displayValue;
  blockItem.appendChild(resultDisplay);

  let resultInput = document.createElement("input");
  resultInput.setAttribute("class", "displapyInfoChild resultInput");
  resultInput.setAttribute("id", `${resultText}Input`);
  resultInput.setAttribute("type", "text");
  blockItem.appendChild(resultInput);
  
  

  let resultButton = document.createElement("input");
  resultButton.setAttribute("class", "displapyInfoChild resultButton");
  resultButton.setAttribute("id", `${resultText}Button`);
  resultButton.setAttribute("type", "button");
  resultButton.setAttribute("value", "コピー");
  blockItem.appendChild(resultButton);

  displapyInfo.appendChild(blockItem);
}

