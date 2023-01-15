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

const DisplayPeriod = (dateObject) => {
    let resultDisplayArray = []
    const displayStyleArray = [
        addDelimiter(dateObject, delimiter = "/", digitValue=1),
        addDelimiter(dateObject, delimiter = "/", digitValue=2),
        addDelimiter(dateObject, delimiter = "-", digitValue=1),
        addDelimiter(dateObject, delimiter = "-", digitValue=2),
        addDelimiter(dateObject, delimiter = "_", digitValue=1),
        addDelimiter(dateObject, delimiter = "_", digitValue=2),
        addDelimiter(dateObject, delimiter = ".", digitValue=1),
        addDelimiter(dateObject, delimiter = ".", digitValue=2),
    ]

    for(i in displayStyleArray){
        resultDisplayArray.push(displayStyleArray[i])
    }

    return resultDisplayArray
}


const splitDate = (dateObject) => {
    return {"year": dateObject.getFullYear(), "month": Number(dateObject.getMonth() + 1), "day": dateObject.getDate()}
}


const dateChangeTwoDigit = (dateValue) => {
    const targetValue = String(dateValue)
    if (targetValue.length == 1) {
        const result = `0${targetValue}`
        return result
    } else {
        const result = targetValue
        return result
    }
}

const addDelimiter = (dateObject, delimiter, digitValue=1) => {
    if (digitValue == 1) {
        const result = dateObject["year"] + delimiter + dateObject["month"] + delimiter + dateObject["day"]
        return result
    }
    if (digitValue == 2) {
        const result = dateObject["year"] + delimiter + dateChangeTwoDigit(dateObject["month"]) + delimiter + dateChangeTwoDigit(dateObject["day"])
        return result
    }
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
            startDateArray: [],
            endDateArray: []
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
            
            this.startDate = splitDate(start_dt)
            this.endDate = splitDate(end_dt)
            
            this.resultText = `${this.itemName}: ${addDelimiter(dateObject = this.startDate , delimiter = ".", digitValue=1)} 〜 ${addDelimiter(dateObject = this.endDate , delimiter = ".", digitValue=1)}`
            this.startDateArray = DisplayPeriod(this.startDate)
            this.endDateArray = DisplayPeriod(this.endDate)
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


