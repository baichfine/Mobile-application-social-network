# Mobile-application-social-network
Android Angular js Mobile App. Mobile application social network


1. При входе в приложение открывается страница с предложением зарегистрироваться:
 
При клике на кнопку «Регистрация» происходит запрос на сервер.
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
В случае, если логин пользователя уже зарегистрирован выходит ошибка:
 
Функция обработки ошибки:

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
 

Далее, пользователю предлагается авторизоваться (появляется вкладка со входом). Также, в случае, если пользователь уже зарегистрирован, имеется возможность кликнуть на кнопку после кнопки регистрации:


2. Авторизация

При успешной регистрации или при существовании логина пользователю предлагается ввести данные и войти в приложение.
 
Функция, реализующая вход в приложение:

  log(){
    this.http.post('http://studentapi.myknitu.ru/auth/', {
      "login": this.email,
      "password": this.password
      }, {headers : {'Content-Type': 'application/json'}}).subscribe((data: RegisterData) => {
        console.log(data);
        localStorage.setItem('token', data.token)
        this.getData();
        this.router.navigate(['/tabs']);
       }, error => {
        console.log(error);
        this.incorrectPassword()
      });
  }
В случае, если пользователь ввел неправильные данные для авторизации, запускается функция обработки при ошибке:

 
Код функции:

  async incorrectPassword() {
    const alert = await this.alertController.create({
      header: 'Ошибка',
      message: 'Неверный логин/пароль',
      buttons: ['Ок']
    });

 

3. Получение данных пользователя

В случае успешной авторизации сразу следует запрос для получения данных. Код запроса:

  getData(){
    var token = localStorage.getItem('token');
    this.http.post('http://studentapi.myknitu.ru/getuser/', {
        "token" : token
      }, {headers : {'Content-Type': 'application/json'}}).subscribe((data: IData) => {

        console.log(data);
        this.email = data.login;
       }, error => {
        console.log(error);
      });
  }

4. На имеющейся вкладке Профиль заменим статичные данные на ответ от сервера при запросе к getUser:


С помощью функции getData() получаем данные о пользователе:
  
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

5. Получение списка всех пользователей
Список всех пользователей отображен на вкладке Контакты. Запрос к серверу выполняется при переходе на главную вкладку:

Данные всех пользователей получаем с помощью функции getData ()
    
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

6. Получение пользователя по ID
	Вверху вкладки Контакты расположено поле поиска пользователя по ID. Для получения информации о пользователе необходимо ввести ID и нажать на кнопку «Поиск». Если сервер находит ID в базе данных, то перед заголовком «Пользователи» появляется пункт «Результаты поиска», в блок которого выводится найденное совпадение. Иначе, появляется предупреждение об ошибке:
  
Получение информации он конкретном пользователе по его ID выполняет функция search:

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

7. Редактирование своих данных
На вкладке «Профиль» также реализована возможность редактирования данных. Для сохранения изменений требуется нажать кнопку ниже: 
 
Данные редактируются с помощью функции dataChange()
 
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

8. Смена аватарки.

Для изменения аватарки достаточно кликнуть по кнопкам «Сменить фото» или «Создать фото»:

За выполнение сценария отвечает функция choiseFoto():
 
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

9. Отправка сообщения
Для реализации переписки является необходимым создать новое окно-вкладку: 
 
Функция, написанная для отправки сообщений sendMessage:
 
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

10. Получение диалога с пользователем
Воспользовавшись предыдущей вкладкой, создадим функцию, которая при активности данного окна отправит запрос на получение диалога с сервера.
 
Функция getDialog() выполняет запрос на историю сообщений с собеседником:

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
