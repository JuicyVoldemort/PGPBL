import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Action, StoreModule } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing'
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/model/user/User';
import { RegisterEffects } from './register.effect';
import { register, registerFail, registerSuccess } from './register.action';
import { UserRegister } from 'src/app/model/UserRegister';

describe('RegisterEffects', () => {
    let actions$: Observable<Action>;
    let effects: RegisterEffects;
    let user = new User();
    let error = { error: 'error' };
    user.id = 'anyUserId';
    
    let AuthServiceMock = {
        register(userRegister: UserRegister) {
            if (userRegister.email == "error@mail.com") {
                return throwError(error)
            }
            return of({});
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({}),
                EffectsModule.forRoot([]),
                EffectsModule.forFeature([RegisterEffects]),
            ],
            providers: [{ provide: AuthService, useValue: AuthServiceMock }],
        });

        effects = TestBed.inject(RegisterEffects);
    });

    it('should register return success', (done) => {
        actions$ = of(register({ userRegister: new UserRegister }));

        effects.register$.subscribe((newAction) => {
            expect(newAction).toEqual(registerSuccess());
            done();
        });
    })
    it('should register return errror', (done) => {
        const userRegister = new UserRegister();
        userRegister.email = "error@mail.com";
        
        actions$ = of(register({ userRegister: new UserRegister }));

        effects.register$.subscribe((newAction) => {
            expect(newAction).toEqual(registerFail(error));
            done();
        });
    })

})