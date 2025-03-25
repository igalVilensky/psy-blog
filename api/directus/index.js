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
      directusAuthStore.accessToken = await directusAuthStore.refreshToken();
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
      const newToken = await directusAuthStore.refreshToken();
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
  first_name,
  profession,
  age,
  gender,
  about_yourself,
  avatar, // Added avatar parameter
  adminToken,
}) => {
  try {
    // Update the users collection first (for first_name and avatar)
    const userData = {};
    if (first_name) userData.first_name = first_name;
    if (avatar !== undefined) userData.avatar = avatar; // Can be null to remove avatar

    let userResponse;
    if (Object.keys(userData).length > 0) {
      userResponse = await directusApi.patch(`/users/${userId}`, userData);
    }

    // Update or create the user_profiles collection
    const profileData = {
      user: userId,
      profession: profession || null,
      age: age ? parseInt(age) : null,
      gender: gender || null,
      about_yourself: about_yourself || null,
    };

    const existingProfile = await directusApi.get(
      `/items/user_profiles?filter[user][_eq]=${userId}`
    );

    let profileResponse;
    if (
      existingProfile.data.data.length > 0 &&
      existingProfile.data.data[0].id
    ) {
      const profileId = existingProfile.data.data[0].id;
      profileResponse = await directusApi.patch(
        `/items/user_profiles/${profileId}`,
        profileData
      );
    } else {
      profileResponse = await directusApi.post(
        "/items/user_profiles",
        profileData
      );
    }

    return {
      success: true,
      user: userResponse?.data.data || {},
      profile: profileResponse.data.data || {},
    };
  } catch (error) {
    console.error("Directus profile update error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return {
      success: false,
      message:
        error.response?.data?.errors[0]?.message || "Profile update failed",
    };
  }
};

export const fetchDirectusUserProfile = async ({ userId }) => {
  try {
    const [userResponse, profileResponse] = await Promise.all([
      directusApi.get(`/users/${userId}`),
      directusApi.get(`/items/user_profiles?filter[user][_eq]=${userId}`),
    ]);

    return {
      success: true,
      user: userResponse.data.data,
      profile: profileResponse.data.data[0] || null,
    };
  } catch (error) {
    console.error("Fetch profile error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
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
