import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';

interface Images {
  link: string;
}

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
images: Images[] = [];
  cameraImg: string;
  img: string;

constructor(private http: HttpClient, private camera: Camera){
  this.http.get("http://studentapi.myknitu.ru").subscribe(data => {
  this.images = data["images"];})
}
options: CameraOptions = {
  quality: 100,
  targetWidth: 400,
  targetHeight: 400,
  destinationType: this.camera.DestinationType.DATA_URL,
  sourceType: this.camera.PictureSourceType.CAMERA,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE
}
choiceFoto(){
  const options: CameraOptions = {
    quality:100,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    this.img = base64Image;
    }, (err) => {
      console.log(err);
    });
}
loadFoto(){
  const formData = new FormData();
  formData.append('image', this.img);
  this.http.post("http://studentapi.myknitu.ru/send2/", formData, {

  }).subscribe(() => this.refreshImages());
}
base64Load(data) {
const formData = new FormData();
formData.append('image', data.cameraImg);
this.http.post("http://studentapi.myknitu.ru/send2/", formData, {

}).subscribe(() => this.refreshImages());

}
refreshImages(): void {
location.reload();
}
photograph() {
this.camera.getPicture(this.options).then((imageData) => {
let base64Image = 'data:image/jpeg;base64,' + imageData;
this.cameraImg = base64Image;
}, (err) => {
  console.log(err);
}); }
}
