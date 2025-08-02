import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Member } from '../../../service/member.model';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
  ],
  styleUrls: ['./member-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberFormComponent {
  member = input<Member>();
  save = output<Member>();
  cancel = output<void>();

  private readonly formBuilder = inject(FormBuilder);
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  memberForm = this.formBuilder.group({
    name: ['', Validators.required],
    age: [0, [Validators.required, Validators.min(0)]],
    sons: this.formBuilder.array<FormControl<string>>([]),
  });

  constructor() {
    effect(() => {
      const member = this.member();
      this.sons.clear();
      if (member) {
        this.memberForm.patchValue(member);
        member.sons.forEach(son => this.addSonByName(son));
      } else {
        this.memberForm.reset();
      }
    });
  }

  get sons(): FormArray {
    return this.memberForm.get('sons') as FormArray;
  }

  addSon(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.addSonByName(value);
    }
    event.chipInput!.clear();
  }

  private addSonByName(name: string): void {
    this.sons.push(this.formBuilder.control(name, Validators.required));
  }

  removeSon(index: number): void {
    this.sons.removeAt(index);
  }

  onSave(): void {
    if (this.memberForm.valid) {
      const formValue = this.memberForm.getRawValue();
      this.save.emit({ ...this.member(), ...formValue } as Member);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
