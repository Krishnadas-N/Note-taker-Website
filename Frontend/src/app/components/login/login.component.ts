import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { GoogleAuthProvider } from "@firebase/auth";
import { AuthService } from '../../services/auth.service';
import { GoogleCredentials } from '../../models/googleAuth.Model';
import { TokenService } from '../../services/token.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,AngularFireModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[AngularFireAuth,AuthService,TokenService]
})
export class LoginComponent {
  constructor(private angularFireAuth: AngularFireAuth,private authService:AuthService) {}
  async login() {
    const creds = await this.angularFireAuth.signInWithPopup(
      new GoogleAuthProvider(),
    );
    console.log("credentials from firbaser",creds.user)
   if(creds.user){
     this.authService.loginWithGoogle(creds.user as unknown as GoogleCredentials).subscribe({
    next:(val)=>{
      console.log(val);
    }
     })
   }
  }

  logout() {
    this.angularFireAuth.signOut();
  }
}
