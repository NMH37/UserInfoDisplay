import { Component, OnInit, ViewChild } from '@angular/core';
import { } from '@angular/forms';
import { CollectionView, } from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';
import { DataService } from './service/data.service';
import { User } from './data.model';
/* import * as wjcGridFilter from 'wijmo/wijmo.grid.filter';
import { FlexGrid } from 'wijmo/wijmo.grid'; */



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data1: CollectionView;
  title = 'wijmoGrid';
  fieldNames: string[];
  usersInfo: User[];
  private _filter = '';
  private _toFilter: any;
  @ViewChild('flex') flexgrid: wjcGrid.FlexGrid;
  constructor(private dataService: DataService) { }
  ngOnInit() {
    const data = [];
    this.dataService.getUsers().subscribe((response) => {
      this.usersInfo = response;
      for (let i = 0; i < this.usersInfo.length; i++) {
        data.push({
          id: this.usersInfo[i].id,
          name: this.usersInfo[i].name,
          email: this.usersInfo[i].email,
          dateOfBirth: this.dataService.transformDate(this.usersInfo[i].dateOfBirth),
          phone: this.usersInfo[i].phone,
          website: this.usersInfo[i].website,
          active: this.usersInfo[i].active,
          percent: this.usersInfo[i].percent,
          cashOnHand: this.usersInfo[i].cashOnHand,
        });
      }
      this.data1 = new CollectionView(data);
      this.data1.trackChanges = true;
      this.data1.filter = this._filterFunction.bind(this);
    });
  }


  get filter(): string {
    return this._filter;
  }
  set filter(value: string) {
    if (this._filter !== value) {
      this._filter = value;
      if (this._toFilter) {
        clearTimeout(this._toFilter);
      }
      const self = this;
      this._toFilter = setTimeout(function () {
        self.data1.refresh();
      }, 500);
    }
  }

  private _filterFunction(item: any) {
    if (this._filter) {
      return item.name.toLowerCase().indexOf(this._filter.toLowerCase()) > -1;
    }
    return true;
  }
  selectActive() {
    console.log(this.data1.items.forEach(item => console.log(item.active)));
  }
  showInActive() {
    console.log('select Inactive working');

  }
  selectInActive() {

    const selRow = this.flexgrid.selection.row;
    this.flexgrid.collectionView.items.splice(selRow, 1);
    console.log(this.flexgrid);
    console.log('show delete working');
  }
  showActive() {

    const selRow = this.flexgrid.selection.row;
    console.log(selRow, 'selected row');
    console.log(this.flexgrid, 'flex grid');
    console.log('show active working');
  }
  // end of line
}

