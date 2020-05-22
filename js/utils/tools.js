export const formatDate = date => {
  var date = new Date(date);
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};
