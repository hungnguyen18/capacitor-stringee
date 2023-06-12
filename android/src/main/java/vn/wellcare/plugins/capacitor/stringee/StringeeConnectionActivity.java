package vn.wellcare.plugins.capacitor.stringee;

import android.content.Context;

import com.stringee.StringeeClient;

public class StringeeConnectionActivity {

    private Context context;

    public StringeeConnectionActivity(Context context) {
        this.context = context;
    }

    public StringeeClient initAndConnectStringee(String token) {
        if (Common.client == null) {
            Common.client = new StringeeClient(context);
        }
        Common.client.connect(token);
        return Common.client;
    }
}