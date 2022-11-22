let displapyInfo = document.getElementById("displapyInfo");



let itemNameDisplay = document.createElement("label");
itemNameDisplay.setAttribute("class", "displapyInfoChild")
itemNameDisplay.innerHTML = "商品名";
displapyInfo.appendChild(itemNameDisplay);



let itemNameInput = document.createElement("input");
itemNameInput.setAttribute("class", "displapyInfoChild")
itemNameInput.setAttribute("type", "text");
displapyInfo.appendChild(itemNameInput);



let periodDisplay = document.createElement("label");
periodDisplay.setAttribute("class", "displapyInfoChild");
periodDisplay.innerHTML = "期間"
displapyInfo.appendChild(periodDisplay);



let periodInput = document.createElement("input");
periodInput.setAttribute("class", "displapyInfoChild");
displapyInfo.appendChild(periodInput);



let periodSelect = document.createElement("select");
periodSelect.setAttribute("class", "displapyInfoChild");

let periodSelectItems = ["年", "月", "日"];
for (let i = 0; i < periodSelectItems.length; i++) {
  console.log(periodSelectItems[i]);
  let periodSelectItem = document.createElement("option");
  periodSelectItem.setAttribute("value", periodSelectItems[i]);
  periodSelectItem.innerHTML = periodSelectItems[i];
  periodSelect.appendChild(periodSelectItem);
}
displapyInfo.appendChild(periodSelect);






function clickBtn1() {
    const digit = Number(document.getElementById("digit").value);
    const item = document.getElementById("item").value;
    const pref = document.getElementById("pref").value;
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

    document.getElementById("span1").textContent = result_text;

    navigator.clipboard.writeText(result_text)
    .then(() => {
      console.log('成功');
    })
    .catch(err => {
      console.error('ユーザが拒否、もしくはなんらかの理由で失敗');
    });

  }

