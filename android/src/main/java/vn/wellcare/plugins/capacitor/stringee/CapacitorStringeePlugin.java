package vn.wellcare.plugins.capacitor.stringee;

import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import com.stringee.StringeeClient;
import com.stringee.call.StringeeCall;
import com.stringee.call.StringeeCall2;
import com.stringee.exception.StringeeError;
import com.stringee.listener.StringeeConnectionListener;

import org.json.JSONObject;

@CapacitorPlugin(name = "CapacitorStringee")
public class CapacitorStringeePlugin extends Plugin {


  @PluginMethod
  public void StringeeConnect(PluginCall call) {
    String token = call.getString("token");
    Log.d(Common.TAG, "StringeeConnect : " + call);
    StringeeConnectionActivity connectionActivity = new StringeeConnectionActivity();
    StringeeClient client = connectionActivity.initAndConnectStringee(token);
    client.setConnectionListener(new StringeeConnectionListener() {
      @Override
      public void onConnectionConnected(StringeeClient stringeeClient, boolean b) {
        Log.d(Common.TAG, "onConnectionConnected");
        JSObject ret = new JSObject();
        ret.put("client", stringeeClient);
        ret.put("isReconnected", b);
        notifyListeners("onConnectionConnected", ret);
      }

      @Override
      public void onConnectionDisconnected(StringeeClient stringeeClient, boolean isReconnecting) {
        Log.d(Common.TAG, "onConnectionDisconnected");
        JSObject ret = new JSObject();
        ret.put("client", stringeeClient);
        ret.put("isReconnecting", isReconnecting);
        notifyListeners("onConnectionDisconnected", ret);
      }

      @Override
      public void onIncomingCall(StringeeCall stringeeCall) {
        Log.d(Common.TAG, "onIncomingCall: callId - " + stringeeCall.getCallId());
        JSObject ret = new JSObject();
        ret.put("callId", stringeeCall.getCallId());
        notifyListeners("onIncomingCall", ret);

      }

      @Override
      public void onIncomingCall2(StringeeCall2 stringeeCall2) {
        Log.d(Common.TAG, "onIncomingCall2: callId - " + stringeeCall2.getCallId());
        JSObject ret = new JSObject();
        ret.put("callId", stringeeCall2.getCallId());
        notifyListeners("onIncomingCall", ret);
      }

      @Override
      public void onConnectionError(StringeeClient stringeeClient, StringeeError stringeeError) {
        Log.d(Common.TAG, "onConnectionError: " + stringeeError.getMessage());
        JSObject ret = new JSObject();
        ret.put("client", stringeeClient);
        ret.put("message", stringeeError.getMessage());
        ret.put("error", stringeeError);
        notifyListeners("onConnectionError", ret);
      }

      @Override
      public void onRequestNewToken(StringeeClient stringeeClient) {
        Log.d(Common.TAG, "onRequestNewToken");
        JSObject ret = new JSObject();
        ret.put("client", stringeeClient);
        notifyListeners("onRequestNewToken", ret);
        // Get new token here and connect to Stringe server
      }

      @Override
      public void onCustomMessage(String from, JSONObject msg) {
        Log.d(Common.TAG, "onCustomMessage: from - " + from + " - msg - " + msg);
        JSObject ret = new JSObject();
        ret.put("from", from);
        ret.put("msg", msg);
        notifyListeners("onCustomMessage", ret);
      }


      @Override
      public void onTopicMessage(String from, JSONObject msg) {
        Log.d(Common.TAG, "onTopicMessage: from - " + from + " - msg - " + msg);
        JSObject ret = new JSObject();
        ret.put("from", from);
        ret.put("msg", msg);
        notifyListeners("onTopicMessage", ret);
      }
    });
  }

  // @PluginMethod
  // public void StringeeCall(PluginCall call) {
  //   String callFrom = call.getString("callFrom");
  //   String callTo = call.getString("callTo");
  //   implementation.StringeeCall(callFrom, callTo, (data) -> {
  //     JSObject ret = new JSObject();
  //     ret.put("data", data);
  //     call.resolve(ret);
  //   });
  // }

  @PluginMethod
  public void StringeeCall(PluginCall call) {
    Log.d(Common.TAG, "StringeeCall");
    String from = call.getString("from");
    String to = call.getString("to");
    Context context = getContext();
    Intent intent = new Intent(context, OutgoingCallActivity.class);
    intent.putExtra("from", from);
    intent.putExtra("to", to);
    context.startActivity(intent);
  }

  @PluginMethod
  public void StringeeReject(PluginCall call) {
    Log.d(Common.TAG, "StringeeReject");
  }

  // @PluginMethod
  // public void StringeeHangup(PluginCall call) {
  //   implementation.StringeeHangup((data) -> {
  //     JSObject ret = new JSObject();
  //     ret.put("data", data);
  //     call.resolve(ret);
  //   });
  // }
}
