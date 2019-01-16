package com.github.toyobayashi.toast;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import android.widget.Toast;

public class MyToast extends CordovaPlugin {

  @Override
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    if (action.equals("toast")) {
      String message = args.getString(0);
      String type = args.getString(1);
      this.toast(message, type, callbackContext);
      return true;
    }
    return false;
  }

  private void toast(String message, String type, CallbackContext callbackContext) {
    int realType;

    if (type.equals("long")) {
      realType = Toast.LENGTH_LONG;
    } else {
      realType = Toast.LENGTH_SHORT;
    }

    cordova.getActivity().runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(cordova.getActivity(), message, realType).show();
        callbackContext.success(); // Thread-safe.
      }
    });
  }
}
