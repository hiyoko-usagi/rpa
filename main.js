const rhrSelect = document.getElementById('rhrSelect');
const analysisButton = document.getElementById('analysisButton');
const result = document.getElementById('result');
const reloadButton = document.getElementById('reloadButton');
let selectRhrValue;
let section;
let h3;
let h4;
let p;

//DATA
const itemName = ["安静時心拍数","分類","人口に対する割合","GFP値"];
const classNamber = [0,0,0,0,0,1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,6,6,6,6,6,7,7,7,7,7,8,8,8,8,8];
const aboutItems = [
 "安静時心拍数（Resting Heart Rate, RHR）は、身体が完全に安静で、外的刺激や運動がない状態で測定される心拍数を指す。心血管系の健康、体力、自律神経系の機能などを反映する重要な指標である。RPAでは安静時心拍数を人格を推定するための指標としている。",
 "安静時心拍数を基に割り出したあなたのタイプ。一般的に似たタイプの人と仲良くなる傾向にある。逆に、かけ離れたタイプの人とは仲良くなる可能性は低いということでもある。",
 "上記で示された分類が全体の中でどれくらいの比率を占めているかを示している。同類がどれぐらいの割合いるのか、という指標と考えてもらって良い。",
 "General Factor of Personalityの略。人格一般因子。数値が高いほど外向性、開放性、誠実性、協調性、情動安定性、認知能力が高く、逆に低いほど外向性、開放性、誠実性、協調性、情動安定性、認知能力が低い。元々、GFPは、ビッグファイブ（外向性、開放性、誠実性、協調性、神経症傾向）を加工して、1つの因子にまとめたものであるが、RPAでは神経症傾向を情動安定性とし、認知能力を合わせたものをGFP値としている。"
];

//////分析開始関数
function StartAnalysis (){
 //選択したRHRの値を取得し変数に格納
 selectRhrValue =  Number(rhrSelect.options[rhrSelect.selectedIndex].value);
 
 //条件に従いHTML要素を生成
 if(isNaN(selectRhrValue)){
  reload();
 }else{
  createHtml(selectRhrValue);
 }
}

//////HTML生成関数
function createHtml (value){
 //項目の数だけ繰り返し処理を行う
 for(let i = 0; i < itemName.length; i++){
  section = document.createElement('section');
  h3 = document.createElement('h3');
  h4 = document.createElement('h4');
  p = document.createElement('p');
  result.appendChild(section);
  section.appendChild(h3);
  section.appendChild(h4);
  section.appendChild(p);

  //項目名の挿入
  h3.innerHTML = itemName[i];

  //各項目の結果の挿入
  switch(i){
   case 0:
    rhrValue(value);
    break;
   case 1:
    ConvertToClassification(value);
    break;
   case 2:
    ConvertNumbersToPopulationRatioRatings(value);
    break;
   default:
    gfp(value);
    break;
  }

  //項目の概要の挿入
  p.innerHTML = aboutItems[i];

  //ドロップリストと分析ボタンを非表示にする
  rhrSelect.style.display = "none";
  analysisButton.style.display = "none";
 
  //結果と再読み込みボタンの表示
  result.style.display = null;
  reloadButton.style.display = null;
 }
}

//////ドロップリストで選択された値を基にHTMLを生成する関数
function rhrValue (value){
 if(value === 50){
  h4.innerHTML = value + "以下";
 }else if(value === 100){
  h4.innerHTML = value + "以上";
 }else{
  h4.innerHTML = value;
 }
}

//////値を分類に変換する関数
function ConvertToClassification (value){
 if(50 <= value && value <= 54){
  h4.innerHTML = "A";
 }else if(55 <= value && value <= 59){
  h4.innerHTML = "B";
 }else if(60 <= value && value <= 64){
  h4.innerHTML = "C";
 }else if(65 <= value && value <= 69){
  h4.innerHTML = "D";
 }else if(70 <= value && value <= 80){
  h4.innerHTML = "E";
 }else if(81 <= value && value <= 85){
  h4.innerHTML = "F";
 }else if(86 <= value && value <= 90){
  h4.innerHTML = "G";
 }else if(91 <= value && value <= 95){
  h4.innerHTML = "H";
 }else{
  h4.innerHTML = "I";
 }
}

//////値を人口比率評価に変換する関数
function ConvertNumbersToPopulationRatioRatings (value){
 if(50 <= value && value <= 54 || 96 <= value && value <= 100){
  h4.innerHTML = "非常に少ない";
 }else if(55 <= value && value <= 59 || 91 <= value && value <= 95){
  h4.innerHTML = "とても少ない";
 }else if(60 <= value && value <= 64 || 86 <= value && value <= 90){
  h4.innerHTML = "少ない";
 }else if(65 <= value && value <= 69 || 81 <= value && value <= 85){
  h4.innerHTML = "やや少ない";
 }else{
  h4.innerHTML = "平均";
 }
}

//////GFP
function gfp (value){
 if(50 <= value && value <= 54){
  h4.innerHTML = "100";
 }else if(55 <= value && value <= 59){
  h4.innerHTML = "90";
 }else if(60 <= value && value <= 64){
  h4.innerHTML = "80";
 }else if(65 <= value && value <= 69){
  h4.innerHTML = "70";
 }else if(70 <= value && value <= 74){
  h4.innerHTML = "60";
 }else if(75 <= value && value <= 79){
  h4.innerHTML = "50";
 }else if(80 <= value && value <= 84){
  h4.innerHTML = "40";
 }else if(85 <= value && value <= 89){
  h4.innerHTML = "30";
 }else if(90 <= value && value <= 94){
  h4.innerHTML = "20";
 }else{
  h4.innerHTML = "10";
 }
}

//////再読み込み関数
function reload (){
 window.location.reload();
}

//各ボタンにクリックイベントを設定
analysisButton.addEventListener('click',StartAnalysis);
reloadButton.addEventListener('click',reload);
