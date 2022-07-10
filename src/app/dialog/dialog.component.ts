import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { UniEvent } from '../models/uni-event.model';
import { ApiService } from '../services/api.service';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})


export class DialogComponent implements OnInit {

  eventForm!: FormGroup;
  actionBtn: string = "save";

  constructor(private formBilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: UniEvent,
    private dialofRef: MatDialogRef<DialogComponent>) {

  }

  ngOnInit(): void {
    this.eventForm = this.formBilder.group({
      eventName: ['', Validators.required],
      eventCaregory: ['', Validators.required],
      eventStartDate: ['', Validators.required],
      eventEndDate: ['', Validators.required],
      //eventLocation : ['',Validators.required],      
      eventCost: ['', Validators.required],
      eventDescription: ['', Validators.required],
      isInternational: false,
      isJobEvent: false,
      isVeryImportant: false,


    });
    if (this.editData) {
      this.actionBtn = "update";
      this.eventForm.controls['eventName'].setValue(this.editData.title);
      this.eventForm.controls['eventCaregory'].setValue(this.editData.category);
      this.eventForm.controls['eventStartDate'].setValue(this.editData.start_Date);
      this.eventForm.controls['eventEndDate'].setValue(this.editData.end_Date);
      // this.eventForm.controls['eventLocation'].setValue(this.editData.eventLocation);
      this.eventForm.controls['eventCost'].setValue(this.editData.cost);
      this.eventForm.controls['eventDescription'].setValue(this.editData.description);
      this.eventForm.controls['isInternational'].setValue(this.editData.is_International)
      this.eventForm.controls['isJobEvent'].setValue(this.editData.is_Job_Event)
      this.eventForm.controls['isVeryImportant'].setValue(this.editData.is_Very_Important)


    }
  }
  addEvent() {
    console.log(this.editData);
    if (!this.editData) {
      if (this.eventForm.valid) {
        let uniEvent: UniEvent = {
          title: this.eventForm.value.eventName,
          description: this.eventForm.value.eventCaregory,
          start_Date: this.eventForm.value.eventStartDate,
          end_Date: this.eventForm.value.eventEndDate,
          category: this.eventForm.value.eventCaregory,
          cost: Number(this.eventForm.value.eventCost),
          is_International: this.eventForm.value.isInternational,
          is_Job_Event: this.eventForm.value.isJobEvent,
          is_Very_Important: this.eventForm.value.isVeryImportant
        }
        this.api.postEvent(uniEvent)
          .subscribe({
            next: (res) => {
              alert("Event Added Successfully");
              this.eventForm.reset();
              this.dialofRef.close('save');
            },
            error: () => {
              alert("Error while Submiting the Event !!!")
            }
          })


      } else {
        console.log("Problem");
      }
    } else {
      console.log("hi");
      this.updateEvent();
    }
  }

  updateEvent() {
    let uniEvent: UniEvent = {
      title: this.eventForm.value.eventName,
      description: this.eventForm.value.eventCaregory,
      start_Date: this.eventForm.value.eventStartDate,
      end_Date: this.eventForm.value.eventEndDate,
      category: this.eventForm.value.eventCaregory,
      cost: Number(this.eventForm.value.eventCost),
      is_International: this.eventForm.value.isInternational,
      is_Job_Event: this.eventForm.value.isJobEvent,
      is_Very_Important: this.eventForm.value.isVeryImportant
    }
    this.api.putEvent(uniEvent, this.editData._id!)
      .subscribe({
        next: (res) => {
          alert("Event Updated Successfully");
          this.eventForm.reset();
          this.dialofRef.close('update');
        },
        error: () => {
          alert("Error while Updating the Records !!!")
        }
      })
  }

}

