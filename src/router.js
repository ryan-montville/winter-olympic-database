class Router {
  routes = [];
  ignoredPaths = [];

  ignorePath(pathPrefix) {
    this.ignoredPaths.push(pathPrefix);
  }

  addRoute(path, handler) {
    const paramNames = [];
    let regexPath;

    if (path === '*') {
      regexPath = '.*';
    } else {
      const sanitizedPath = path.replace(/\/+$/, '') || '/';
      regexPath = sanitizedPath.replace(/:([^/]+)/g, (_, paramName) => {
        paramNames.push(paramName);
        return '([^/]+)';
      });
    }

    this.routes.push({
      pattern: new RegExp(`^${regexPath}/?$`),
      paramNames,
      handler,
    });
  }

  navigateTo(path, replace = false) {
    if (replace) {
      window.history.replaceState({}, '', path);
    } else {
      window.history.pushState({}, '', path);
    }
    this.handleRoute();
  }

  init() {
    window.addEventListener('popstate', () => this.handleRoute());

    document.addEventListener('click', (e) => {
      const target = e.target.closest('a');
      
      if (
        target &&
        target.href &&
        target.origin === window.location.origin &&
        target.getAttribute('target') !== '_blank' &&
        !target.hasAttribute('download') &&
        !target.hasAttribute('data-external') &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey &&
        !e.altKey
      ) {
        const url = new URL(target.href, import.meta.url);

        const isIgnored = this.ignoredPaths.some((prefix) => 
          url.pathname.startsWith(prefix)
        );

        if (isIgnored) {
          return; 
        }

        if (url.pathname !== window.location.pathname || url.search !== window.location.search) {
          e.preventDefault();
          this.navigateTo(url.pathname + url.search + url.hash);
        }
      }
    });

    this.handleRoute();
  }

  handleRoute() {
    const pathname = window.location.pathname;
    const query = new URLSearchParams(window.location.search);

    for (const route of this.routes) {
      const match = pathname.match(route.pattern);
      if (match) {
        const params = {};
        route.paramNames.forEach((name, index) => {
          params[name] = match[index + 1] ? decodeURIComponent(match[index + 1]) : '';
        });
        route.handler(params, query);
        return;
      }
    }

    this.navigateTo('/', true);
  }
}

export const router = new Router();