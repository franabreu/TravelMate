import { HttpClient } from '@angular/common/http';
import { ConfigService } from './../../config/configService';
import { AbstractWS } from './abstractService';
import { Injectable } from '@angular/core';
import { User, Trip, UserProfile, City } from '../app.data.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class RestWS extends AbstractWS {
  path = '';

  constructor(
    private config: ConfigService,
    http: HttpClient,
    private cookieService: CookieService
  ) {
    super(http);
    // this.path = this.config.config().restUrlPrefix;
    this.path = this.config.config().restUrlPrefixLocalhost;
  }
  // Methods
  public login(credentials) {
    const fd = new FormData();
    fd.append('username', credentials.username);
    fd.append('password', credentials.password);
    return this.makePostRequest(this.path + 'login/', fd)
      .then(res => {
        console.log('Logged successfully');
        return Promise.resolve(res);
      })
      .catch(error => {
        console.log('Error: ' + error);
        return Promise.reject(error);
      });
  }

  public test(): Promise<any> {
    const requestParams = {
      text: 'texto'
    };

    return this.makeGetRequest(this.path + 'users/', requestParams)
      .then((res: any) => {
        return Promise.resolve(res);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
  public getUserLogged(token) {
    const fd = new FormData();
    fd.append('token', token);
    return this.makePostRequest(this.path + 'getUserByToken/', fd)
      .then(res => {
        return Promise.resolve(res);
      })
      .catch(err => {
        console.log('Error: ' + err);
        return Promise.reject(err);
      });
  }

  public listFriends(): Promise<any> {
    return null;
  }

  public listDiscover(): Promise<any> {
    const discover: UserProfile[] = [];
    const user: User = {
      id: 5,
      username: null
    };
    const user1: UserProfile = {
      user: user,
      email: null,
      first_name: 'User1',
      last_name: null,
      description: 'nature is waiting for me!',
      birthdate: null,
      city: null,
      nationality: null,
      photo: '../../../assets/img/avatar5.jpeg',
      discoverPhoto: null,
      averageRate: null,
      numRate: null,
      isPremium: null,
      status: null,
      gender: null,
      language: null
    };
    const user2: UserProfile = {
      user: user,
      email: null,
      first_name: 'User1',
      last_name: null,
      description: 'nature is waiting for me!',
      birthdate: null,
      city: null,
      nationality: null,
      photo: '../../../assets/img/avatar5.jpeg',
      discoverPhoto: null,
      averageRate: null,
      numRate: null,
      isPremium: null,
      status: null,
      gender: null,
      language: null
    };
    const user3: UserProfile = {
      user: user,
      email: null,
      first_name: 'User1',
      last_name: null,
      description: 'nature is waiting for me!',
      birthdate: null,
      city: null,
      nationality: null,
      photo: '../../../assets/img/avatar5.jpeg',
      discoverPhoto: null,
      averageRate: null,
      numRate: null,
      isPremium: null,
      status: null,
      gender: null,
      language: null
    };
    discover.push(user1, user2, user3);
    // return this.makeGetRequest(this.path + "users/", null).then((discover: any) => {
    //     return Promise.resolve(discover);
    // }).catch((error) => {
    //     return Promise.reject(error);
    // });
    return Promise.resolve(discover);
  }

  public listMeetYou(): Promise<any> {
    const meetYou: UserProfile[] = [];
    const user: User = {
      id: null,
      username: null
    };
    const user1: UserProfile = {
      user: user,
      email: null,
      first_name: 'User1',
      last_name: null,
      description: 'nature is waiting for me!',
      birthdate: null,
      city: null,
      nationality: null,
      photo: '../../../assets/img/avatar5.jpeg',
      discoverPhoto: null,
      averageRate: null,
      numRate: null,
      isPremium: null,
      status: null,
      gender: null,
      language: null
    };
    const user2: UserProfile = {
      user: user,
      email: null,
      first_name: 'User1',
      last_name: null,
      description: 'nature is waiting for me!',
      birthdate: null,
      city: null,
      nationality: null,
      photo: '../../../assets/img/avatar5.jpeg',
      discoverPhoto: null,
      averageRate: null,
      numRate: null,
      isPremium: null,
      status: null,
      gender: null,
      language: null
    };
    const user3: UserProfile = {
      user: user,
      email: null,
      first_name: 'User1',
      last_name: null,
      description: 'nature is waiting for me!',
      birthdate: null,
      city: null,
      nationality: null,
      photo: '../../../assets/img/avatar5.jpeg',
      discoverPhoto: null,
      averageRate: null,
      numRate: null,
      isPremium: null,
      status: null,
      gender: null,
      language: null
    };
    meetYou.push(user1, user2, user3);
    // return this.makeGetRequest(this.path + "users/", null).then((friends: any) => {
    //     return Promise.resolve(friends);
    // }).catch((error) => {
    //     return Promise.reject(error);
    // });
    return Promise.resolve(meetYou);
  }

  public listYourTrips(): Promise<any> {
    const fd = new FormData();
    let token: string;
    token = this.cookieService.get('token');
    fd.append('token', token);
    return this.getUserLogged(token).then(res => {
      return this.makeGetRequest(this.path + "trips/mytrips", fd).then((trips: any) => {
        return Promise.resolve(trips);
      }).catch((error) => {
        return Promise.reject(error);
      });
    }).catch((error) => {
      return Promise.reject(error);
    });
  }

  public createTrip(
    title: string,
    description: string,
    start_date: Date,
    end_date: Date,
    trip_type: string,
    image: string,
    city: Number
  ): Promise<any> {
    const fd = new FormData();
    let user: User;
    let token: string;
    token = this.cookieService.get('token');
    return this.getUserLogged(token)
      .then(res => {
        fd.append('title', title);
        fd.append('description', description);
        fd.append('start_date', String(start_date));
        fd.append('end_date', String(end_date));
        fd.append('trip_type', trip_type);
        fd.append('image', image);
        fd.append('city', String(city));
        user = res;
        fd.append('user_id', String(user.id));

        return this.makePostRequest(this.path + 'createTrip/', fd, token)
          .then(res2 => {
            console.log('Se ha creado exitosamente');
            return Promise.resolve(res2);
          })
          .catch(error => {
            console.log('Error: ' + error);
            return Promise.reject(error);
          });
      })
      .catch(error => {
        console.log('Error: ' + error);
        return Promise.reject(error);
      });
  }

  public listCities(): Promise<any> {
    const token = this.cookieService.get('token');
    return this.makeGetRequest(this.path + 'list-cities/', false, token)
      .then(res => {
        return Promise.resolve(res);
      })
      .catch(error => {
        console.log('Error: ' + error);
        return Promise.reject(error);
      });
  }
}
