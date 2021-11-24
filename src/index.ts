import {startApp} from './api/app/app';

try {
  startApp();
} catch (error) {
  console.log('Warning Error catched in main function' + error);
}
