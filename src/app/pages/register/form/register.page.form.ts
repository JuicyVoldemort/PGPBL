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
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            repeatPassword: [''],
            phone: ['', Validators.required],
            address: this.formBuilder.group({
                street: ['', Validators.required],
                number: ['', Validators.required],
                neighborhood: [''],
                complement: [''],
                zipcode: ['', Validators.required],
                state: ['', Validators.required],
                city: ['', Validators.required]
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
            const password = form.get('password')!.value; // Non-null assertion used
            const repeatPassword = form.get('repeatPassword')!.value; // Non-null assertion used
            return password === repeatPassword ? null : { isntMatching: true };
        };
    }
}