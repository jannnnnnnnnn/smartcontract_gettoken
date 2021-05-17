// const regExp = new RegExp(/^0x[0-9A-F]{1,4}$/i);
// var control = document.getElementById('contractAdd');
// if (!regExp.test(control))
//    alert('invalid');

const output = document.querySelector("#output")

function getTokenBalance(contractAdd, tokenHolderAdd){
  console.log("Contract Address = ", contractAdd)
  console.log("Token Holder Address = ",tokenHolderAdd)
  // var myHeaders = new Headers();
  // myHeaders.append("Content-Type", "text/plain");

  const data={
    "jsonrpc":"2.0",
    "method":"alchemy_getTokenBalances",
    "params":[tokenHolderAdd, [contractAdd]],
    "id":42
  }

const raw = JSON.stringify(data)

var requestOptions = {
  method: 'POST',
  headers: new Headers({ "Content-Type": "application/json" }),
  body: raw,
  redirect: 'follow'
};

fetch("https://eth-mainnet.alchemyapi.io/v2/0OHneP_azOu--DmGqGRWq32lRG162Jhu", requestOptions)
  .then(response => response.text())
  .then(result => {
    console.log(result)
    resultObj = JSON.parse(result)
    const tokenBalance = parseInt(resultObj.result?.tokenBalances[0]?.tokenBalance, 16)
    console.log(tokenBalance)
    output.innerHTML=`You Token Balance is ${tokenBalance}.`
  })
  .catch(error => console.log('error', error));

}

const getTokenOnMainnetForm = document.forms.getTokenOnMainnet;
let formDataObj = new Object;

function submitInput(e){
  e.preventDefault();
  console.log("connecting to mainnet....");
  const formData = new FormData(getTokenOnMainnetForm); 
  getTokenBalance(formData.get("contractAdd"), formData.get("tokenHolderAdd"))
}



document.querySelector("#getTokenOnMainnet").addEventListener("submit", submitInput)