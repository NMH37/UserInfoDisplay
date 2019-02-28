import { Component, OnInit } from '@angular/core';
import { CollectionView } from 'wijmo/wijmo';
import { DataService } from './service/data.service';
import { User } from './data.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data1;
  title = 'wijmoGrid';
  usersInfo: User[];
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
          percent: this.dataService.transformIntoPercent(this.usersInfo[i].percent),
          cashOnHand: this.dataService.transformCurrency(this.usersInfo[i].cashOnHand),
        });
        console.log(data);

      }
      this.data1 = new CollectionView(data);
    });
  }

}
