import axios from '@/plugins/axios'

export default {
  login(email, password, callback) {
    axios.post('api/login', {
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

  register(email, password, username, callback) {
    axios.post('api/register', {
      email: email,
      password: password,
      username: username
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
