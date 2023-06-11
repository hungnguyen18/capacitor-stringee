package vn.wellcare.plugins.capacitor.stringee;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.LifecycleObserver;

import com.stringee.StringeeClient;

public class StringeeConnectionActivity extends AppCompatActivity implements LifecycleObserver {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    public StringeeClient  initAndConnectStringee(String token) {
        if (Common.client == null) {
            Common.client = new StringeeClient(this);
        }
        Common.client.connect(token);
        return Common.client;
    }
}