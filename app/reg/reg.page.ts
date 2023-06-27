import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

interface IRegloadData {
  token: string;
  login: string;
}
@Component({
  selector: 'app-reg',
  templateUrl: './reg.page.html',
  styleUrls: ['./reg.page.scss'],
})
export class RegPage implements OnInit {

  email : String;
  password : String;


  constructor(private router: Router, private http: HttpClient, private alertController: AlertController) { }

  ngOnInit() {
  }

  LogPage(){
    this.router.navigate(['/log'])
  }


Reg(){
  console.log(this.email);
    console.log(this.password);
      this.http.post('http://studentapi.myknitu.ru/register/', {
      "login": this.email,
      "password": this.password
      }, {headers : {'Content-Type': 'application/json'}}).subscribe((data: IRegloadData) => {
        console.log(data);
        localStorage.setItem('token', data.token)
        this.router.navigate(['/log'])
       }, error => {
        this.alreadyExist();
      });
}

async alreadyExist() {
  const alert = await this.alertController.create({
    header: 'Ошибка регистрации',
    message: 'Данный пользователь уже существует.',
    cssClass: 'alertcss',
    buttons: [{
      text: 'Ок',
      cssClass: 'buttoncss'
    }]
});

  await alert.present();
}


}
