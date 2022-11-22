//產生變數，生成大小不一，不同位置，相同模樣的臉
//var face_size, face_x,  face_y
var face_x = []
var face_y = []
var face_size = []
var face_num = 5//產生5個相同圖形
var color = []
var music_btn = []
var mouse_btn = []
var Speech_btn = []

var myRec = new p5.SpeechRec()
var result = []
//宣告變數加入音樂
var song
var songIsplay=false//設定此變數為false,收到按下滑鼠把變數改為true,音樂播放
var amp
var vol
function preload(){
  song = loadSound("music_p5.mp3");
}

function mousePressed()
{
  //if(!songIsplay){
    //song.play()
    //songIsplay = true
    //amp=new p5.Amplitude()

  //}
  //else{
    //song.pause()
    //songIsplay = false

  //}
  
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  angleMode(DEGREES)
  //第一個按鈕
  music_btn = createButton("play music")
  music_btn.position(10,10)
  music_btn.size(250, 100);
  music_btn.style('background-color', '#a2d2ff');
  music_btn.style('font-size', '30px');
  music_btn.style('color', '#118ab2');
  music_btn.mousePressed(music_btn_pressed)//music_btn被按下時,要到music_btn_pressed產生音樂
 
  //第二個按鈕
  mouse_btn = createButton("stop music")
  mouse_btn.position(300,10)
  mouse_btn.size(250, 100);
  mouse_btn.style('background-color', '#a2d2ff');
  mouse_btn.style('font-size', '30px');
  mouse_btn.style('color', '#118ab2');
  mouse_btn.mousePressed(mouse_btn_pressed)
  
  //第三個按鈕
  Speech_btn = createButton("語音辨識  (跳舞/停止)")
  Speech_btn.position(590,10)
  Speech_btn.size(250, 100);
  Speech_btn.style('background-color', '#a2d2ff');
  Speech_btn.style('font-size', '20px');
  Speech_btn.style('color', '#118ab2');
  Speech_btn.mousePressed(Speech_btn_pressed)


for(var i=0;i<face_num;i++){
  face_size[i] = random(100,400)//臉的大小100~400
  face_x[i] = random(100,width)
  face_y[i] = random(250,height)
  color = random(0,255)
  }
}

function music_btn_pressed(){
  song.stop()
  song.play()
  songIsplay = true
  amp=new p5.Amplitude()
  music_btn.style('background-color', '#a2d2ff')
  mouse_btn.style('background-color', 'black')
  Speech_btn.style('background-color', 'black')
}
function mouse_btn_pressed(){
  song.pause()
  songIsplay = false
  music_btn.style('background-color', 'black')
  mouse_btn.style('background-color', '#a2d2ff')
  Speech_btn.style('background-color', 'black')
}
function Speech_btn_pressed(){
  music_btn.style('background-color', 'black')
  mouse_btn.style('background-color', 'black')
  Speech_btn.style('background-color', '#a2d2ff')
  myRec.onResult = showResult;
  myRec.start(); 
}
function showResult(){
  if(myRec.resultValue==true) {
    result = myRec.resultString
      if(myRec.resultString==="跳舞")
         {
             music_btn_pressed()
          }
      if(myRec.resultString==="停止")
         {

           mouse_btn_pressed()
          }
}
}

