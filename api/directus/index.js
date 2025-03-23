import axios from "axios";
import { useDirectusAuthStore } from "~/stores/auth2";

const directusApi = axios.create({
  baseURL: "http://localhost:8055",
});

// Request Interceptor
directusApi.interceptors.request.use(
  async (config) => {
    const directusAuthStore = useDirectusAuthStore();
    if (!directusAuthStore.accessToken) {
      directusAuthStore.accessToken = await directusAuthStore.refreshToken(); // Calls the action
    }
    if (directusAuthStore.accessToken) {
      config.headers.Authorization = `Bearer ${directusAuthStore.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
directusApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const directusAuthStore = useDirectusAuthStore();
      const newToken = await directusAuthStore.refreshToken(); // Calls the action
      if (newToken) {
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return directusApi(error.config);
      } else {
        directusAuthStore.clearAuth();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export const registerDirectusUser = async ({
  email,
  password,
  firstName,
  adminToken,
  customerRoleId,
  acceptedPrivacyPolicy,
  acceptedTerms,
}) => {
  try {
    const response = await directusApi.post(
      "/users",
      {
        first_name: firstName,
        email,
        password,
        role: customerRoleId,
        acceptedPrivacyPolicy,
        acceptedTerms,
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );
    return { success: true, user: response.data.data || {} };
  } catch (error) {
    console.error("Directus registration error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return {
      success: false,
      message:
        error.response?.data?.errors[0]?.message || "Registration failed",
      details: error.response?.data || error.message,
    };
  }
};

export const updateDirectusUserProfile = async ({
  userId,
  displayName,
  profession,
  age,
  gender,
  about_yourself,
  adminToken,
}) => {
  try {
    const profileData = {
      user: userId,
      display_name: displayName,
      profession: profession || null,
      age: age ? parseInt(age) : null,
      gender: gender || null,
      about_yourself: about_yourself || null,
    };

    const existingProfile = await directusApi.get(
      `/items/user_profiles?filter[user][_eq]=${userId}`,
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );

    let response;
    if (
      existingProfile.data.data.length > 0 &&
      existingProfile.data.data[0].id
    ) {
      const profileId = existingProfile.data.data[0].id;
      response = await directusApi.patch(
        `/items/user_profiles/${profileId}`,
        profileData,
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
    } else {
      response = await directusApi.post("/items/user_profiles", profileData, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
    }
    return { success: true, profile: response.data.data || {} };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.errors[0]?.message || "Profile update failed",
    };
  }
};

export const fetchDirectusUserProfile = async ({ userId }) => {
  try {
    const response = await directusApi.get(
      `/items/user_profiles?filter[user][_eq]=${userId}`
    );

    return { success: true, profile: response.data.data[0] || null };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.errors[0]?.message || "Failed to fetch profile",
    };
  }
};

export const getCurrentDirectusUser = async () => {
  try {
    const response = await directusApi.get("/users/me");
    return { success: true, user: response.data.data };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.errors[0]?.message || "Failed to fetch user",
    };
  }
};

export default directusApi;
