import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, finalize, takeUntil, tap, throwError } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  public urlEnv = environment.production ? environment.apiUrl : environment.apiUrlLocal;
  public token2FA: string = '';
  private isAdminSubject = new BehaviorSubject<number>(0);
  public isAdmin$ = this.isAdminSubject.asObservable();
  private onLoadSubject = new BehaviorSubject<boolean>(true);
  public onLoad$ = this.onLoadSubject.asObservable();
  private isLoadingSubject = new BehaviorSubject<boolean>(true);
  public isLoading$ = this.isLoadingSubject.asObservable();
  private isLoginSubject = new BehaviorSubject<boolean>(false);
  public isLogin$ = this.isLoginSubject.asObservable();
  public maintenance = false;
  public appVersion = "1.0";
  public isRefreshing = false;
  public isGetMe = false;
  refreshSubscription: Subscription | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private location: Location) {
  }

  get isAdmin(): number {
    return this.isAdminSubject.value;
  }
  set isAdmin(value: number) {
    this.isAdminSubject.next(value);
  }

  get onLoad(): boolean {
    return this.onLoadSubject.value;
  }
  set onLoad(value: boolean) {
    this.onLoadSubject.next(value);
  }
  get isLoading(): boolean {
    return this.isLoadingSubject.value;
  }
  set isLoading(value: boolean) {
    this.isLoadingSubject.next(value);
  }

  getProfit(address: string, chainId: string) {
    const params = { address: address.toLowerCase(), chainId: chainId };
    return this.http.get(`${this.urlEnv}api/get-profit`, { params });
  }

  getHistory(address: string, chainId: string) {
    const params = { address: address.toLowerCase(), chainId: chainId };
    return this.http.get(`${this.urlEnv}api/get-history`, { params });
  }

  getAllHistory(address: string, chainId: string) {
    const params = { address: address.toLowerCase(), chainId: chainId };
    return this.http.get(`${this.urlEnv}api/get-all-history`, { params });
  }

  getReward(address: string, chainId: string) {
    const params = { address: address.toLowerCase(), chainId: chainId };
    return this.http.get(`${this.urlEnv}api/get-reward`, { params });
  }

  postExchange(data: any) {
    return this.http.post(`${this.urlEnv}api/exchange`, data);
  }

  postWithdraw(data: any) {
    return this.http.post(`${this.urlEnv}api/withdraw`, data);
  }

  postAdmin(data: any) {
    return this.http.post(`${this.urlEnv}api/post-admin`, data);
  }
  getIsAdmin(data: any) {
    return this.http.post(`${this.urlEnv}api/is-admin`, data);
  }

  sendMail(data: any) {
    return this.http.post(`${this.urlEnv}api/send-mail`, data);
  }

  getPriceETH() {
    return this.http.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
  }

  resetPassword(data: any) {
    return this.http.post(`${this.urlEnv}api/reset-password`, data);
  }
}
