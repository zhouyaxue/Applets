function ricril(){
  var time = "05:24";
  var time2 = "19:03";
  var e1 = toTransHours(time);
  var e2 = toTransHours(time2);
  var cz = e2 - e1;
  var dushu = 180 / cz;
  var date = new Date();
  var dateHours = date.getHours();//当前时间的小时
  var time3 = dateHours;
  var nee = time3 - e1;
  var zdushu = nee * dushu;
  console.log(zdushu);
}
ricril()