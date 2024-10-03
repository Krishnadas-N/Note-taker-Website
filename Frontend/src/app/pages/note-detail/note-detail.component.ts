import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { INote } from '../../models/user.models';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-note-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-detail.component.html',
  styleUrl: './note-detail.component.css',
  providers:[UserService]
})
export class NoteDetailComponent implements OnInit {
  noteId!: string;
  note: INote | undefined;
  sanitizedContent: SafeHtml | undefined;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router:Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.noteId = params['noteId'];
      this.loadNote();
    });
  }

  loadNote(): void {
    this.userService.getANote(this.noteId).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.note = res.data;
          if(this.note){
            this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(this.note.content);
          }
         } else {
          console.error('Failed to load note:', res.message);
        }
      },
      error: (err: any) => {
        console.error('Error loading note:', err);
        // Handle error, e.g., show an error message to the user
      }
    });
  }
  goBack(){
  this.router.navigate(['/my-notes'])
  }
}
