import { Component } from '@angular/core';
import { ListService } from './../../services/lists.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public _list:ListService) {}

}
