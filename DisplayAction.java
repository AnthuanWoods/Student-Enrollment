package com.example.owner.anthony;
import java.util.Arrays;

import android.content.Context;
import android.content.Intent;
import android.provider.BaseColumns;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.TextView;
import android.database.sqlite.*;
import com.amazonaws.auth.CognitoCachingCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.dynamodbv2.*;
import com.amazonaws.mobileconnectors.dynamodbv2.dynamodbmapper.*;
import com.amazonaws.mobileconnectors.dynamodbv2.dynamodbmapper.DynamoDBMapper;
import com.amazonaws.AmazonClientException;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;

//displays a different layout based on the user's input
public class DisplayAction extends AppCompatActivity {
    public String comparea = "add";
    public String compared = "delete";
    public String comparel = "list";

    public static final String EXTRA_MESSAGE = "com.example.myfirstapp.MESSAGE";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_display_action);
    }

    //attempt at connecting to aws
    CognitoCachingCredentialsProvider credentialsProvider = new CognitoCachingCredentialsProvider(
            getApplicationContext(),
            "us-east-1:7a35d03d-809b-40aa-abda-ac97fb63ec76", // Identity Pool ID
            Regions.US_EAST_1 // Region
    );

    AmazonDynamoDBClient ddbClient = new AmazonDynamoDBClient(credentialsProvider);
 //   DynamoDBMapper mapper = new DynamoDBMapper(ddbClient);


    //retrieves the uer's string from previous activity
    Intent intent = getIntent();
    String message = intent.getStringExtra(Index.EXTRA_MESSAGE);

    public String getMessage() {
        return message;
    }
    public String getComparea() {
        return comparea;
    }

    //comparison of strings
    if(message.equals(comparea)){
        setContentView(R.layout.activity_display_action);
    }

    if(message.equals(compared)){
        setContentView(R.layout.activity_delete);
    }

    if(message.equals(comparel)){
        setContentView(R.layout.activity_delete);
    }

    //sends back to initial activity, simple implementation to include script to insert, update, or delete
    public void sendMessage(View view) {
        Intent intent = new Intent(this, Index.class);
        final EditText nameField = (EditText) findViewById(R.id.EditTextName);
        String action = nameField.getText().toString();
        intent.putExtra(EXTRA_MESSAGE, action);
        startActivity(intent);
    }
}