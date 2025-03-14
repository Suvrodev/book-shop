import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_token: process.env.JWT_ACCESS_SECREET,
  store_id: process.env.STORE_ID,
  store_password: process.env.STORE_PASSWORD,
  payment_url: process.env.PAYMENT_URL,
};
