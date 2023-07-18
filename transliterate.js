function hide() {
  document.getElementById("tooltip1").classList.remove("block");
  document.getElementById("tooltip2").classList.remove("block");
}
function show1() {
  document.getElementById("tooltip1").classList.add("block");
  var self = this;
  setTimeout(function () {
    self.hide();
  }, 3000);
}
function show2() {
  document.getElementById("tooltip2").classList.add("block");
  var self = this;
  setTimeout(function () {
    self.hide();
  }, 3000);
}

function swapTransliteration() {
  if (localStorage.getItem("direction") == null || localStorage.getItem("direction") == undefined || localStorage.getItem("direction") == "latin2phoenician") {
    localStorage.setItem("direction", "phoenician2latin");
    document.getElementById("textarea1").readOnly = true;
    document.getElementById('textarea2').removeAttribute('readonly');
    document.getElementById("textarea2").focus();
    document.getElementById("Phoenician").classList.add("currentTab");
    document.getElementById("Latin").classList.remove("currentTab");
  } else if (localStorage.getItem("direction") == "phoenician2latin") {
    localStorage.setItem("direction", "latin2phoenician");
    document.getElementById('textarea1').removeAttribute('readonly');
    document.getElementById("textarea2").readOnly = true;
    if (localStorage.getItem("encoding") == "Latin")
      document.getElementById("textarea1").focus();
    document.getElementById("Phoenician").classList.remove("currentTab");
    document.getElementById("Latin").classList.add("currentTab");
  }
}

function clearFooter() {
  document.getElementsByClassName("footerOfPage")[0].style = "display:none";
}

function copyContent1() {
  navigator.clipboard.writeText(document.getElementById("textarea1").value);
}

function copyContent2() {
  navigator.clipboard.writeText(document.getElementById("textarea2").value);
}

