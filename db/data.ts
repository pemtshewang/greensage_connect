import Realm from 'realm';

// Define the user schema for the local Realm database
class User {
  public static schema: Realm.ObjectSchema = {
    name: 'User',
    properties: {
      username: 'string',
      password: 'string',
      // Add other user-related properties as needed
    },
  };
}

// Function to log in a user locally
async function localLogin(username: string, password: string) {
  try {
    const realm = await Realm.open({
      schema: [User.schema],
    });

    const user = realm.objects<User>('User').filtered(`username = "${username}" AND password = "${password}"`);

    if (user.length > 0) {
      console.log('Login successful!');
      // Perform actions for successful login
    } else {
      console.log('Invalid credentials!');
      // Handle invalid login attempt
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example usage:
const userInputUsername = 'user';
const userInputPassword = 'password';

localLogin(userInputUsername, userInputPassword);
