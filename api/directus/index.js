// api/directus/index.js
import axios from "axios";

const directusApi = axios.create({
  baseURL: "http://localhost:8055",
});

export const registerDirectusUser = async ({
  email,
  password,
  firstName,
  adminToken,
  customerRoleId,
}) => {
  try {
    const response = await directusApi.post(
      "/users",
      {
        first_name: firstName,
        email,
        password,
        role: customerRoleId,
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );
    console.log("Directus response:", response.status, response.data);
    return { success: true, user: response.data.data || {} };
  } catch (error) {
    console.error("Directus registration failed:", error);
    return {
      success: false,
      message:
        error.response?.data?.errors[0]?.message ||
        "Directus registration failed",
    };
  }
};
