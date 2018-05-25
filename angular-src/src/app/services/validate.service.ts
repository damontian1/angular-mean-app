import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }
  validateNotEmpty(newUser) {
    if (
      newUser.name === undefined ||
      newUser.email === undefined ||
      newUser.username === undefined ||
      newUser.password === undefined
    ) {
      return false;
    }
    else {
      return true;
    }
  }
  validateIsEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
