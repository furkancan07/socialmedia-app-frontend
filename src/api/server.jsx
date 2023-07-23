import axios from "axios";


// export const girisYap = async (creds) => {
//     var res = await axios.post('http://localhost:8080/api/auth', {}, {auth: creds});
//     return res;
// }
export const girisYap = async (creds) => {
  // Base64 encode kullanıcı adı ve şifre
  const encodedCredentials = btoa(creds.username + ':' + creds.sifre);

  // Authorization başlığını headers içine ekleyin
  const headers = {
    'Authorization': 'Basic ' + encodedCredentials
  };

  // API çağrısını gerçekleştirin
  try {
    const response = await axios.post('http://localhost:8080/api/auth', {}, { headers });
    return response;
  } catch (error) {
    throw error;
  }
};


export const kaydolma = async (body) => {
    var res = await axios.post('http://localhost:8080/api/users', body)
    return res;
}

export const sifreDegistir=async(body) => {
  var res = await axios.post("http://localhost:8080/api/forgot", body)
  return res;
}

