
CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  username VARCHAR(15) NOT NULL,
  password VARCHAR NOT NULL
);

-- Wstawienie rekordu dla nowego użytkownika
INSERT INTO "user" (username, password)
VALUES ('exampleUsername', 'examplePassword');