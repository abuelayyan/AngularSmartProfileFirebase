import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/database';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

interface user {
  Name: string
  Gender: string
  Description: string
  instaUsername:string
  snapUsername: string
  twUsername: string
  lkdinUsername: string
  phoneNo:string
  Email:string
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loaded = false;
  title = 'AngularTest';
  db = firebase.getDatabase();
  user: user = {} as user
  username: any
  


  constructor(private route: ActivatedRoute,
    private titleService: Title) {

  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.username = params.username;
        console.log(this.username);
        if (this.username == null || this.username == undefined)
          return
        let ref = firebase.ref(this.db, `SmartCardsUsers/${this.username}`);
        firebase.onValue(ref, (data) => {
          this.user = data.val();
          this.setTitle(this.user.Name)
          console.log(JSON.stringify(this.user.Email))
          //this.usernames = Object.keys(this.user)
          this.loaded = true
        })
      }
      );
    console.log(this.username)

  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
