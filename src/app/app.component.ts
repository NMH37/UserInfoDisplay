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
      // console.log(response);
      this.usersInfo = response;
      for (let i = 0; i < this.usersInfo.length; i++) {
        data.push({
          id: this.usersInfo[i].id,
          name: this.usersInfo[i].name,
          email: this.usersInfo[i].email,
          dateOfBirth: this.dataService.trasformDate(this.usersInfo[i].dateOfBirth),
          phone: this.usersInfo[i].phone,
          website: this.usersInfo[i].website,
          active: this.usersInfo[i].active,
          percent: this.usersInfo[i].percent,
          cashOnHand: this.dataService.trasformCurrency(this.usersInfo[i].cashOnHand),
        });
        console.log(data);

      }
      this.data1 = new CollectionView(data);
    });
  }

}
