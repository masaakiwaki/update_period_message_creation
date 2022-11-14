function clickBtn1() {
    const digit = document.getElementById("digit").value;
    const item = document.getElementById("item").value;
    const pref = document.getElementById("pref").value;
    const start = document.getElementById("start").value;
    document.getElementById("span1").textContent = item + digit + pref + start;
    console.log(start);
  }

console.log(new Date(2022,11,22));