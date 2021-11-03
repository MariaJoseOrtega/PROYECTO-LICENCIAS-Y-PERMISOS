import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ColModel, FileModel, PaginatorModel} from "@models/core";
import {CoreHttpService, MessageService} from "@services/core";
import {FormBuilder, FormControl} from "@angular/forms";

@Component({
  selector: 'app-view-files',
  templateUrl: './view-files.component.html',
  styleUrls: ['./view-files.component.scss']
})

export class ViewFilesComponent implements OnInit {
  @Input() filesIn: FileModel[] = [];
  @Input() acceptAttributes = '.pdf,.txt,.doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx,.zip,.rar,.7z,.tar, image/*';
  @Input() loadingUpload: boolean = false;
  @Input() title: string = '';
  @Output() filesOut = new EventEmitter<FileModel[]>();
  @Output() files = new EventEmitter<any[]>();
  @Input() paginatorIn: PaginatorModel = {current_page: 1, per_page: 5, total: 0};
  @Output() paginatorOut = new EventEmitter<PaginatorModel>();
  @Output() searchOut = new EventEmitter<string>();
  selectedFiles: any[] = [];
  clonedFiles: { [s: string]: FileModel; } = {};
  cols: ColModel[] = [];
  search: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private coreHttpService: CoreHttpService,
    private messageService: MessageService) {
    this.search = formBuilder.control(null);
  }

  ngOnInit(): void {
    this.loadCols();
  }

  upload(event: any) {
    this.files.emit(event);
  }

  download(file: FileModel) {
    this.coreHttpService.downloadFile(file);
  }

  delete(file = null) {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
          if (file) {
            this.selectedFiles = [];
            this.selectedFiles.push(file);
          }
          const ids = this.selectedFiles.map(element => element.id);
          this.coreHttpService.deleteFiles(ids).subscribe(response => {
            this.messageService.success(response);
            this.remove(ids);
            this.selectedFiles = [];
          }, error => {
            this.messageService.error(error);
          });
        }
      });
  }

  remove(ids: number[]) {
    for (const id of ids) {
      this.filesIn = this.filesIn.filter(element => element.id !== id);
      this.paginatorIn.total = this.paginatorIn.total - 1;
    }
    this.filesOut.emit(this.filesIn);
  }

  paginate(event: any) {
    this.paginatorIn.current_page = event.page + 1;
    this.paginatorOut.emit(this.paginatorIn);
  }

  searchFiles(event: any) {
    event.preventDefault();
    if (event.type === 'click' || event.keyCode === 13 || event.target.value.length === 0) {
      this.searchOut.emit(event.target.value);
    }
  }

  changeFile(file: FileModel, value: string) {
    file.fullName = value + '.' + file.extension;
  }

  onRowEditInit(file: FileModel) {
    this.clonedFiles[file.id!] = {...file};
  }

  onRowEditSave(file: FileModel, index: number) {
    this.messageService.showLoading();
    this.coreHttpService.updateFile(file).subscribe(response => {
      this.messageService.hideLoading();
      this.messageService.success(response);
    }, error => {
      this.onRowEditCancel(file, index);
      this.messageService.hideLoading();
      this.messageService.error(error);
    });
  }

  onRowEditCancel(file: FileModel, index: number) {
    this.filesIn[index] = this.clonedFiles[file.id!];
    delete this.clonedFiles[file.id!];
  }

  loadCols() {
    this.cols = [
      {field: 'name', header: 'Nombre'},
      {field: 'description', header: 'Descripción'},
      {field: 'extension', header: 'Tipo'},
    ];
  }
}
