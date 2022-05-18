import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-bootstrap-examples';
  products: any = []; // tambahkan baris ini sebagai variabel yang akan menampung data JSON

    // tambahkan dari sini
    constructor(private httpClient: HttpClient) {
        this.httpClient.get("assets/mentor.json").subscribe(data =>{
            console.log(data);
            this.products = data;
        })
      }
}
