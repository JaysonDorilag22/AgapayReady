export const sendToken = (user, statusCode, res) => {
  console.log(user);
  // Create Jwt token
  const token = user.getJwtToken();

  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  // Set the cookie name as access_token
  res.status(statusCode).cookie("access_token", token, options).json({
    success: true,
    access_token: token,
    user,
  });
};
