var exec = require('cordova/exec');

exports.toast = function (message, duration, success, error) {
  if (typeof duration === 'string') {
    exec(success, error, 'MyToast', 'toast', [message, message]);
  } else {
    exec(success, error, 'MyToast', 'toast', [message, "short"]);
  }
};
