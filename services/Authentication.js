import axios from 'axios'

export default {
  login(email, password, callback) {
    axios.post('http://localhost:3000/api/login', {
        email: email,
        password: password
    })
    .then((response) => {
        if(response.data.success == false) {
          let auth = {
            status: response.data.success,
            message: response.data.message
          }
          callback(auth)
        } else {
            let auth = {
              status: response.data.success,
              message: response.data.message,
              accessToken: response.data.token,
              user: response.data.user
            }
            callback(auth)
        }
    })
    .catch(function(error){
      console.log(error)
    })
  },

  register(email, password, callback) {
    axios.post('http://localhost:3000/api/register', {
      email: email,
      password: password
    })
  .then((response) => {
    if(response.data.success == false) {
      let auth = {
        status: response.data.success,
        message: response.data.message
      }
      callback(auth)
    } else {
      let auth = {
        status: response.data.success,
        message: response.data.message
      }
      callback(auth)
    }
  })
  .catch(function(error){
    console.log(error)
  })
  }
}
