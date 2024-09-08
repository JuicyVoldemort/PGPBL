
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterPage } from './register.page';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router} from '@angular/router'; // Import Router
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RegisterPageModule } from './register.module';

describe('LoginPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let router: Router;
  let page: any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPage ],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule, // Added comma
        ReactiveFormsModule,
        RegisterPageModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    router = TestBed.get(Router); // Updated to use inject
    
    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
  }));

  it ('should create register from on page init', () =>{
    fixture.detectChanges();

    expect(component.registerForm).not.toBeUndefined
  })

  it('should go to home page on register', () => {
    fixture.detectChanges();
  
    spyOn(router, 'navigate');
  
    page.querySelector('ion-button').click();
  
    expect(router.navigate).toHaveBeenCalledTimes(0);
    
    component.registerForm.getForm().get('name')!.setValue('anyName');
    component.registerForm.getForm().get('email')!.setValue('anyEmail.com');
    component.registerForm.getForm().get('password')!.setValue('anyPassword');
    component.registerForm.getForm().get('repeatPassword')!.setValue('anyPassword');
    component.registerForm.getForm().get('phone')!.setValue('anyPhone');
    component.registerForm.getForm().get('address')!.get('street')!.setValue('any street');
    component.registerForm.getForm().get('address')!.get('number')!.setValue('any number');
    component.registerForm.getForm().get('address')!.get('complement')!.setValue('any complement');
    component.registerForm.getForm().get('address')!.get('neighborhood')!.setValue('any neighborhood');
    component.registerForm.getForm().get('address')!.get('zipcode')!.setValue('any zip code');
    component.registerForm.getForm().get('address')!.get('city')!.setValue('any city');
    component.registerForm.getForm().get('address')!.get('state')!.setValue('any state');
    
  });

  it('should go to register', () => {
    spyOn(router, 'navigate'); // Spy on the navigate method
    component.register();
    expect(router.navigate).toHaveBeenCalledWith(['home']); // Use lowercase 'login'
  });

  it('should not be allowed to register with form invalid', () => {
    fixture.detectChanges();
  
    spyOn(router, 'navigate');
  
    page.querySelector('ion-button').click();
  
    expect(router.navigate).toHaveBeenCalledTimes(0);
  });
  
});

