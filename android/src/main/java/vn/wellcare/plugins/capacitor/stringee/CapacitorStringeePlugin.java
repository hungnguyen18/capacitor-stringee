package vn.wellcare.plugins.capacitor.stringee;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "CapacitorStringee")
public class CapacitorStringeePlugin extends Plugin {

  private CapacitorStringee implementation = new CapacitorStringee();

  @PluginMethod
  public void echo(PluginCall call) {
    String value = call.getString("value");

    JSObject ret = new JSObject();
    ret.put("value", implementation.echo(value));
    call.resolve(ret);
  }

  @PluginMethod
  public void StringeeConnect(PluginCall call) {
    String token = call.getString("token");
    implementation.StringeeConnect(token, (data) -> {
      JSObject ret = new JSObject();
      ret.put("data", data);
      call.resolve(ret);
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
    String callFrom = call.getString("callFrom");
    String callTo = call.getString("callTo");
    getActivity().runOnUiThread(() -> {
      OutgoingCallActivity outgoingCallActivity = new OutgoingCallActivity();
      outgoingCallActivity.setFrom(callFrom);
      outgoingCallActivity.setTo(callTo);
      outgoingCallActivity.onCreate(null);
      implementation.StringeeCall(callFrom, callTo, (data) -> {
        JSObject ret = new JSObject();
        ret.put("data", data);
        call.resolve(ret);
      });
    });
  }

  @PluginMethod
  public void StringeeReject(PluginCall call) {
    implementation.StringeeReject((data) -> {
      JSObject ret = new JSObject();
      ret.put("data", data);
      call.resolve(ret);
    });
  }

  @PluginMethod
  public void StringeeHangup(PluginCall call) {
    implementation.StringeeHangup((data) -> {
      JSObject ret = new JSObject();
      ret.put("data", data);
      call.resolve(ret);
    });
  }
}
