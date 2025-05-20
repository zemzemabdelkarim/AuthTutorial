export const errorHandler = (statusCode, message)=>{
  console.error("errorHandler is working");

  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  
  return error;
}