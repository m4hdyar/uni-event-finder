import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,FormControl} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogModule} from '@angular/material/dialog';
import { ApiService } from '../services/api.service';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})


export class DialogComponent implements OnInit {

  eventForm!:FormGroup;
  actionBtn:string ="save";

  constructor(private formBilder :FormBuilder ,
    private api:ApiService ,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialofRef:MatDialogRef<DialogComponent>){

  }

  ngOnInit(): void {
    this.eventForm= this.formBilder.group({
      eventName : ['',Validators.required],
      eventCaregory : ['',Validators.required],
      eventStartDate : ['',Validators.required],
      eventEndDate : ['',Validators.required],
      eventLocation : ['',Validators.required],      
      eventCost : ['',Validators.required],
      eventDescription : ['',Validators.required],

    });
      if(this.editData){
        this.actionBtn="update";
        this.eventForm.controls['eventName'].setValue(this.editData.eventName);
        this.eventForm.controls['eventCaregory'].setValue(this.editData.eventCaregory);
        this.eventForm.controls['eventStartDate'].setValue(this.editData.eventStartDate);
        this.eventForm.controls['eventEndDate'].setValue(this.editData.eventEndDate);
        this.eventForm.controls['eventLocation'].setValue(this.editData.eventLocation);
        this.eventForm.controls['eventCost'].setValue(this.editData.eventCost);
        this.eventForm.controls['eventDescription'].setValue(this.editData.eventDescription);

      }    
    }
    addEvent(){
      if(!this.editData){
        if(this.eventForm.valid){
          this.api.postEvent(this.eventForm.value)
          .subscribe({
            next:(res)=>{
              alert("Event Added Successfully");
              this.eventForm.reset();
              this.dialofRef.close('save');
            },
            error:()=>{
              alert("Error while Submiting the Event !!!")
            }
          })
        
        
        }else{
          this.updateEvent()
        }
      }
    }

    updateEvent(){
      this.api.putEvent(this.eventForm.value,this.editData.id)
        .subscribe({
        next:(res)=>{
          alert("Event Updated Successfully");
          this.eventForm.reset();
          this.dialofRef.close('update');
        },
        error:()=>{
          alert("Error while Updating the Records !!!")
        }
      })
    }

}

