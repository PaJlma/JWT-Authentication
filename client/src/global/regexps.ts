export interface IRegexps extends Record<string, RegExp> {
  email: RegExp;
}

export const regexps: IRegexps = {
  email: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/,
}