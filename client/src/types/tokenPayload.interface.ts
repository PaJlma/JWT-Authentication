type TokenPayload<T> = T & {
  iat: number;
  exp: number;
}

export default TokenPayload;