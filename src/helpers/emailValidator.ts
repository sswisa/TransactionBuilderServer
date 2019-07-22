export let isValidEmailAddress = (email: string): boolean => {
    let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email);
};