function transliterate() {
  if (document.getElementById("textarea1").value.indexOf("script>") > -1 || document.getElementById("textarea2").value.indexOf("script>") > -1) {
    document.getElementById("textarea1").value = "";
    document.getElementById("textarea2").value = "";
    document.getElementById("textarea1").innerHTML = "";
    document.getElementById("textarea2").innerHTML = "";
  }

  /*  
    Phoenician Unicode Block : https://en.wikipedia.org/wiki/Phoenician_(Unicode_block)
    Phoenician : https://en.wikipedia.org/wiki/Phoenician_alphabet
    Used to write : 
      https://en.wikipedia.org/wiki/Phoenician_language
      https://en.wikipedia.org/wiki/Punic_language
      https://en.wikipedia.org/wiki/Ammonite_language
      https://en.wikipedia.org/wiki/Moabite_language 
      https://en.wikipedia.org/wiki/Edomite_language
  */

  if (localStorage.getItem("direction") == null || localStorage.getItem("direction") == undefined || localStorage.getItem("direction") == "latin2phoenician") {
    const latinToPhoenician = { " ": "  ", ".": ".", ",": ",", ";": ";", "?": "?", "!": "!", "\"": "\"", "'": "'", "(": "(", ")": ")", ":": ":", "+": "+", "=": "=", "/": "/", "-": "-", "<": "<", ">": ">", "*": "*", "|": "|", "\\": "\\", "₹": "₹", "{": "{", "}": "}", "[": "[", "]": "]", "_": "_", "%": "%", "@": "@", "ˆ": "ˆ", "`": "`", "´": "´", "·": "·", "˙": "˙", "¯": "¯", "¨": "¨", "˚": "˚", "˝": "˝", "ˇ": "ˇ", "¸": "¸", "˛": "˛", "˘": "˘", "’": "’", "ʾ": "𐤀", "b": "𐤁", "g": "𐤂", "d": "𐤃", "h": "𐤄", "w": "𐤅", "z": "𐤆", "ḥ": "𐤇", "ṭ": "𐤈", "y": "𐤉", "k": "𐤊", "l": "𐤋", "m": "𐤌", "n": "𐤍", "𐤎": "s", "𐤏": "ʿ", "p": "𐤐", "f": "𐤐", "ṣ": "𐤑", "q": "𐤒", "r": "𐤓", "š": "𐤔", "t": "𐤕", "1": "𐤖", "10": "𐤗", "20": "𐤘", "100": "𐤙", "2": "𐤚", "𐤛": "3", "𐤟" : "." };

    let resultPhn = "";
    let textLa = document.getElementById("textarea1").value.toLowerCase();

    for (let u = 0; u < textLa.length; u++) {
      if (textLa[u].indexOf("\n") > -1) { // New Lines
        resultPhn = resultPhn + "\n";
      } else if (latinToPhoenician[textLa[u]] != undefined && latinToPhoenician[textLa[u]] != null && textLa[u] != "") { // Default Single Character
        resultPhn = resultPhn + latinToPhoenician[textLa[u]];
      }
    }

    document.getElementById("textarea2").value = resultPhn;
    document.getElementById("textarea2").innerHTML = resultPhn;
  } else if (localStorage.getItem("direction") == "phoenician2latin") {
    const phoenicianToLatin = { " ": " ", "।": ".", "॥": ".", ",": ",", ";": ";", "?": "?", "!": "!", "\"": "\"", "'": "'", "(": "(", ")": ")", ":": ":", "+": "+", "=": "=", "/": "/", "-": "-", "<": "<", ">": ">", "*": "*", "|": "|", "\\": "\\", "₹": "₹", "{": "{", "}": "}", "[": "[", "]": "]", "_": "_", "%": "%", "@": "@", "ˆ": "ˆ", "`": "`", "´": "´", "˜": "˜", "·": "·", "˙": "˙", "¯": "¯", "¨": "¨", "˚": "˚", "˝": "˝", "ˇ": "ˇ", "¸": "¸", "˛": "˛", "˘": "˘", "’": "’", "\uD802\uDD00": "ʾ", "\uD802\uDD01": "b", "\uD802\uDD02": "g", "\uD802\uDD03": "d", "\uD802\uDD04": "h", "\uD802\uDD05": "w", "\uD802\uDD06": "z", "\uD802\uDD07": "ḥ", "\uD802\uDD08": "ṭ", "\uD802\uDD09": "y", "\uD802\uDD0A": "k", "\uD802\uDD0B": "l", "\uD802\uDD0C": "m", "\uD802\uDD0D": "n", "\uD802\uDD0E": "s", "\uD802\uDD0F": "ʿ", "\uD802\uDD10": "p", "\uD802\uDD11": "ṣ", "\uD802\uDD12": "q", "\uD802\uDD13": "r", "\uD802\uDD14": "š", "\uD802\uDD15": "t", "\uD802\uDD16": "1", "\uD802\uDD17": "10", "\uD802\uDD18": "20", "\uD802\uDD19": "100", "\uD802\uDD1A": "2", "\uD802\uDD1B": "3", "\uD802\uDD1F" : "." };

    let resultLa = "";
    let textPhn = document.getElementById("textarea2").value;
    for (let u = 0 ; u < textPhn.length ; ) {
      if (textPhn[u].indexOf("\n") > -1) {
        resultLa = resultLa + "\n";
        u = u + 1;
      } else if (phoenicianToLatin[textPhn[u] + textPhn[u+1]] != undefined && phoenicianToLatin[textPhn[u] + textPhn[u+1]] != null && (textPhn[u] + textPhn[u+1]) != "") {
        resultLa = resultLa + phoenicianToLatin[textPhn[u] + textPhn[u+1]];
        u = u + 2;
      } else if (phoenicianToLatin[textPhn[u]] != undefined && phoenicianToLatin[textPhn[u]] != null && textPhn[u] != "") {
        resultLa = resultLa + phoenicianToLatin[textPhn[u]];
        u = u + 1;
      } else {
        u = u + 1;
      }
    }
    document.getElementById("textarea1").value = resultLa;
    document.getElementById("textarea1").innerHTML = resultLa;
  }
}

function swap(json) {
  var ret = {};
  for (var key in json) {
    ret[json[key]] = key;
  }
  return ret;
}

function openTab(evt, localeName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(localeName).style.display = "block";
  evt.currentTarget.className += " active";
  localStorage.setItem("encoding", localeName);
  transliterate();
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
document.getElementById("textarea1").focus();
if (localStorage.getItem("direction") == null || localStorage.getItem("direction") == undefined || localStorage.getItem("direction") == "phoenician2latin") {
  localStorage.setItem("direction", "latin2phoenician");
  localStorage.setItem("encoding", "Latin");
}

if (screen.width >= 300 && screen.width <= 500) {
  document.getElementById("Phoenician").classList.remove("phoenicianTabText");
  document.getElementById("Phoenician").classList.add("phoenicianTabSmallScreen");
  document.getElementById("Latin").classList.remove("tabcontent");
  document.getElementById("Latin").classList.add("tabcontentSmallScreen");
}