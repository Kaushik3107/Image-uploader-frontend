import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None, // Disable view encapsulation
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: any = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get('https://image-uploader-backend-ebon.vercel.app/posts')
      .subscribe((res: any) => {
        this.posts = res;
      });
  }
}
