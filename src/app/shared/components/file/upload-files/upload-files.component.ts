import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageService} from "@services/core";

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {
  @Input() acceptAttributes = '.pdf,.txt,.doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx,.zip,.rar,.7z,.tar, image/*';
  @Input() multiple: boolean = true;
  @Input() maxFileSize: number = 1024 * 1024 * 10;
  @Input() fileLimit: number = 20;
  @Input() loadingUpload: boolean = false;
  @Output() files = new EventEmitter<any[]>();


  constructor(public messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  upload(event: any, target: any) {
    target.clear();
    this.files.emit(event.files);
  }

}