function draw() {
  background("#ffe6a7");//背景
  push()
    textSize(50)
    fill(255,0,0)  
    text(result,1100,100);   
  pop()
    
  for(var j=0;j<face_num;j++){
    push()
      var f_s = face_size[j]
        translate(face_x[j],face_y[j])//將圓心(0,0)移動到畫布正中心
        noStroke()//去除框線
        //身體
        if(!songIsplay){
        fill(78,188,224)//身體顏色
        stroke(0)
        strokeWeight(0.5)
        ellipse(-f_s/2,0,f_s/2,f_s/2)
        ellipse(f_s/2,0,f_s/2.85,f_s/2)
        noStroke()
        rectMode(CENTER)//將原點設在方形中心
        rect(0,0,f_s,f_s/2)
        }
        else{
          vol = amp.getLevel()
          console.log(vol)
          stroke(0)
          strokeWeight(0.5)
          fill(78,188,224)//身體顏色
          ellipse(-f_s/2,0,f_s/2+map(vol,0,0.25,f_s/5,f_s/10),f_s/2)
          ellipse(f_s/2,0,f_s/2.85+map(vol,0,0.5,f_s/5,f_s/10),f_s/2-f_s/400)
          noStroke()
          rectMode(CENTER)//將原點設在方形中心
          rect(0,0,f_s,f_s/2)
        }
        //尾巴
        //stroke(0)
        if(!songIsplay){
        fill(78,188,224)
        beginShape()
          curveVertex(f_s/8,f_s)
          curveVertex(f_s/2,-f_s/4)   
          curveVertex(f_s/1.6,0)
          curveVertex(f_s/8,f_s)
        endShape()
        }
        else{
          vol = amp.getLevel()
          console.log(vol)
          fill(78,188,224)
          beginShape()
            curveVertex(f_s/8+map(vol,0,0.05,f_s/5,f_s/10),f_s+map(vol,0,0.25,f_s/5,f_s/10))
            curveVertex(f_s/2-f_s/8+map(vol,0,0.5,f_s/5,f_s/10),-f_s/4)   
            curveVertex(f_s/1.6-f_s/8+map(vol,0,0.5,f_s/5,f_s/10),0)
            curveVertex(f_s/8+map(vol,0,0.05,f_s/5,f_s/10),f_s+map(vol,0,0.25,f_s/5,f_s/10))
          endShape()
        }
        //耳朵
        if(!songIsplay){
        stroke(0)
        fill(78,188,224)
        beginShape()
          curveVertex(-f_s/2.22,f_s/4*5)
          curveVertex(-f_s/1.74,-f_s/5)
          curveVertex(-f_s/3.33,-f_s/5)
          curveVertex(-f_s/2.22,f_s/4*5)
        endShape()
        }
        else{
          vol = amp.getLevel()
          console.log(vol)
          stroke(0)
          fill(78,188,224)
          beginShape()
            curveVertex(-f_s/2.22+map(vol,0,0.25,f_s/5,f_s/10),f_s/4*5)
            curveVertex(-f_s/1.74+f_s/8-map(vol,0,0.5,f_s/5,f_s/10),-f_s/5)
            curveVertex(-f_s/3.33+f_s/8-map(vol,0,0.5,f_s/5,f_s/10),-f_s/5)
            curveVertex(-f_s/2.22+map(vol,0,0.25,f_s/5,f_s/10),f_s/4*5)
          endShape()
        }
        noStroke()
        //身體紋路(左到右)
        if(!songIsplay){//驚嘆號代表反向，與之相反
        fill(55,140,182)
        beginShape()
          curveVertex(-f_s/3.8,-f_s/4*5)
          vertex(-f_s/3.8,-f_s/4)
          vertex(-f_s/5.33,-f_s/4)
          curveVertex(-f_s/3.8,-f_s/4*5)
        endShape()
        beginShape()
          curveVertex(-f_s/7.27,-f_s/4*5)
          vertex(-f_s/7.27,-f_s/4)
          vertex(-f_s/16,-f_s/4)
          curveVertex(-f_s/7.27,-f_s/4*5)
        endShape()
        beginShape()
          curveVertex(f_s/80,-f_s/4*5)
          vertex(f_s/80,-f_s/4)
          vertex(f_s/11.4,-f_s/4)
          curveVertex(f_s/80,-f_s/4*5)
        endShape()
        beginShape()
          curveVertex(f_s/7.27,-f_s/4*5)
          vertex(f_s/7.27,-f_s/4)
          vertex(f_s/4.7,-f_s/4)
          curveVertex(f_s/7.27,-f_s/4*5)
        endShape()
        beginShape()
          curveVertex(f_s/3.47,-f_s/4*5)
          vertex(f_s/3.47,-f_s/4)
          vertex(f_s/2.75,-f_s/4)
          curveVertex(f_s/3.47,-f_s/4*5)
        endShape()
        beginShape()
          curveVertex(f_s/2.35,-f_s/4*5)
          vertex(f_s/2.35,-f_s/4)
          vertex(f_s/2,-f_s/4)
          curveVertex(f_s/2.35,-f_s/4*5)
        endShape()
        } 
        else{
          vol = amp.getLevel()
          console.log(vol)
          fill(55,140,182)
        beginShape()
          curveVertex(-f_s/3.8+f_s/10-map(vol,0,0.25,f_s/5,f_s/10),-f_s/4*5+map(vol,0,0.05,f_s/5,f_s/10))
          vertex(-f_s/3.8+f_s/10-map(vol,0,0.25,f_s/5,f_s/10),-f_s/4)
          vertex(-f_s/5.33+f_s/10-map(vol,0,0.25,f_s/5,f_s/10),-f_s/4)
          curveVertex(-f_s/3.8+f_s/10-map(vol,0,0.25,f_s/5,f_s/10),-f_s/4*5+map(vol,0,0.05,f_s/5,f_s/10))
        endShape()
        fill(55+map(vol,0,0.5,f_s/5,f_s/10),140+map(vol,0,0.05,f_s/5,f_s/10),182+map(vol,0,0.05,f_s/5,f_s/10))
        beginShape()
          curveVertex(-f_s/7.27+f_s/10-map(vol,0,0.25,f_s/5,f_s/10),-f_s/4*5)
          vertex(-f_s/7.27+f_s/10-map(vol,0,0.25,f_s/5,f_s/10),-f_s/4)
          vertex(-f_s/16+f_s/10-map(vol,0,0.25,f_s/5,f_s/10),-f_s/4)
          curveVertex(-f_s/7.27+f_s/10-map(vol,0,0.25,f_s/5,f_s/10),-f_s/4*5)
        endShape()
        fill(55,140,182)
        beginShape()
          curveVertex(f_s/80+f_s/10-map(vol,0,0.25,f_s/5,f_s/10),-f_s/4*5+map(vol,0,0.05,f_s/5,f_s/10))
          vertex(f_s/80+f_s/10-map(vol,0,0.25,f_s/5,f_s/10),-f_s/4)
          vertex(f_s/11.4+f_s/10-map(vol,0,0.25,f_s/5,f_s/10),-f_s/4)
          curveVertex(f_s/80+f_s/10-map(vol,0,0.25,f_s/5,f_s/10),-f_s/4*5+map(vol,0,0.05,f_s/5,f_s/10))
        endShape()
        fill(55,140+map(vol,0,0.05,f_s/5,f_s/10),182)
        beginShape()
          curveVertex(f_s/7.27-f_s/10+map(vol,0,0.25,f_s/5,f_s/10),-f_s/4*5)
          vertex(f_s/7.27-f_s/10+map(vol,0,0.25,f_s/5,f_s/10),-f_s/4)
          vertex(f_s/4.7-f_s/10+map(vol,0,0.25,f_s/5,f_s/10),-f_s/4)
          curveVertex(f_s/7.27-f_s/10+map(vol,0,0.25,f_s/5,f_s/10),-f_s/4*5)
        endShape()
        fill(55,140,182)
        beginShape()
          curveVertex(f_s/3.47-f_s/10+map(vol,0,0.25,f_s/5,f_s/10),-f_s/4*5+map(vol,0,0.05,f_s/5,f_s/10))
          vertex(f_s/3.47-f_s/10+map(vol,0,0.25,f_s/5,f_s/10),-f_s/4)
          vertex(f_s/2.75-f_s/10+map(vol,0,0.25,f_s/5,f_s/10),-f_s/4)
          curveVertex(f_s/3.47-f_s/10+map(vol,0,0.25,f_s/5,f_s/10),-f_s/4*5+map(vol,0,0.05,f_s/5,f_s/10))
        endShape()
        fill(55+map(vol,0,0.5,f_s/5,f_s/10),140+map(vol,0,0.5,f_s/5,f_s/10),182+map(vol,0,0.05,f_s/5,f_s/10))
        beginShape()
          curveVertex(f_s/2.35-f_s/10+map(vol,0,0.25,f_s/5,f_s/10),-f_s/4*5)
          vertex(f_s/2.35-f_s/10+map(vol,0,0.25,f_s/5,f_s/10),-f_s/4)
          vertex(f_s/2-f_s/10+map(vol,0,0.25,f_s/5,f_s/10),-f_s/4)
          curveVertex(f_s/2.35-f_s/10+map(vol,0,0.25,f_s/5,f_s/10),-f_s/4*5)
        endShape()
        }
        //眼睛
        if(!songIsplay){
        fill(0)
        ellipse(-f_s/1.81+map(mouseX,0,width,-f_s/400,f_s/40),-f_s/40+map(mouseY,0,height,-f_s/40,f_s/40),f_s/13.33,f_s/8.88)
        }
        else{
          vol = amp.getLevel()
          console.log(vol)
          fill(0)
          ellipse(-f_s/1.81+map(mouseX,0,width,-f_s/400,f_s/40)+f_s/10-map(vol,0,0.5,f_s/5,f_s/10),-f_s/40+map(mouseY,0,height,-f_s/40,f_s/40),f_s/13.33,f_s/8.88)
          } 
        
        //腳
        fill(78,190,227)
        ellipse(-f_s/2.22-random(-5,5),f_s/3.7,f_s/10,f_s/6.15)
        ellipse(-f_s/4-random(-5,5),f_s/3.7,f_s/10,f_s/6.15)
        ellipse(-f_s/20-random(-5,5),f_s/3.7,f_s/10,f_s/6.15)
        ellipse(f_s/6.15-random(-5,5),f_s/3.7,f_s/10,f_s/6.15)
        ellipse(f_s/2.75-random(-5,5),f_s/3.7,f_s/10,f_s/6.15)
        ellipse(f_s/1.9-random(-5,5),f_s/3.7,f_s/10,f_s/6.15) 
        //腮紅
        if(!songIsplay){
        fill(252,93,98) 
        ellipse(-f_s/2.22,f_s/20,f_s/10,f_s/20)  
        }
        else{
          vol = amp.getLevel()
          console.log(vol)
          fill(252,93,98) 
          ellipse(-f_s/2.22+f_s/10-map(vol,0,0.5,f_s/5,f_s/10),f_s/20,f_s/10,f_s/20)  
        }
        //嘴巴
        if(!songIsplay){
        fill(0)
        arc(-f_s/1.428,f_s/40,f_s/10,f_s/10,0,180)//下弧
        fill(78,188,224)
        arc(-f_s/1.428,f_s/40,f_s/10-3,f_s/13,0,180)//上弧
        if(mouseIsPressed)
        {   //mouseIsPressed為true，代表有按下滑鼠
          fill(252,93,98)
          arc(-f_s/1.428,f_s/40,f_s/10,f_s/10,0,180) //上弧

        }
        else
        {   //mouseIsPressed為false，代表沒有按下滑鼠
          fill(0)
            arc(-f_s/1.428,f_s/40,f_s/10,f_s/10,0,180)//下弧
            fill(78,188,224)
            arc(-f_s/1.428,f_s/40,f_s/10-3,f_s/13,0,180)//上弧
        }
        }
        else{
          vol = amp.getLevel()
          console.log(vol)
        fill(0)
        arc(-f_s/1.428+f_s/10-map(vol,0,0.5,f_s/5,f_s/10),f_s/40,f_s/10,f_s/10,0,180)//下弧
        fill(78,188,224)
        arc(-f_s/1.428+f_s/10-map(vol,0,0.5,f_s/5,f_s/10),f_s/40,f_s/10-3,f_s/13,0,180)//上弧
          if(mouseIsPressed)
        {   //mouseIsPressed為true，代表有按下滑鼠
          fill(252,93,98)
          arc(-f_s/1.428+f_s/10-map(vol,0,0.5,f_s/5,f_s/10),f_s/40,f_s/10,f_s/10,0,180) //上弧

        }
        else
        {   //mouseIsPressed為false，代表沒有按下滑鼠
          fill(0)
            arc(-f_s/1.428+f_s/10-map(vol,0,0.5,f_s/5,f_s/10),f_s/40,f_s/10,f_s/10,0,180)//下弧
            fill(78,188,224)
            arc(-f_s/1.428+f_s/10-map(vol,0,0.5,f_s/5,f_s/10),f_s/40,f_s/10-3,f_s/13,0,180)//上弧
        }
        }

    noFill()    
      pop()
  }
}
