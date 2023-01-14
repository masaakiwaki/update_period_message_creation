const hankaku2Zenkaku = (str) => {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
  };
  
const findInteger = (str) => {
return str.replace(/[^0-9.]/g, "");
};

const dotHankaku2Zenkaku = (str) => {
return str.replace(/[．０-９]/g, function (wc){
    var zen="．。０１２３４５６７８９",han = "..0123456789";return han[zen.indexOf(wc)];
});
};

const isIntegerValidation= (str) => {
    str = hankaku2Zenkaku(str);
    str = dotHankaku2Zenkaku(str);
    str = findInteger(str);
    return Number(str);
  };



const createAmountString = (resultAmout, taxType) => {
    let resultAmoutYenStyle = resultAmout.toLocaleString()
    let resultAmoutYenStyleArray = [resultAmout, 
                                    resultAmoutYenStyle,
                                    `\xA5${resultAmoutYenStyle}.-`,
                                    `\xA5${resultAmoutYenStyle}(${taxType})`,
                                    `${resultAmoutYenStyle}円(${taxType})`,
                                    ]

    let resultAmountArray = []
    for (i in resultAmoutYenStyleArray) {
        resultAmountArray.push(resultAmoutYenStyleArray[i])
        console.log(resultAmountArray[i])

    }

    return resultAmountArray 

}


const appdata = {
    data() {
        return {
            itemName: "",
            inputStartDate: "",
            periodValue: 1,
            startDate: "",
            endDate: "", 
            resultText: "",
        }
        },
    methods:{
        createPeriod(event){
            
            this.periodValue = isIntegerValidation(String(this.periodValue))
            let start_dt = new Date(this.inputStartDate);
            let end_dt = new Date(this.inputStartDate)

            if (event.target.id == 'periodYear') {
                end_dt.setFullYear(end_dt.getFullYear() + this.periodValue)
            } else if (event.target.id == 'periodDay') {
                end_dt.setDate(end_dt.getDate() + this.periodValue)
            } 
            
            end_dt.setDate(end_dt.getDate() - 1)
            
            
            this.startDate = (start_dt.getFullYear() + '.' + Number(start_dt.getMonth() + 1) + '.' + start_dt.getDate());
            this.endDate = (end_dt.getFullYear() + '.' + Number(end_dt.getMonth() + 1) + '.' + end_dt.getDate());
            alert(this.startDate)

            this.resultText = (this.itemName + ': '+ this.startDate + ' ～ ' + this.endDate);
            
            },




        copyToClipboard(text) {
            navigator.clipboard.writeText(text)
            .then(() => {
                console.log("copied!")
                console.log(text)
            })
            .catch(e => {
                console.error(e)
            })
        }


        

        }
    }


let app = Vue.createApp(appdata).mount('#app')


