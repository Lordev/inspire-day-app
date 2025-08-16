```mermaid
graph LR
    Start[User Login/Register] --> CheckPreferences{Are Preferences Set?}
    CheckPreferences -->|Yes| Dashboard[Show Dashboard]
    CheckPreferences -->|No| PreferencesForm[Show Preferences Form]
    
    subgraph PreferencesProcess [Preferences Process]
        PreferencesForm --> ValidateInput{Is Input Valid?}
        ValidateInput -->|No| ShowErrors[Show Validation Errors]
        ShowErrors --> PreferencesForm
        ValidateInput -->|Yes| SavePreferences[Save Preferences]
        SavePreferences --> SendWelcomeEmail[Send Welcome Email]
    end

    PreferencesProcess --> Dashboard
    Dashboard --> UpdatePreferences[Update Preferences?]
    UpdatePreferences -->|Yes| PreferencesForm
    UpdatePreferences -->|No| End[Continue Using App]