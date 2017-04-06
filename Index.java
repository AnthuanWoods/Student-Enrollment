package com.example.owner.anthony;

import android.content.Intent;
import android.provider.BaseColumns;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

//initial activity for user
public class Index extends AppCompatActivity {
    public static final String EXTRA_MESSAGE = "com.example.myfirstapp.MESSAGE";
    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_index);
    }

    //sends message to next activity
    public void sendMessage(View view) {
        Intent intent = new Intent(this, DisplayAction.class);
        final EditText nameField = (EditText) findViewById(R.id.EditTextName);
        String action = nameField.getText().toString();
        intent.putExtra(EXTRA_MESSAGE, action);
        startActivity(intent);
    }
}
