import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import {MemberService} from '../service/member.service';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {filter, switchMap} from 'rxjs';
import {Member} from '../service/member.model';
import {MemberFormComponent} from './components/member-form/member-form.component';
import {MemberList} from './components/member-list/member-list';
import {DialogComponent} from './components/dialog/dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatIcon,
    MatButtonModule,
    MatDialogModule,
    MemberFormComponent,
    MemberList,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnInit {
  private readonly memberService = inject(MemberService);
  readonly members = signal<Member[]>([]);
  private readonly dialog = inject(MatDialog);

  isAddingMember = signal(false);

  getMembers(): void {
    this.memberService.getMembers().subscribe({
      next: (data) => {
        const sortedData = [...data].sort((a, b) => {
            return (a.id && b.id) ? a.id - b.id : 0;
          }
        );
        this.members.set(sortedData);
      },
      error: (err) => console.error('Error fetching members:', err),
    });
  }

  ngOnInit(): void {
    this.getMembers()
  }

  onToggleAddForm(): void {
    this.isAddingMember.update(value => !value);
  }

  onSaveMember(memberData: Member): void {
    this.memberService.addMember(memberData).subscribe({
      next: (newMember) => {
        // this.members.update(currentMembers => [...currentMembers, newMember]);
        this.isAddingMember.set(false);
        this.getMembers()
      },
      error: (err) => console.error('Error adding member:', err),
    });
  }

  onEditMember(member: Member): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '90vw',
      maxWidth: '450px',
      data: { member }
    });

    dialogRef.afterClosed().pipe(
      filter((result): result is Member => !!result),
      switchMap(updatedMemberData => this.memberService.updateMember(updatedMemberData))
    ).subscribe({
      next: (savedMember) => {
        // this.members.update(current =>
        //   current.map(m => m.id === savedMember.id ? savedMember : m));
        this.getMembers()
      },
      error: (err) => console.error('Error updating member:', err)
    });
  }

  onDeleteMember(id: number): void {
    this.memberService.deleteMemberById(id).subscribe({
      next: () => this.members.update(currentMembers =>
        currentMembers.filter(m => m.id !== id)
      ),
      error: (err) => console.error(`Error deleting member ${id}:`, err),
    });
  }
}
