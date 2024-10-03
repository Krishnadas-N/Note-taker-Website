import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UiChangeService } from './services/ui-change.service';
import { Subscription } from 'rxjs';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MovableLogoComponent } from './components/movable-logo/movable-logo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,SpinnerComponent,MovableLogoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit, AfterViewInit ,OnDestroy{
  title = 'Frontend';
  loading: boolean = false;
  private loadingSubscription!: Subscription;

  constructor(private uiChangeService: UiChangeService,private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.loadingSubscription = this.uiChangeService.loading$.subscribe(
      (isLoading: boolean) => {
        this.loading = isLoading;
        this.cdr.detectChanges();
      }
    );
  }
  ngAfterViewInit(): void {
  }
  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
