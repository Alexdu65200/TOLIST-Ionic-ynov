import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ListService } from './../../services/lists.service';
import { AlertController, IonList } from '@ionic/angular';
import { List } from './../../models/list.model';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {

  @ViewChild(IonList) listIon:IonList;
  @Input()finish=true;

  constructor(public _list:ListService,private router:Router,private alertController:AlertController) { }

  ngOnInit() {}

  showList(id:number){
    this.router.navigateByUrl(`/tabs/${(this.finish)?'tab2':'tab1'}/add/${id}`);
  }

  deleteList(id:number){ 
    this._list.deleteList(id);
  }

  async changeListName(list:List){
    const alert = await this.alertController.create({
      header: 'Changer le nom de la liste',
      inputs:[
        {
          name:'newTitle',
          type:'text',
          value:list.title,
          placeholder:'Nom de la liste'
        }
      ],
      buttons: [
        {
          text:'Annuler',
          role:'cancel',
          handler:()=>this.listIon.closeSlidingItems()
        },
        {
          text:'Enregistrer',
          handler:(data)=>{
            if(data.newTitle.length===0){
              return;
            }else{
             list.title=data.newTitle;
             this._list.saveStorage(); 
             this.listIon.closeSlidingItems();
            }
          }
        }
      ]
    });

    alert.present();
  }
}
