declare global {
  const DotEnv: {
    APP_NAME: string;
    APP_SERVER_URL: string;
    APP_BASE_API: string;

    REQUEST_TIMEOUT: number;
    REQUEST_SUFFIX: string;
  }
}

export {}
