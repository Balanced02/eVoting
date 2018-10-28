import jwtDecode from 'jwt-decode';
import SuperFetch from './superFetch';
class JwtAuth {
  login = async userInfo => {
    if (!userInfo.username || !userInfo.password) {
      return { error: 'please fill in the input' };
    }
    return await SuperFetch.post('login', userInfo).then(response => {
      return this.checkExpirity(response.token);
    });
  };
  checkDemoPage = async token => {
    if (this.checkExpirity(token).error) {
      return { error: 'Token expired' };
    }
    return await SuperFetch.post('api/test')
      .then(response => response)
      .catch(error => ({ error: JSON.stringify(error) }));
  };
  checkExpirity = token => {
    if (!token) {
      return {
        error: 'not matched'
      };
    }
    try {
      const profile = jwtDecode(token);
      const { expiredAt } = profile;
      if (expiredAt > new Date().getTime())
        return {
          ...profile,
          token,
          expiredAt: new Date(expiredAt)
        };
      else {
        return { error: 'Token expired' };
      }
    } catch (e) {
      return { error: 'Server Error' };
    }
  };
}
export default new JwtAuth();
