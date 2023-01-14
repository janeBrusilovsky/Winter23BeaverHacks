from django import forms


class AccountForm(forms.Form):
    username = forms.CharField(label='Username', max_length=50)
    password = forms.CharField(label='Password', max_length=50)
    confirm_password = forms.CharField(label='Confirm Password', max_length=50)

    def clean(self):
        cleaned_data = super(AccountForm, self).clean()
        username = cleaned_data.get('username')
        password = cleaned_data.get('password')
        confirm_password = cleaned_data.get('confirm_password')

        if password and confirm_password and password != confirm_password:
            self._errors['confirm_password'] = self.error_class(['Passwords do not match.'])
            del self.cleaned_data['confirm_password']

        return cleaned_data
