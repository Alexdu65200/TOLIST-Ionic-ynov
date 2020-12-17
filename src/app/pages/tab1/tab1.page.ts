import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ListService } from './../../services/lists.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public _list:ListService, private router:Router,private alertController: AlertController) {}

  async addList() {
    
    const alert = await this.alertController.create({
      header: 'Nouvelle liste',
      inputs:[
        {
          name:'title',
          type:'text',
          placeholder:'Nom de la liste'
        }
      ],
      buttons: [
        {
          text:'Annuler',
          role:'cancel',
          handler:()=>console.log("Annuler")
        },
        {
          text:'Créer',
          handler:(data)=>{
            if(data.title.length===0){
              return;
            }else{
              const id=this._list.createList(data.title);
              console.log(id);
              
              this.router.navigateByUrl(`/tabs/tab1/add/${id}`);
            }
          }
        }
      ]
    });

    alert.present();
    
  }



}
