import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService } from './../../services/lists.service';
import { List } from './../../models/list.model';
import { Item } from './../../models/list-item.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  list:List;
  nameItem:string;
  
  constructor(private _list:ListService,private routerA:ActivatedRoute) { 
    const id=this.routerA.snapshot.paramMap.get("id");
    this.list=_list.getList(id);
  }

  ngOnInit() {
  }

  addItem(){
    if(this.nameItem.length===0){
      return;
    }else{
      const item= new Item(this.nameItem);
      this.list.items.push(item);
      this.nameItem='';
      this._list.saveStorage();
    }
  }


  checking(item:Item):void{
    const pendings=this.list.items.filter(item=>!item.complete).length;
    if(pendings===0){
      this.list.finishIn=new Date();
      this.list.finish=true;
    }else{
      this.list.finishIn=null;
      this.list.finish=false;
    }
    this._list.saveStorage();
  }


  deleteItem(index:number):void{
    this.list.items.splice(index,1);
    this._list.saveStorage();
  }

}
