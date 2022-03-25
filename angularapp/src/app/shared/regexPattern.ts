export const URL_PATTERN = new RegExp(
  '((http|https)://)(www.)?' +
    '[a-zA-Z0-9@:%._\\+~#?&//=]' +
    '{2,256}\\.[a-z]' +
    '{2,6}\\b([-a-zA-Z0-9@:%' +
    '._\\+~#?&//=]*)'
);

export const PHONE_NUMBER = new RegExp('[1-9]{1}[0-9]{9}');
