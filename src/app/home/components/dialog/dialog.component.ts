import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Member } from '../../../service/member.model';
import { MemberFormComponent } from '../member-form/member-form.component';

export interface MemberDialogData {
  member: Member;
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MemberFormComponent, MatDialogModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent {
  private readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  readonly data: MemberDialogData = inject(MAT_DIALOG_DATA);

  onSave(member: Member): void {
    this.dialogRef.close(member);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
