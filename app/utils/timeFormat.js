function timeFormat(date) {
  let time = new Date();
  let dd = String(time.getDate()).padStart(2, '0');
  let mm = String(time.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = time.getFullYear();

  const timeRender = `${dd}/${mm}/${yyyy}`

  return timeRender;
}

module.exports = timeFormat;

// function timeFormat(date) {
//   console.log(date);
//   const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//   if (date.getMinutes() < 10) {
//     var minutes = `0${date.getMinutes()}`;
//   } else {
//     minutes = date.getMinutes();
//   }

//   const timeRender = `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}, ${date.getHours()}:${minutes}`;

//   return timeRender;
// }

// module.exports = timeFormat;