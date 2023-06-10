package vn.wellcare.plugins.capacitor.stringee;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.provider.Settings;
import android.util.Log;
import android.view.View;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts.StartActivityForResult;
import androidx.appcompat.app.AlertDialog.Builder;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.LifecycleObserver;

import com.stringee.StringeeClient;
import vn.wellcare.plugins.capacitor.stringee.R.id;
import vn.wellcare.plugins.capacitor.stringee.R.layout;
import vn.wellcare.plugins.capacitor.stringee.R.string;
import com.stringee.call.StringeeCall;
import com.stringee.exception.StringeeError;
import com.stringee.listener.StringeeConnectionListener;

import org.json.JSONObject;

public class MainActivity extends AppCompatActivity implements View.OnClickListener, LifecycleObserver {
    private String to;
    //put your token here
    // private String token = "PUT_YOUR_TOKEN_HERE";

    private TextView tvUserId;
    private ActivityResultLauncher<Intent> launcher;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        initAndConnectStringee();
    }

    public void initAndConnectStringee(String token) {
        if (Common.client == null) {
            Common.client = new StringeeClient(this);
            Common.client.setConnectionListener(new StringeeConnectionListener() {
                @Override
                public void onConnectionConnected(final StringeeClient stringeeClient, boolean isReconnecting) {
                        Log.d(Common.TAG, "onConnectionConnected");

                }

                @Override
                public void onConnectionDisconnected(StringeeClient stringeeClient, boolean isReconnecting) {
                        Log.d(Common.TAG, "onConnectionDisconnected");

                }

                @Override
                public void onIncomingCall(final StringeeCall stringeeCall) {
                        Log.d(Common.TAG, "onIncomingCall: callId - " + stringeeCall.getCallId());

                }

                @Override
                public void onConnectionError(StringeeClient stringeeClient, final StringeeError stringeeError) {
                        Log.d(Common.TAG, "onConnectionError: " + stringeeError.getMessage());

                }

                @Override
                public void onRequestNewToken(StringeeClient stringeeClient) {
                     Log.d(Common.TAG, "onRequestNewToken");
                    // Get new token here and connect to Stringe server
                }

                @Override
                public void onCustomMessage(String from, JSONObject msg) {
                    Log.d(Common.TAG, "onCustomMessage: from - " + from + " - msg - " + msg);
                }

                @Override
                public void onTopicMessage(String from, JSONObject msg) {
                    Log.d(Common.TAG, "onTopicMessage: from - " + from + " - msg - " + msg);
                }
            });
        }
        Common.client.connect(token);
    }
}