import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { WebService } from '../services/web.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Creative } from '../interface/creative';
import { FileHandle } from '../directives/drag.and.drop';

@Component({
  selector: 'app-creative-edit',
  templateUrl: './creative-edit.component.html',
  styleUrls: ['./creative-edit.component.css']
})
export class CreativeEditComponent implements OnInit {

  url = 'creatives/';
  creative: Creative;
  creativeEditForm: FormGroup;
  fileToUpload: FileHandle[] = [];
  id: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private webService: WebService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('Id from request: ', this.id);
    this.getData(this.id);

    }

    filesDropped(files: FileHandle[]): void {
      this.fileToUpload = files;
      console.log(this.fileToUpload);
    }

    private createForm() {
      this.creativeEditForm = this.formBuilder.group({
        name: new FormControl(this.creative ? this.creative.name : '', Validators.required),
        groupCreatives: new FormControl(this.creative ? this.creative.groupCreatives : '', Validators.required),
        clickThroughURL: new FormControl(this.creative ? this.creative.clickThroughURL : '', Validators.required),
        topLevelDomain: new FormControl(this.creative ? this.creative.topLevelDomain : '', Validators.required),
        impressionTrackingURL: new FormControl(this.creative ? this.creative.impressionTrackingURL : '', Validators.required),
        userPathDirectory: new FormControl('mockUserDigitalEast', Validators.required),
        fileToUpload: new FormControl(this.creative ? this.creative.fileToUpload : ''),
      });

      console.log(this.creativeEditForm);
    }

    getData(id): void {
      this.webService.get(this.url + id).subscribe(res => {
      const response = JSON.parse(JSON.stringify(res));
      console.log('creative response:', response);
      this.creative = response;
      this.createForm();
    });
  }
  submitForm(data: FormGroup) {

    console.log(data);
    if (data.valid) {
          this.updateCreative(data.value);
    }
  }

  transformRequestToFormData(creative: Creative): FormData {
    const formData = new FormData();

    Object.keys(creative).forEach(key => {
      console.log(key + ' - ', creative[key]);
      formData.append(key, creative[key]);
    });

    console.log(this.fileToUpload);
    this.fileToUpload.forEach(element => {
      console.log(element.file);
      formData.append('fileToUpload', element.file);
    });

    return formData;
  }


  updateCreative(creative: Creative): void {
    this.webService.post(this.url  + this.id,  this.transformRequestToFormData(creative)).subscribe(res => {
    const response = JSON.parse(JSON.stringify(res));
    console.log(response);
    this.creativeEditForm.reset();
    this.creative = undefined;
    this.router.navigate(['/creatives']);
  }, error => {
    console.log(error);
  });
}

}
