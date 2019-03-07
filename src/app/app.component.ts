import { Component, OnInit, ViewChild } from '@angular/core';
import { } from '@angular/forms';
import { CollectionView, } from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';
import { DataService } from './service/data.service';
import { User } from './data.model';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  inActive = false;
  data1: CollectionView;
  title = 'wijmoGrid';
  usersInfo: User[];
  private _filter = '';
  @ViewChild('flex') flexgrid: wjcGrid.FlexGrid;
  selection = new SelectionModel(true, []);
  constructor(private dataService: DataService) { }
  ngOnInit() {
    const data = [];
    this.dataService.getUsers().subscribe((response) => {
      this.usersInfo = response;
      for (const user of this.usersInfo) {
        data.push({
          ...user,
          dateOfBirth: this.dataService.transformDate(user.dateOfBirth)
        });
      }
      this.data1 = new CollectionView(data);
      this.data1.trackChanges = true;
      this.data1.filter = (item: any) => {
        if (!this.inActive && !item.active) {
          return false;
        }
        if (this._filter) {
          return item.name.toLowerCase().indexOf(this._filter.toLowerCase()) > -1;
        }
        return true;
      };
    });
  }
  get filter(): string {
    return this._filter;
  }
  set filter(value: string) {
    this._filter = value;
    this.data1.refresh();
  }

  showInActive() {
    this.inActive = !this.inActive;
    this.data1.refresh();
  }
  /** working on following  */
  selectActive() {
    const newitems = this.data1.items.filter(item => item.active === true);
    console.log(newitems);
    this.data1.remove(newitems);
    this.data1.refresh();
  }

  selectInActive() {
    const selectedRow = this.flexgrid.selectedRows;
    selectedRow.forEach(item => {
      item._data.active = false;
      console.log(item._data.active);
      this.data1.refresh();
    });
    console.log(selectedRow, 'selected rows ');
  }
  showActive() {

    const selRow = this.flexgrid.selection.row;
    console.log(selRow, 'selected row');
    console.log(this.flexgrid, 'flex grid');
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data1.items.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.data1.items.forEach(row => this.selection.select(row));
  }
  // end of line
}

