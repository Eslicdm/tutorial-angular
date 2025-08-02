import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from './member.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8081/members';

  private getAuthHeaders(): HttpHeaders {
    const { username, password } = environment;
    return new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
  }

  getMembers(): Observable<Member[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Member[]>(`${this.baseUrl}?page=0&size=10`, { headers });
  }

  addMember(memberData: Omit<Member, 'id'>): Observable<Member> {
    const headers = this.getAuthHeaders();
    return this.http.post<Member>(this.baseUrl, memberData, { headers });
  }

  updateMember(member: Member): Observable<Member> {
    const headers = this.getAuthHeaders();
    return this.http.put<Member>(`${this.baseUrl}/${member.id}`, member, { headers });
  }

  deleteMemberById(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers });
  }
}
