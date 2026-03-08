export type Credentials = {
  email: string;
  password: string;
};

export const validUser: Credentials = {
  email: "qa@example.com",
  password: "Test1234!",
};

export const invalidUser: Credentials = {
  email: "wrong@example.com",
  password: "Wrong123!",
};

