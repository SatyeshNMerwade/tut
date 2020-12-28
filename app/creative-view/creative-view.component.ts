import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, Form } from '@angular/forms';
import { WebService } from '../services/web.service';
import { Creative } from '../interface/creative';
import { FileHandle } from '../directives/drag.and.drop';

@Component({
  selector: 'app-creative-view',
  templateUrl: './creative-view.component.html',
  styleUrls: ['./creative-view.component.css']
})
export class CreativeViewComponent implements OnInit {
  @ViewChild('labelImport', {static: false})
  labelImport: ElementRef;

  fileToUpload: FileHandle[] = [];
  url = 'creatives/';
  title = 'Spring Boot + Angular 8 CRUD Example';
  creativesList: Array<Creative> = new Array();
  creative: Creative;
  myForm: FormGroup;

  ngOnInit(): void {
    this.createForm();
    this.getData();
  }


  constructor(private webService: WebService, private formBuilder: FormBuilder) { }

  filesDropped(files: FileHandle[]): void {
    console.log(files);
    this.fileToUpload = files;
  }

  import(): void {
    console.log('import ' + this.fileToUpload);
  }

  private createForm() {
    this.myForm = this.formBuilder.group({
      id: new FormControl(this.creative ? this.creative.id : ''),
      name: new FormControl(this.creative ? this.creative.name : '', Validators.required),
      groupCreatives: new FormControl(this.creative ? this.creative.groupCreatives : '', Validators.required),
      clickThroughURL: new FormControl(this.creative ? this.creative.clickThroughURL : '', Validators.required),
      topLevelDomain: new FormControl(this.creative ? this.creative.topLevelDomain : '', Validators.required),
      impressionTrackingURL: new FormControl(this.creative ? this.creative.impressionTrackingURL : '', Validators.required),
      //fileToUpload: new FormControl(this.creative ? this.creative.fileToUpload : '', Validators.required),
      userPathDirectory: new FormControl('mockUserDigitalEast'),
    });
  }

  submitForm(data: FormGroup) {
    console.log(data);

    if (data.valid) {
        if (data.value.id !== '') {
          this.updateCreative(data.value);
        } else {
          this.addCreative(data.value);
      }
    }
  }

  getData(): void {
      this.webService.get(this.url).subscribe(res => {
      const response = JSON.parse(JSON.stringify(res));
      console.log(response);
      this.creativesList = response;
    });
  }

  addCreative(creative: Creative): void {
      this.webService.post(this.url, this.transformRequestToFormData(creative)).subscribe(res => {
      const response = JSON.parse(JSON.stringify(res));
      console.log(response);
      this.getData();
      this.myForm.reset();
      this.creative = undefined;
      this.fileToUpload = [];
    }, error => {
      console.log(error);
    });
  }

  updateCreative(creative: Creative): void {
    this.webService.put(this.url, creative.id, creative).subscribe(res => {
    const response = JSON.parse(JSON.stringify(res));
    console.log(response);
    this.getData();
    this.myForm.reset();
    this.creative = undefined;
    this.fileToUpload = [];
  }, error => {
    console.log(error);
  });
}

  edit(creative: Creative): void {
    this.creative = creative;
    this.myForm.controls['id'].setValue(this.creative.id);
    this.myForm.controls['name'].setValue(this.creative.name);
    this.myForm.controls['groupCreatives'].setValue(this.creative.groupCreatives);
    this.myForm.controls['clickThroughURL'].setValue(this.creative.clickThroughURL);
    this.myForm.controls['topLevelDomain'].setValue(this.creative.topLevelDomain);
    this.myForm.controls['impressionTrackingURL'].setValue(this.creative.impressionTrackingURL);

  }

  delete(creative: Creative): void {
    this.webService.delete(this.url, creative).subscribe(res => {
      const data = JSON.parse(JSON.stringify(res));
      console.log(data);
      this.getData();
    }, error => {
    });
  }

  transformRequestToFormData(creative: Creative): FormData {
    const formData = new FormData();

    Object.keys(creative).forEach(key => {
      console.log(key + ' - ', creative[key])
      formData.append(key, creative[key]);
    });

    this.fileToUpload.forEach(element => {
      formData.append('fileToUpload', element.file);
    });

    return formData;
  }
}
