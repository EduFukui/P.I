export function getToken() {
    return localStorage.getItem("token");
}

export function getUser() {
    const user = localStorage.getItem("user");

    if (!user) {
        return null;
    }

    try {
        return JSON.parse(user);
    } catch {
        return null;
    }
}

export function isAuthenticated() {
    return !!getToken();
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}