const responseSuccess = (data, message)=> {
  return { 
    success: true,
    data:data,
    message: message
  }
}

const responseError = (message)=>{
  return { 
    success: false,
    error_message: message
  }
}

module.exports = {responseError, responseSuccess}
