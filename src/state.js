class AppState {
    _currentUser = null;
    _currentRole = null;
    _pages = null;
    _projects = null;

    get currentUser() {
        return this._currentUser;
    }

    setCurrentUser(newUser) {
        this._currentUser = newUser;
    }

    get currentRole() {
        return this._currentRole;
    }

    setCurrentRole(newRole) {
        this._currentRole = newRole;
    }

    get pages() {
        return this._pages;
    }

    setPages(pagesArray) {
        this._pages = pagesArray;
    }

    get projects() {
        return this._projects;
    }

    setProjects(projectsArray) {
        this._projects = projectsArray;
    }
}

export const state = new AppState();