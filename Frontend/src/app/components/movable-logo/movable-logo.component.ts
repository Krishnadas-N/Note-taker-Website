import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-movable-logo',
  standalone: true,
  imports: [],
  templateUrl: './movable-logo.component.html',
  styleUrl: './movable-logo.component.css'
})
export class MovableLogoComponent implements OnInit {
  @ViewChild('movableLogo',{static:true})movableLogo!:ElementRef;
  constructor(private renderer: Renderer2) {}
  ngOnInit(): void {
    this.initDraggable(this.movableLogo.nativeElement);
  }

  private initDraggable(element: HTMLElement): void {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    const dragMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      // Get the mouse cursor position at startup
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    };

    const elementDrag = (e: MouseEvent) => {
      e.preventDefault();
      // Calculate the new cursor position
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // Set the element's new position
      element.style.top = (element.offsetTop - pos2) + 'px';
      element.style.left = (element.offsetLeft - pos1) + 'px';
    };

    const closeDragElement = () => {
      // Stop moving when mouse button is released
      document.onmouseup = null;
      document.onmousemove = null;
    };

    element.onmousedown = dragMouseDown;
  }
}
