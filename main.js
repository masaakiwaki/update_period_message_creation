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

