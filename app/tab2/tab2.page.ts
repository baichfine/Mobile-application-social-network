import { Component } from '@angular/core';
interface Images {
  link: string;
}
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  images: Images[] = [
  {link: 'https://images.wallpaperscraft.ru/image/osen_les_park_128379_320x480.jpg'},
  {link: 'https://images.wallpaperscraft.ru/image/zvezdnoe_nebo_gory_voshod_120808_320x480.jpg'},
  {link: 'https://images.wallpaperscraft.ru/image/les_tuman_derevia_128751_320x480.jpg'},
  {link: 'https://images.wallpaperscraft.ru/image/zvezdnoe_nebo_lodka_otrazhenie_125803_320x480.jpg'},
  {link: 'https://images.wallpaperscraft.ru/image/pirs_prichal_more_sumerki_bereg_118549_320x480.jpg'},
  {link: 'https://images.wallpaperscraft.ru/image/zvezdnoe_nebo_oblaka_zakat_120716_320x480.jpg'},
  {link: 'https://images.wallpaperscraft.ru/image/doroga_razmetka_vecher_oblaka_gorizont_120298_320x480.jpg'},
  {link: 'https://images.wallpaperscraft.ru/image/hram_gory_ozero_127937_320x480.jpg'},
  {link: 'https://images.wallpaperscraft.ru/image/les_tuman_derevia_126479_320x480.jpg'},
  {link: 'https://images.wallpaperscraft.ru/image/tuman_les_tropinka_125819_320x480.jpg'},
  {link: 'https://images.wallpaperscraft.ru/image/zvezdnoe_nebo_noch_derevya_nochnoj_pejzazh_118760_320x480.jpg'},
  {link: 'https://images.wallpaperscraft.ru/image/lodka_gory_ozero_135258_320x480.jpg'},
  {link: 'https://images.wallpaperscraft.ru/image/doroga_derevya_ten_119606_320x480.jpg'},
  {link: 'https://images.wallpaperscraft.ru/image/listya_rastenie_zelenyj_118405_320x480.jpg'},
  {link: 'https://images.wallpaperscraft.ru/image/doroga_razmetka_tuman_gory_dvizhenie_120136_320x480.jpg'},
  ];
  constructor() {}


}
