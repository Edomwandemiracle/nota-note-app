import { Note } from '../../models/note';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent implements OnInit, AfterViewInit {
  @Input() note!: Note;
  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('truncation') truncation!: ElementRef<HTMLElement>;
  @ViewChild('bodyText') bodyText!: ElementRef<HTMLElement>;

  @ViewChild('notepdf') notepdfElement!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {}
  ngAfterViewInit(): void {
    this.showTruncation();
  }
  showTruncation() {
    let style = window.getComputedStyle(this.bodyText.nativeElement, null);
    let viewHeight = parseInt(style.getPropertyValue('height'), 10);
    if (this.bodyText.nativeElement.scrollHeight > viewHeight) {
      this.renderer.setStyle(this.truncation.nativeElement, 'display', 'block');
    } else {
      this.renderer.setStyle(this.truncation.nativeElement, 'display', 'none');
    }
  }

  deleteButton() {
    this.deleteEvent.emit();
  }

  public generatePDF(): void {
    html2canvas(this.notepdfElement.nativeElement, { scale: 3 }).then(
      (canvas) => {
        const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
        const fileWidth = 200;
        const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
        let PDF = new jsPDF('p', 'mm', 'a4');
        PDF.addImage(
          imageGeneratedFromTemplate,
          'PNG',
          0,
          5,
          fileWidth,
          generatedImageHeight
        );
        PDF.html(this.notepdfElement.nativeElement.innerHTML);
        PDF.save(`${this.note.title}.pdf`);
      }
    );
  }
}
