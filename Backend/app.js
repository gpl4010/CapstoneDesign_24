const  express = require('express')
const path=require('path')

const app = express();


app.listen(8080,function(){
    console.log('listening on 8080')
});


// 누군가가 @버튼을 누르면 @화면을 띄워주자
// get요청 응답 하는 코드
app.get('/',function(요청, 응답){
    응답.sendFile(path.join(__dirname,"../","Frontend/home",'home.html'))
});
//'/'일경우 홈 화면을 나타냄 home

app.get('/home',function(요청, 응답){
    응답.sendFile(path.join(__dirname,"../","Frontend/home",'home.html'))
});
app.get('/link1',function(요청, 응답){
    응답.sendFile(path.join(__dirname,"../","Frontend",'이론학습.html'))
});

app.get('/link2',function(요청, 응답){
    응답.sendFile(path.join(__dirname,"../","Frontend",'필기문제풀이.html'))
});

app.get('/link3',function(요청, 응답){
    응답.sendFile(path.join(__dirname,"../","Frontend",'실기문제풀이.html'))
});