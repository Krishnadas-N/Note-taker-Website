import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validators, Editor, Toolbar, NgxEditorModule, schema,  nodes as basicNodes, marks} from 'ngx-editor';
import { UserService } from '../../services/user.service';
import { EditorForm } from '../../models/form.models';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [NgxEditorModule,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css',
  encapsulation: ViewEncapsulation.None,
  providers:[UserService]
})
export class EditorComponent implements OnInit{
isLoading:boolean=false
  constructor(private userService:UserService) {
    const ngxEditorConfig: any = {
      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        underline: 'Underline',
        strike: 'Strike',
        blockquote: 'Blockquote',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',
        horizontal_rule: 'Horizontal rule',
        format_clear: 'Clear Formatting',
        insertLink: 'Insert Link',
        removeLink: 'Remove Link',
        insertImage: 'Insert Image',
        indent: 'Increase Indent',
        outdent: 'Decrease Indent',
        superscript: 'Superscript',
        subscript: 'Subscript',
        undo: 'Undo',
        redo: 'Redo',

        // pupups, forms, others...
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
        enterValidUrl: 'Please enter a valid URL',
      },
    };
    NgxEditorModule.forRoot(ngxEditorConfig);
  }
  html = '';
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'indent', 'outdent'],
    ['superscript', 'subscript'],
    ['undo', 'redo']
  ];
  form = new FormGroup({
    title: new FormControl('', Validators.required()),
    editorContent: new FormControl('', Validators.required()),
  });

  ngOnInit(): void {
    this.editor = new Editor({   content: '',
      plugins: [],
      schema,
      nodeViews: {},
      history: true,
      keyboardShortcuts: true,
      inputRules: true,});
  }
    ngDoCheck(){
this.form.valueChanges.subscribe(data=>console.log(data))
    }
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onSubmit(): void {
    if (this.form.valid) {
        this.isLoading=true;
      const formValue: EditorForm = this.form.value as EditorForm;
     this.userService.saveNotes(formValue).subscribe({
      next:(res)=>{
        this.isLoading=false;
        this.form.reset()
      },
      error:(err)=>{
        this.isLoading=false;
        this.form.reset()
      }
     })
    }
  }
}
