package vn.wellcare.plugins.capacitor.stringee;
import android.util.Log;

public class CapacitorStringee  {

    public String echo(String value) {
        Log.i("CapacitorStringee", "Echo" + value);
        return "Echo: " + value;
    }

}
