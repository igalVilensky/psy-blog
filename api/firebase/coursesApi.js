// ~/api/firebase/coursesApi.js
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  serverTimestamp,
  collection,
  query,
  where,
} from "firebase/firestore";

// Get Firestore instance from Nuxt plugin
const getDb = () => {
  const { $firestore } = useNuxtApp();
  return $firestore;
};

/**
 * Purchase a course and create an entry in the coursesData collection.
 * @param {string} userId - The ID of the user purchasing the course.
 * @param {object} course - The course object being purchased.
 * @returns {Promise<void>}
 */
export const purchaseCourse = async (userId, course) => {
  try {
    const db = getDb();

    // Define the data structure for the purchased course
    const courseData = {
      category: course.category,
      certificateEarned: false,
      courseId: course.id,
      description: course.description,
      discount: 20,
      hasPractical: course.hasPractical,
      id: course.id,
      image: course.image || "course-placeholder.jpg",
      lastAccessed: serverTimestamp(),
      lessons: course.lessonsCount,
      link: `/courses/${course.slug}`,
      price: course.price,
      progress: {
        completedLessons: [],
        progressPercentage: 0,
        timeSpent: "0ч",
        totalLessons: course.lessonsCount,
      },
      purchaseDate: serverTimestamp(),
      status: "purchased",
      title: course.title,
      totalLessons: course.lessonsCount,
      userId: userId,
    };

    // Add the course data to the coursesData collection
    const courseRef = doc(db, "coursesData", `${userId}_${course.id}`);
    await setDoc(courseRef, courseData);

    console.log("Course purchased successfully:", courseData);
  } catch (error) {
    console.error("Error purchasing course:", error);
    throw error;
  }
};

/**
 * Fetch all courses purchased by a user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<{ success: boolean, data: Array, message?: string }>} - Result of the operation.
 */
export const getPurchasedCourses = async (userId) => {
  try {
    const db = getDb();

    // Query the coursesData collection for documents where userId matches
    const coursesRef = collection(db, "coursesData");
    const q = query(coursesRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    // Map the documents to an array of course data
    const purchasedCourses = querySnapshot.docs.map((doc) => doc.data());
    return {
      success: true,
      data: purchasedCourses,
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
 * @param {string} userId - The ID of the user.
 * @param {string} courseId - The ID of the course.
 * @param {string} lessonId - The ID (slug) of the lesson to mark as completed.
 * @returns {Promise<{ success: boolean, message: string }>} - Result of the operation.
 */
export const updateCourseProgress = async (userId, courseId, lessonId) => {
  try {
    const db = getDb();

    // Reference to the course document
    const courseRef = doc(db, "coursesData", `${userId}_${courseId}`);

    // Get the course document
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
      lastAccessed: serverTimestamp(),
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

/**
 * Check if a lesson is completed
 * @param {string} userId - The ID of the user.
 * @param {string} courseId - The ID of the course.
 * @param {string} lessonId - The ID (slug) of the lesson to check.
 * @returns {Promise<{ success: boolean, isCompleted: boolean, message: string }>} - Result of the operation.
 */
export const checkLessonCompletion = async (userId, courseId, lessonId) => {
  try {
    const db = getDb();

    // Reference to the course document
    const courseRef = doc(db, "coursesData", `${userId}_${courseId}`);

    // Get the course document
    const docSnap = await getDoc(courseRef);

    if (docSnap.exists()) {
      const completedLessons = docSnap.data().progress.completedLessons || [];
      return {
        success: true,
        isCompleted: completedLessons.includes(lessonId),
        message: "Проверка завершена",
      };
    } else {
      return {
        success: false,
        isCompleted: false,
        message: "Курс не найден",
      };
    }
  } catch (error) {
    console.error("Ошибка при проверке завершенности урока:", error);
    return {
      success: false,
      isCompleted: false,
      message: "Ошибка при проверке завершенности урока",
    };
  }
};
