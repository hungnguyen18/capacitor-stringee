package vn.wellcare.plugins.capacitor.stringee;

import android.content.Context;
import android.content.Intent;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "CapacitorStringee")
public class CapacitorStringeePlugin extends Plugin {

  // @PluginMethod
  // public void StringeeConnect(PluginCall call) {
  //   String token = call.getString("token");
  //   implementation.StringeeConnect(token, (data) -> {
  //     JSObject ret = new JSObject();
  //     ret.put("data", data);
  //     call.resolve(ret);
  //   });
  // }

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
    String from = call.getString("from");
    String to = call.getString("to");
    Context context = getContext();
    Intent intent = new Intent(context, OutgoingCallActivity.class);
    intent.putExtra("from", from);
    intent.putExtra("to", to);
    context.startActivity(intent);
  }
  // @PluginMethod
  // public void StringeeReject(PluginCall call) {
  //   implementation.StringeeReject((data) -> {
  //     JSObject ret = new JSObject();
  //     ret.put("data", data);
  //     call.resolve(ret);
  //   });
  // }

  // @PluginMethod
  // public void StringeeHangup(PluginCall call) {
  //   implementation.StringeeHangup((data) -> {
  //     JSObject ret = new JSObject();
  //     ret.put("data", data);
  //     call.resolve(ret);
  //   });
  // }
}
