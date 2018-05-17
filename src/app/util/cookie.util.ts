export class CookieUtils {

  public static get(name: string): string {
    let value;
    document.cookie.split(';').forEach(cookie => {
      const co = cookie.split('=');
      if (co[0] === name) { value = co[1]; }
    });
    return value;
  }

  public static set(name: string, value: string) {
    document.cookie = `${name}=${value}; path=/`;
  }

}
