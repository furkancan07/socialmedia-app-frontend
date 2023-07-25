import axios from "axios";


// export const girisYap = async (creds) => {
//     var res = await axios.post('http://localhost:8080/api/auth', {}, {auth: creds});
//     return res;
// }


// login
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

// signUp
export const kaydolma = async (body) => {
    var res = await axios.post('http://localhost:8080/api/users', body)
    return res;
}
// şifre unutma durumunda çalışan servis
export const sifreDegistir=async(body) => {
  var res = await axios.post("http://localhost:8080/api/forgot", body)
  return res;
}
// paylaşımların tamamını getiren servis
export const getPost=async() => {
  var res = await axios.get('http://localhost:8080/api/getShares')
  return res;
}
// paylaşım ekleme
export const postAdd = async (username,body) => {
  var res=await axios.post('http://localhost:8080/api/createShare/'+username,body)
  return res;
}
// paylaşım güncelleme
export const postUpdate=async(id,body) => {
  var res=await axios.put('http://localhost:8080/api/updatedShare/'+id,body);
  return res;
}
// paylaşım silme
export const postDelete=async(id) => {
  var res=await axios.delete('http://localhost:8080/api/deleteShare/'+id);
  return res;
}
// yorum ekleme 
export const commentsAdd = async(username, id, body) => {
  var res = await axios.post('http://localhost:8080/api/addComment/' + username + "/" + id, body);
  return res;
}
// paylaşıma ait like sayısını getiren servis
export const getLikeCount=async (id) => {
  var res = await axios.get('http://localhost:8080/api/getLikeCount/' + id);
  return res;
}
// paylaşımım like ekleyen servis
export const plusLike = async (id) => {
  var res = await axios.put('http://localhost:8080/api/plusLikeCount/' + id);
  return res;
  
}
// like geri alan servis
export const minusLike = async (id) => {
  var res = await axios.put('http://localhost:8080/api/minusLikeCount/' + id);
  return res;
  
}


// profil kısmında sadece kullanıcının paylaşımlarını getiren servis
export const getUserPost = async (username) => {
  const res = await axios.get('http://localhost:8080/api/getUserPost/' + username)
  return res;
  
}

