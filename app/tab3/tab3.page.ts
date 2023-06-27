import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

interface IData{
    family: string;
    img: string;
    vk: string;
    birthday: string;
    phonenumber: string;
    user: string;
    skype: string;
    id: string;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  data: [];
  id: string;
  searchID: boolean;
  userID: {};

constructor(private router: Router, private http: HttpClient, public alertController: AlertController) {
this.getData();
}
goDialog(id, name, fhoto) {
    let navigationExtras: NavigationExtras = {
      state: {
        idUser: id,
        nameUser: name,
        fhotoUser: fhoto
      }
    };
    this.router.navigate(['/dialog'], navigationExtras);
}
  getData(){
      var token = localStorage.getItem('token');
      this.http.post('http://studentapi.myknitu.ru/listusers/', {
          "token" : token
        }, {headers : {'Content-Type': 'application/json'}}).subscribe((data: IData) => {
          console.log(data);
          this.data = data["users"];
         }, error => {
          console.log(error);
        });
    }

    search(){
    var token = localStorage.getItem('token');
    this.http.post('http://studentapi.myknitu.ru/getuserwithid/', {
      "token" : token,
      "userid": this.id
      }, {headers : {'Content-Type': 'application/json'}}).subscribe((data) => {
        console.log(data);
        this.userID = data;
        this.searchID = true;
       }, error => {
        console.log(error);
        this.incorrectID();
        this.searchID = false;
      });
  }

  async incorrectID() {
  const alert = await this.alertController.create({
    header: 'Ошибка',
    message: 'Неверный ID. Такого пользователя нет.',
    buttons: ['Ок']
  });

  await alert.present();
}
}
