import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';

interface IData{
    family: string;
    img: string;
    vk: string;
    birthday: string;
    phonenumber: string;
    user: string;
    skype: string;
    login: string;
}
interface Datas {
  name: string;
  dataName: string;
  symbal: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  data: Datas[] = [];
  fhoto: string;
  letter: boolean;
  img: string;
  change: number;

  constructor(private router: Router, private http: HttpClient, public alertController: AlertController, private camera: Camera) {
  this.getData();
 }

choiceFoto(yes){
   if (yes == true) this.change = this.camera.PictureSourceType.CAMERA;
   else this.change = this.camera.PictureSourceType.PHOTOLIBRARY;
   const options: CameraOptions = {
     quality:100,
     destinationType: this.camera.DestinationType.DATA_URL,
     sourceType: this.change,
     encodingType: this.camera.EncodingType.JPEG,
     mediaType: this.camera.MediaType.PICTURE
   }
   this.camera.getPicture(options).then((imageData) => {
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.img = base64Image;
     this.loadFoto();
     }, (err) => {
       console.log(err);
     });
 }
loadFoto(){
   var token = localStorage.getItem('token');
   this.http.post('http://studentapi.myknitu.ru/updateuserimage/', {
       "token" : token,
       "img": this.img,
     }, {headers : {'Content-Type': 'application/json'}}).subscribe((data) => {
       console.log(data);
       this.fhoto = this.img;
      }, error => {
       console.log(error);
     });
 }
getData(){
      var token = localStorage.getItem('token');
      this.http.post('http://studentapi.myknitu.ru/getuser/', {
          "token" : token
        }, {headers : {'Content-Type': 'application/json'}}).subscribe((data: IData) => {
          console.log(data);
          this.fhoto = data.img;
          this.letter = false;
          this.data = [{name:"Фамилия", dataName: data.family, symbal: "body"},
          {name:"Страница Вконтакте", dataName: data.vk, symbal: "logo-vk"},
          {name:"Дата рождения", dataName: data.birthday, symbal: "gift"},
          {name:"Номер телефона", dataName: data.phonenumber, symbal: "call"},
          {name:"Пользователь", dataName: data.user, symbal: "person"},
          {name:"Skype", dataName: data.skype, symbal: "logo-skype"},
          {name:"Логин", dataName: data.login, symbal: "key"},];
         }, error => {
          console.log(error);
        });

    }
dataChange(){
  var token = localStorage.getItem('token');
  this.http.post('http://studentapi.myknitu.ru/userupdate/', {
      "token" : token,
      "nameuser":this.data[4].dataName,
      "family": this.data[0].dataName,
      "birthday": this.data[2].dataName,
      "phonenumber": this.data[3].dataName,
      "vk": this.data[1].dataName,
      "skype":this.data[5].dataName
    }, {headers : {'Content-Type': 'application/json'}}).subscribe((data) => {
      console.log(data);
      this.letter = true;
     }, error => {
      console.log(error);
    });
  }
}
