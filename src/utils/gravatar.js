import md5 from 'js-md5';

export function getIconUrl(email) {
  const hash = md5(email);
  return `https://www.gravatar.com/avatar/${email}?d=mm`;
}
