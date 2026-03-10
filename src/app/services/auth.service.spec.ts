import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientMock: { post: any };

  beforeEach(() => {
    httpClientMock = {
      post: vi.fn()
    };

    service = new AuthService(httpClientMock as unknown as HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call HttpClient.post on login', (done) => {
    const mockResponse = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      accessToken: 'mockAccessToken',
      refreshToken: 'mockRefreshToken'
    };

    httpClientMock.post.mockReturnValue(of(mockResponse));

    service.login('testuser', 'password123').subscribe((res) => {
      expect(res).toEqual(mockResponse);
      expect(httpClientMock.post).toHaveBeenCalledWith(
        'https://dummyjson.com/auth/login',
        { username: 'testuser', password: 'password123' },
        {
          headers: expect.any(Object) // headers object is present
        }
      );
     
    });
  });

  it('should return the expected LoginResponse', (done) => {
    const mockResponse = {
      id: 42,
      username: 'alice',
      email: 'alice@example.com',
      accessToken: 'token123',
      refreshToken: 'refresh123'
    };

    httpClientMock.post.mockReturnValue(of(mockResponse));

    service.login('alice', 'mypassword').subscribe((res) => {
      expect(res.id).toBe(42);
      expect(res.username).toBe('alice');
      expect(res.email).toBe('alice@example.com');
      expect(res.accessToken).toBe('token123');
      expect(res.refreshToken).toBe('refresh123');
     
    });
  });
});