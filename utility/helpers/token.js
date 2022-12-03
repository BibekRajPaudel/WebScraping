const forge = require("node-forge");
const btoa = require('btoa');
const request = require('request');
const apmPublicKey = require('../constant/apmPublicKey.json')


function serialize(obj) {
  let str = [];
  for (let p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
}

const APM = function (type, r=1) {
  let urlPath='/api/TrackAndTrace/GetContainerAvailabiltyByTerm';
  if(type=='gate'){
    urlPath='/api/TrackAndTrace/GetGateTransaction';
  }else if(type=='EIR'){
    urlPath='/api/TrackAndTrace/GetEIRReprintDetail';
  }
  let publicKey = apmPublicKey['publicKey'+r].split('&')[2]
    .replace('PublicKey=', ''),
    privateKeyString = apmPublicKey['publicKey'+r].split('&')[3]
      .replace('PrivateKey=', ''),
    privateKey = [],
    signature,
    timestamp = new Date().getTime(),
    queryString = '?',
    hmac = forge.hmac.create(),
    finalBytes = [];

  if (queryString === '?') {
    queryString = '';
  }
  hmac.start('sha256', privateKeyString);
  hmac.update(
    urlPath.toLowerCase() +
    ':' +
    'POST' +
    ':' +
    queryString.toLowerCase() +
    ':' +
    timestamp
  );
  let sig1 = hmac.digest().getBytes();
  for (let i = 0; i < sig1.length; ++i) {
    finalBytes.push(sig1.charCodeAt(i));
  }
  let str = String.fromCharCode.apply(null, finalBytes);
  signature = btoa(str);
  let dataa =
    'TOPS-AUTH apikey="' +
    publicKey +
    '", signature="' +
    signature +
    '", utctimestamp="' +
    timestamp +
    '"';
  return dataa;
};

// const btoa = function (str) {
//   return Buffer.from(str).toString("base64");
// };


const GCT_NY=async(portUsername,portPassword)=>{
  const formDataa = {
    rsm_TSM:
      ";;System.Web.Extensions,+Version=4.0.0.0,+Culture=neutral,+PublicKeyToken=31bf3856ad364e35:en-US:4ff39ab4-86bc-4f97-a397-bc04a8fc5f51:ea597d4b:b25378d2;Telerik.Web.UI,+Version=2015.1.225.40,+Culture=neutral,+PublicKeyToken=121fae78165ba3d4:en-US:48e0f2bb-99f7-43cd-9b8e-5b9bce752872:16e4e7cd:f7645509:24ee1bba:c128760b:19620875:874f8ea2:f46195d3:92fe8ea0:fa31b949:4877f69a:490a9d4e:bd8f85e4:6d43f6d9",
    __EVENTTARGET: "",
    __EVENTARGUMENT: "",
    __VIEWSTATE:
      "aE5esBzQ0My6ZEFMphFy6/6q9AOcCwF6nZba5az16fluCuNMnZhw5egGXG7SQZc+uwnn22aH4pZQv4CB8qodZGKhbuVKMuJQGshSzoxI9d8y6IRZgPWmJ0fsIA2BlVNyzoFUBeHV4dJx6jQR/4eP4CSqqG2FiJBaVcznNWsEt/Qhe2urCwqp/yPxf6Nbtp8MEvvT4Zfd/rLRbg274R1GmyKNMtHQGSmnKB6Iwty85NkEGPOl7kkwhmk4of+StP5g3wMcF1EM7sb9RQWe4VnN12nAAJdj2+hXdC3H8Qj0ojROmYnvNJq7zcPzQzUZGo7pPJrk0aWZbQr8nv7QEw7/esVRIUmLUYwEWeovY7qz/yAxvm20+plTSgJcM1XkO5XORyZL7WHv6xnvBcg16/OXyFtYKwXjFxGmkRqcUPI1xgnmUm4vSL5NGenxQ6lxNNOAtmw7Q0wA3oI8lT6zZha6bWj4peQCzjkvJylARkVGgkTEVKxdTzGBhR9KYNNNqe7byMlrx5L6qIoab06Klcu5TExrmkJO+tT/zzFY8oJB8TS7y5pv0x/lLaDAZpg4vKt98Fzv6CQ5VT2YYSPzZ7Gbkt7tNwrE3ab/d9kHAKbGx5C+BaR/LBkUjE7HmhSGQNMvLI9e5cjy4IRLnSWggUqbTWA9v3S4q7A1gLH5O+rjT5sqRzSB4XyqKCBJsjO5LkxlDS+xckj67egH4woYIolqxkgEhdpSZrWE5+FxJt3JFUNABoXvWvJM8UyIz9TuIpTr+9Xx3tQsBq08aI6QGxuJw0kvpjoEz2QjSo5IcoLCY8yw4tBfbCqDn2ae5PKkPm7mxifjddH5M5CtcO0FP6EzNFtB1080qHKYwdfUYThH8La7pJkUACOJJmeTx/amryK8Zh9Eh/rI+A7MJ4hqPj0lfy/34QxXe/7xuVgp/w/0l5DVA3FjXCMsh+9sbr1dBoOU0PFPpQhckViK+THaQRmu4Aqo4ar5UJLV0vRVy9XatzUSlp6P8Ks7RK3MNjWt3R301pvqdLe3aoTht6gsjQsBZaeMwIUKb+IC2Wy+I+j1SfMsGLchi5fneIq7l51WIzvGK8gqZncDl16xuHxCoXY8j1Xx6bOGaxNkY5Cu78znC3C3fC2OidGzYRRz0K2NCx2Rd4Ed7G8xgEv7c1vYs0fWf8KzrFPJxK7wtLa/x+jnZSvPIMVc2T6zXGkVRd2syB47r2fo8VDHYPK74i4dRFtb+hIQkIo2Et4hd3BZnqooi1EWfoBj9hbjYv2uHMz1kcJbXeJEEoEGf9NEi8GC1MqD+Uboozs=",
    __VIEWSTATEGENERATOR: "CA0B0334",
    __VIEWSTATEENCRYPTED: "",
    txtUserName: portUsername,
    txtPassword: portPassword,
    btnLogin: "LOGIN",
    dlgEnginePopupDialog_C_btnClosePopup_ClientState: "",
    dlgEnginePopupDialog_ClientState: "",
    dlgDupCnfrm_C_btnAgree_ClientState: "",
    dlgDupCnfrm_C_btnDisAgree_ClientState: "",
    dlgDupCnfrm_ClientState: "",
    WindowManager_ClientState: "",
  };

  const apiToken=async()=>{
    return new Promise(function(resolve,reject){
      request.post({url:'https://porttruckpassdtr.emodal.com/Default.aspx', formData: formDataa}, function (err, httpResponse, body) {
        if (err) {
          reject(err);
        }
        
        if (httpResponse) {
          let rawHeaders = (httpResponse.rawHeaders);
          const startsWithAuthToken = rawHeaders.filter((element) => element.startsWith("AuthToken"));
          // if there is invalid user name and password, it will break.
          if(startsWithAuthToken.length>0){
            const splitToken=startsWithAuthToken[0].split(/[=;]+/)
            const finalToken=`Bearer ${splitToken[1]}`
            resolve(finalToken);
          }else{
            reject("Authtoken not found")
          } 
        }
      });
    })
  }
  try{
    let token=await apiToken()
    return token
  }catch(error){
    return 
  }
}


module.exports = {
  APM,
  GCT_NY
};
