import * as jose from "jose";

const jwtsecret = "somebullllshit";
const jwtsec = new TextEncoder().encode(jwtsecret);

export const withauth =
  (...data) =>
  async (config) => {
    const token = config.headers.Authorization?.split(" ")[1];
    const verified = token ? await verifyToken(token) : false;

    if (!verified) {
      return [403, { message: "Unauthorized" }];
    }
    return typeof data[0] === "function" ? data[0](config) : data;
  };

export const verifyToken = async (token: string) => {
  try {
    const verified = await jose.jwtVerify(token, jwtsec);
    return verified;
  } catch {
    return false;
  }
};

export const generateRefreshToken = async (data) => {
  return await new jose.SignJWT({ data })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(jwtsec);
};
