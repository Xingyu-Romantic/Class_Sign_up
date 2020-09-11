# #小程序云开发挑战赛#-校园缺勤录-这未免有点

>Author :  邺调
>
>Email ： a940858626@qq.com

## 目的

人工智能先进技术引入课堂，实现轻松课堂签到。

## 应用场景

大学校园课堂

## 主要功能
1. 通过教师在课堂上对全体同学拍一张照片，进行人脸识别，与云端课堂人脸数据进行匹配。从而判断缺勤人员。
2. 将缺勤人员存入数据库，方便查询

## 实现思路

1. 通过摄像头拍照，通过后端API对人脸进行识别。
2. 将识别到的人脸信息，通过前端填写姓名，学号并存入数据库。
3. 通过摄像头拍照，对人脸识别，与数据库班级内人脸信息对比，进行人脸签到

## 软件截图

<img src="https://i.loli.net/2020/09/11/cBfAK615UWPoYeS.png" style="zoom: 25%;" />



<img src="https://i.loli.net/2020/09/11/ijNbJFXlqMBZUIY.png" style="zoom:25%;" />

![](https://i.loli.net/2020/09/11/Q63cHdKt9MausZD.png)



<img src="https://i.loli.net/2020/09/11/qLgNkod213DIwv8.png" style="zoom:25%;" />

## 软件体验二维码

![](https://i.loli.net/2020/09/11/FeJbhWIv8usLrfj.jpg)



## 部署教程

1. Nginx 1.18.0    MySQL 5.6.49    PHP-7.4     phpMyAdmin 5.0   
2. python库   Flask  face_recognition   qiniu  opencv  numpy weixin  pymysql
3. 数据库 ： Face_recognition  Signin_Data   Face_Data
4. 代码在Code文件中，直接导入微信小程序







