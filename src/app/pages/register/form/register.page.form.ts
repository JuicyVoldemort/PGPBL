import { FormBuilder, FormGroup, Validators, ValidatorFn } from "@angular/forms";

export class RegisterPageForm {

    private formBuilder: FormBuilder;
    private form: FormGroup;

    constructor(formBuilder: FormBuilder) {
        this.formBuilder = formBuilder;
        this.form = this.createForm();
    }

    private createForm(): FormGroup {
        let form = this.formBuilder.group({
            name: ['', Validators.required],          // Validators required merubah tab pengisian menjadi merah apabila kosong
            email: ['', [Validators.required, Validators.email]],   //Validators Email memastikan isian pada kolom isi merupakan alamat email dan bukan yang lain
            password: ['', [Validators.required, Validators.minLength(6)]],  //Validator minLenght menentukan minimal panjang dari password yang dibuat
            repeatPassword: [''],                     // Terdapat validator berbeda untuk kolom repeatPassword
            phone: ['', Validators.required],         // Validators required merubah tab pengisian menjadi merah apabila kosong
            address: this.formBuilder.group({         // formBuilder disini dibuat menjadi group agar alamat terkumpul jadi satu dan berbeda dari informasi pribadi diatas
                street: ['', Validators.required],    // Validators required merubah tab pengisian menjadi merah apabila kosong
                number: ['', Validators.required],    // Validators required merubah tab pengisian menjadi merah apabila kosong
                neighborhood: [''],                   // Tidak diisi tidak masalah
                complement: [''],                     // Tidak diisi tidak masalah
                zipcode: ['', Validators.required],   // Validators required merubah tab pengisian menjadi merah apabila kosong
                state: ['', Validators.required],     // Validators required merubah tab pengisian menjadi merah apabila kosong
                city: ['', Validators.required]       // Validators required merubah tab pengisian menjadi merah apabila kosong
            })
        });

        form.get('repeatPassword')!.setValidators(this.matchPasswordAndRepeatPassword(form));

        return form;
    }

    getForm(): FormGroup {
        return this.form;
    }

    private matchPasswordAndRepeatPassword(form: FormGroup): ValidatorFn {
        return () => {
            const password = form.get('password')!.value; 
            const repeatPassword = form.get('repeatPassword')!.value; 
            return password === repeatPassword ? null : { isntMatching: true };   //const disini membuat validasi agar password dan repeat password memiliki isian yang sama
        };
    }
}