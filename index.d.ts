declare global {
  interface JQuery {
    xclick(times: number, handler: () => void): JQuery;
  }
}

export {};
