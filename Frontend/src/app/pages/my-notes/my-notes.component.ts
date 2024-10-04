import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { INote } from '../../models/user.models';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { RouterLink } from '@angular/router';
import { tap } from 'rxjs';
import { UiChangeService } from '../../services/ui-change.service';

@Component({
  selector: 'app-my-notes',
  standalone: true,
  imports: [CommonModule,TruncatePipe,RouterLink],
  templateUrl: './my-notes.component.html',
  styleUrl: './my-notes.component.css',
   providers:[UserService]
})
export class MyNotesComponent implements OnInit {
   userNotes:INote[]=[]
    constructor(private userService:UserService,private uiService:UiChangeService){}
    ngOnInit(): void {
      this.loadnotes()
    }
    loadnotes(){
      this.userService.getNotes().subscribe({
       next:(res)=>{
       if(res.success){
       this.userNotes=res.data
      console.log(this.userNotes)
        }
      },
      error:(error)=>{
      console.log(error)
      }
    })
    }

    getGradient(noteId: number): string {
      const gradients = [
        'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
        'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
        'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
        'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      ];
      return gradients[noteId % gradients.length];
    }
    deleteNote(noteId: string): void {
      this.userService.deleteNote(noteId).pipe(
        tap(() => {
          const idx = this.userNotes.findIndex(note => note.id === noteId);
          if (idx !== -1) {
            this.userNotes.splice(idx, 1); // Remove 1 element at index idx
            this.uiService.hideLoading()
          } else {
            this.uiService.hideLoading()
            console.error(`Note with ID ${noteId} not found in userNotes array.`);
          }
        })
      )
    }

}
