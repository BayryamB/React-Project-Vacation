export default function RegisterValidator(userData) {
    const errors = {};
    if (!userData.userName) {
        errors.userName = "Name is required";
    } else if (userData.userName.length < 3) {
        errors.userName = "Name needs to be 3 characters or more";
    }
    if (!userData.email) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
        errors.email = "Email is invalid";
    }
    if (!userData.password) {
        errors.password = "Password is required";
    } else if (userData.password.length < 6) {
        errors.password = "Password needs to be 6 characters or more";
    }
    if (userData.password !== userData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
    }
    return errors;
}
