import { ChangeDetectionStrategy, Component, input, output, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import { Member } from '../../../service/member.model';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [
    MatIcon,
    MatButtonModule,
    MatListModule,
  ],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberList {
  members = input.required<Member[]>();
  editMember = output<Member>();
  deleteMember = output<number>();

  onEdit(member: Member): void {
    this.editMember.emit(member);
  }

  onDelete(id: number): void {
    this.deleteMember.emit(id);
  }
}
