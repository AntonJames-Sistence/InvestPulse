const csrfFetch = async (url: string, options: RequestInit = {}) => {
    options.headers = new Headers(options.headers);
  
    options.method ||= 'GET';
  
    if (options.method.toUpperCase() !== 'GET') {
      (options.headers as Headers).set('Content-Type', 'application/json');
      const csrfToken = sessionStorage.getItem('sessionToken');
      if (csrfToken) {
        (options.headers as Headers).set('X-CSRF-Token', csrfToken);
      }
    }
  
    const res = await fetch(url, options);
  
    if (res.status >= 400) throw res;
  
    return res;
};

export default csrfFetch;  