import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

/**
 * Purchase a course for a user
 * @param {Firestore} firestore - Firestore instance
 * @param {string} userId - User ID
 * @param {string} courseId - Course ID
 * @param {object} courseData - Course metadata (e.g., title, description, totalLessons)
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const purchaseCourse = async (
  firestore,
  userId,
  courseId,
  courseData
) => {
  const courseRef = doc(firestore, "courses", `${userId}_${courseId}`);

  try {
    // Check if the course is already purchased
    const docSnap = await getDoc(courseRef);
    if (docSnap.exists()) {
      return {
        success: false,
        message: "Курс уже куплен",
      };
    }

    // Create a new course document
    await setDoc(courseRef, {
      userId,
      courseId,
      purchaseDate: new Date().toISOString(),
      status: "purchased",
      progress: {
        completedLessons: [],
        totalLessons: courseData.totalLessons || 0,
        timeSpent: "0ч",
        progressPercentage: 0,
      },
      lastAccessed: new Date().toISOString(),
      certificateEarned: false,
    });

    return {
      success: true,
      message: "Курс успешно куплен",
    };
  } catch (error) {
    console.error("Ошибка при покупке курса:", error);
    return {
      success: false,
      message: "Ошибка при покупке курса",
    };
  }
};
/**
 * Get user's purchased courses
 * @param {Firestore} firestore - Firestore instance
 * @param {string} userId - User ID
 * @returns {Promise<{success: boolean, data: Array, message: string}>}
 */
export const getPurchasedCourses = async (firestore, userId) => {
  const coursesRef = collection(firestore, "courses");

  try {
    // Query courses for the user
    const q = query(coursesRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const courses = [];
    querySnapshot.forEach((doc) => {
      courses.push(doc.data());
    });

    return {
      success: true,
      data: courses,
    };
  } catch (error) {
    console.error("Ошибка при получении купленных курсов:", error);
    return {
      success: false,
      message: "Ошибка при получении купленных курсов",
    };
  }
};

/**
 * Update course progress (e.g., mark a lesson as completed)
 * @param {Firestore} firestore - Firestore instance
 * @param {string} userId - User ID
 * @param {string} courseId - Course ID
 * @param {string} lessonId - Lesson ID
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const updateCourseProgress = async (
  firestore,
  userId,
  courseId,
  lessonId
) => {
  const courseRef = doc(firestore, "courses", `${userId}_${courseId}`);

  try {
    const docSnap = await getDoc(courseRef);
    if (!docSnap.exists()) {
      return {
        success: false,
        message: "Курс не найден",
      };
    }

    const courseData = docSnap.data();
    const completedLessons = courseData.progress.completedLessons || [];

    // Check if the lesson is already completed
    if (completedLessons.includes(lessonId)) {
      return {
        success: false,
        message: "Урок уже завершен",
      };
    }

    // Add the lesson to completedLessons
    completedLessons.push(lessonId);

    // Calculate progress percentage
    const totalLessons = courseData.progress.totalLessons || 1;
    const progressPercentage = Math.round(
      (completedLessons.length / totalLessons) * 100
    );

    // Update the course document
    await updateDoc(courseRef, {
      progress: {
        ...courseData.progress,
        completedLessons,
        progressPercentage,
      },
      lastAccessed: new Date().toISOString(),
    });

    return {
      success: true,
      message: "Прогресс курса обновлен",
    };
  } catch (error) {
    console.error("Ошибка при обновлении прогресса курса:", error);
    return {
      success: false,
      message: "Ошибка при обновлении прогресса курса",
    };
  }
};
