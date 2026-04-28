import { environment } from "./../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly TOKEN_KEY = "authToken";
  private backendUrl = environment.backendUrl;
  private userSubject = new BehaviorSubject<any | null>(this.getUserInfo());

  constructor(private http: HttpClient, private router: Router) {}

  private setToken(token: string) {
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    document.cookie = `${
      this.TOKEN_KEY
    }=${token}; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`;
  }

  getToken(): string | null {
    if (typeof document === "undefined") {
      return null;
    }

    const name = `${this.TOKEN_KEY}=`;
    const decodedCookies = decodeURIComponent(document.cookie);
    const cookies = decodedCookies.split(";");

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : "",
    });
  }

  getUserInfo(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = token.split(".")[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error("Invalid JWT token:", error);
      return null;
    }
  }

  get user$() {
    return this.userSubject.asObservable();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

doLogin(identifier: string, password: string) {
  if (identifier === "admin" && password === "1234") {
    const fakePayload = btoa(JSON.stringify({
      username: "admin",
      role: "admin"
    }));

    const fakeToken = `fake.${fakePayload}.token`;

    this.setToken(fakeToken);
    this.userSubject.next(this.getUserInfo());
    this.router.navigateByUrl("/home");
    return;
  }

  alert("Credenciales incorrectas");
}

  doLogout() {
    this.deleteToken();
    this.userSubject.next(null);
    this.router.navigateByUrl("/auth");
  }

  private deleteToken() {
    const expires = new Date(0).toUTCString();

    document.cookie = `${this.TOKEN_KEY}=; expires=${expires}; path=/; secure; samesite=strict`;
  }
}
