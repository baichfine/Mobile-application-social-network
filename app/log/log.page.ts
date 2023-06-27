import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

interface RegisterData {
  token: string;
}
interface IData{
    img: string;
    family: string;
    birthday2: string;
    vk: string;
    birthday: string;
    phonenumber: string;
    user: string;
    skype: string;
    login: string;

}
@Component({
  selector: 'app-log',
  templateUrl: './log.page.html',
  styleUrls: ['./log.page.scss'],
})
export class LogPage implements OnInit {

  email : String;
  password : String;
  constructor(private router: Router, private http: HttpClient, public alertController: AlertController) { }

  ngOnInit() {
  }


  toReg(){
    this.router.navigate(['/'])
  }

  log(){
    this.http.post('http://studentapi.myknitu.ru/auth/', {
      "login": this.email,
      "password": this.password
      }, {headers : {'Content-Type': 'application/json'}}).subscribe((data: RegisterData) => {
        console.log(data);
        localStorage.setItem('token', data.token)
        this.router.navigate(['/tabs']);
       }, error => {
        console.log(error);
        this.incorrectPassword()
      });
  }

  async incorrectPassword() {
    const alert = await this.alertController.create({
      header: 'Ошибка',
      message: 'Неверный логин/пароль',
      buttons: ['Ок']
    });

    await alert.present();
  }

}
