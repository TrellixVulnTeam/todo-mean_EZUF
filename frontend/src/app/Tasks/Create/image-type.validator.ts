import { AbstractControl } from "@angular/forms";

export const imageTypeValidator =(control:AbstractControl)=>{
  const file = control.value as File;
  if(!file){
    return {invalidFileType: true};
  }
  console.log(file.type)
  switch(file.type){
    case 'image/png':
    case 'image/jpeg':
    case 'image/jpg':
      return null;
      break;
    default:
      alert("Invalid file type");
      return {invalidFileType: true};
  }
}
