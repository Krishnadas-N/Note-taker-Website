import { Component,Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent,FormsModule,CommonModule,RouterLink,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',

})
export class HomeComponent implements OnInit,OnDestroy  {
 html = 'Hello world!';

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }


}
