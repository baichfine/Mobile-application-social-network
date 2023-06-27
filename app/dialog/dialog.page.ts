import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
interface userData {
  to_id: string;
  message: string;
  datetime: string;
  from_id: string;
}

interface Img {
  img: string;
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.page.html',
  styleUrls: ['./dialog.page.scss'],
})
export class DialogPage implements OnInit {
  data: any;
  message: string;
  dataDialog: any;
  fhoto: string;
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, public alertController: AlertController) {
    this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.data = this.router.getCurrentNavigation().extras.state;
          this.getFhoto();
          this.getDialog();
        }
      });

    }
  ngOnInit() {
  }
  back() {
    this.router.navigate(['/tabs/tab3']);
  }

  getFhoto(){
    var token = localStorage.getItem('token');
    this.http.post('http://studentapi.myknitu.ru/getuser/', {
        "token" : token
      }, {headers : {'Content-Type': 'application/json'}}).subscribe((data: Img) => {
        console.log(data);
        this.fhoto = data.img;
       }, error => {
        console.log(error);
      });
  }
  getDialog(){
    var token = localStorage.getItem('token');
  this.http.post('http://studentapi.myknitu.ru/getdialog/', {
      "token" : token,
      "userto": this.data.idUser,
    }, {headers : {'Content-Type': 'application/json'}}).subscribe((data: userData) => {
      console.log(data);
      this.dataDialog = data["messages"];
     }, error => {
      console.log(error);
    });
  }


sendMessage(){
  var token = localStorage.getItem('token');
this.http.post('http://studentapi.myknitu.ru/sendmessage/', {
    "token" : token,
    "userto": this.data.idUser,
    "message": this.message
  }, {headers : {'Content-Type': 'application/json'}}).subscribe((data) => {
    console.log(data);
    this.message= "";
    this.getDialog();
   }, error => {
    console.log(error);
  });
}

}
