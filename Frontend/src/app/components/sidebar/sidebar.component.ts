import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink ,Router} from '@angular/router';
import { TokenService } from '../../services/token.service';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterLink,LoginComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  providers:[AuthService,TokenService,]
})
export class SidebarComponent {
  isOpen = false;
  constructor(private authService:AuthService,private router:Router){}
  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  public isAuthenticated():boolean{
    return this.authService.isAuthenticated()
   }

  public logout(){
    this.authService.logout()
  }

  navigateToMyNotes(){
    if(this.isAuthenticated()){
      this.router.navigate(['/my-notes'])
    }else{
    return
    }

  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
