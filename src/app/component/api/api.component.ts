import { User } from '../../interface/user';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder,AbstractControl } from '@angular/forms';
import { SerapiService } from 'src/app/service/serapi.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css'],
})
export class ApiComponent implements OnInit {
  users: User[] = [];
  user: User = {} as User;
  Ialoading = true;
  // myform = new FormGroup({

  //     name: new FormControl('', Validators.required),
  //     username: new FormControl('', [
  //       this.myval.bind(this),
  //       Validators.required,
  //     ]),
  //     email: new FormControl('', [Validators.required, Validators.email]),
  //     // address: new FormControl('', Validators.required),
  //     address: new FormGroup({
  //       street: new FormControl("",Validators.required),
  //       suite: new FormControl("",Validators.required),
  //       city: new FormControl("",Validators.required),
  //       zipcode:new FormControl("",Validators.required)
  //     }),
  //     phone: new FormControl('', [
  //       Validators.pattern('[0-9 ]{11}'),
  //       Validators.required,
  //       Validators.minLength(11),
  //       Validators.maxLength(11),
  //     ]),
  //     website: new FormControl('', Validators.required),
  //     company: new FormGroup({
  //       name:new FormControl("",Validators.required)
  //     }),
  // });
  myform!:FormGroup;
  constructor(public _apiService: SerapiService , public pf:FormBuilder) {}
  ngOnInit(): void {
    this.getApi();
 this.myform =this.pf.group({
          name: ['',Validators.required],
          username: ['',[Validators.required,this.customValidators.bind(this)]],
          email: ['',[Validators.required,Validators.email]],
          address: this.pf.group({
            street: ['',Validators.required],
            suite: ['',Validators.required],
            city: ['',Validators.required],
            zipcode:['',Validators.required]
          }),
          phone: ['',[Validators.required,Validators.pattern('[0-9 ]{11}'),Validators.minLength(11), Validators.maxLength(11), this.startsWith.bind(this)]],
          website: ['',Validators.required],
          company: this.pf.group({
            name:['',Validators.required]
          }),

      });
  }


  get name() {
    return this.myform.get('name');
  }
  get userName() {
    return this.myform.get('username');
  }
  get emaill() {
    return this.myform.get('email');
  }

  get street() {
    return this.myform.get('address.street');
  }
  get suite() {
    return this.myform.get('address.suite');
  }
  get city() {
    return this.myform.get('address.city');
  }
  get zipcode() {
    return this.myform.get('address.zipcode');
  }

  get phone() {
    return this.myform.get('phone');
  }

  get website() {
    return this.myform.get('website');
  }

  get companyName() {
    return this.myform.get('company.name');
  }



// get formctr() {
//     return this.myform.controls;
//   }
//   get companyName() {
//      return this.myform.get('company');
//    }
//    get address() {
//      return this.myform.get('address');
//     }

  customValidators(control:AbstractControl) {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { canNotContainSpase: true };
    }
    return null;
  }

  startsWith(control: AbstractControl) {
    if (!(control.value as string).startsWith('01')){
    return { shouldbestart01: true };
  }
  return null
}

  Removevalidation(): void {
    let remove = this.myform.get('name');
    remove?.setValidators([]);
    remove?.updateValueAndValidity();
  }

  ngsubmit() {
    console.log(this.myform.value);
  }

  getApi() {
    this._apiService.getall().subscribe({
      next: (response: any) => {
        this.users = response;
        this.Ialoading = false;
      },
      error: (err: any) => {
        alert('Error');
      },
    });
  }
  // post
  addUser(): void {
    this.user = this.myform.value as User ;
    this._apiService.addUserServ(this.user).subscribe({
      next: (res) => {
        this.user = res;
        this.users.push(this.user);
        this.myform.reset();
      },
      error: (e) => console.error(e),
    });

  }

  //delete
  deletTask(userid: number) {
    let confirmed= confirm("are you sure");
    if(confirmed){
      this._apiService.delete(userid).subscribe({
        next: (response: any) => {
          let index =this.users.findIndex((u)=> u.id == userid)
          this.users.splice(index, 1);
        },
        error: (err: any) => {
          alert('Error');
        },
      });
    }

  }
//getuserid
  getid(id:number) {
    this.user=this.myform.value as User;
    this._apiService.getId(id).subscribe({
      next: (response: any) => {
        this.user=response
        this.myform.patchValue(response)
      },
      error: (err: any) => {
        alert('Error');
      },
    });
  }

  updateUser(id:number,user:User){
    this.user=this.myform.value as User;
    this._apiService.update(id,this.user).subscribe({
      next:(response:any)=>{
        this.users[id] = response;
                },
                error:  (err:any)=>{
                  alert("Error");
                }
    });
   }
}
