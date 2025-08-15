import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from './member.model';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8081/members';

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.baseUrl}?page=0&size=10`);
  }

  addMember(memberData: Omit<Member, 'id'>): Observable<Member> {
    return this.http.post<Member>(this.baseUrl, memberData);
  }

  updateMember(member: Member): Observable<Member> {
    return this.http.put<Member>(`${this.baseUrl}/${member.id}`, member);
  }

  deleteMemberById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
