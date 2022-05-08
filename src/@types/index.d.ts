declare global {
  namespace NodeJS {
    interface ProcessEnv {
      KAFKA_CLIENT_ID: string;
      KAFKA_BROKERS: string;
      KAFKA_GROUP_ID: string;
      API_PORT: number;
      NODE_ENV: string;
      JWT_SECRET: string;
      AUTH_COOKIE_SECRET: string;
      COOKIE_DOMAIN: string;

      MAIL_HOST: string;
      MAIL_PORT: number;
      MAIL_USERNAME: string;
      MAIL_PASSWORD: string;
    }
  }

  interface AuthTokenData {
    userId: string;
    organizationId?: string | null;
  }
}

export {};
