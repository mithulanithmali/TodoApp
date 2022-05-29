import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  sideBarOpen : boolean = true;
  mediaSub: Subscription | undefined
 @ViewChild(MatSidenav)
 sidenav!: MatSidenav;

 
 constructor(public mediaObserver: MediaObserver,private router: Router) {
  
 }
  ngAfterViewInit(): void {
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        console.log(result.mqAlias);
        if(result.mqAlias === 'xs'){
              this.sidenav.mode = 'over'
             this.sidenav.close();
        }else{ 
           this.sidenav.mode = 'side';
            this.sidenav.open();
        }
      }
    );
  }
  ngOnInit(): void {
   
  }

  logOut(){
    this.router.navigate(['/']);
  }
}


