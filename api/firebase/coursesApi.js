// ~/api/coursesApi.js
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  serverTimestamp,
  collection,
  query,
  where,
} from "firebase/firestore";

// Initialize Firestore
const db = getFirestore();

/**
 * Purchase a course and create an entry in the coursesData collection.
 * @param {string} userId - The ID of the user purchasing the course.
 * @param {object} course - The course object being purchased.
 * @returns {Promise<void>}
 */
export const purchaseCourse = async (userId, course) => {
  try {
    // Define the data structure for the purchased course
    const courseData = {
      category: course.category,
      certificateEarned: false,
      courseId: course.id,
      description: course.description,
      discount: 20, // Example discount value
      hasPractical: course.hasPractical,
      id: course.id,
      image: course.image || "course-placeholder.jpg",
      lastAccessed: serverTimestamp(),
      lessons: course.lessonsCount,
      link: `/courses/${course.slug}`,
      price: course.price,
      progress: {
        completedLessons: [], // Initially, no lessons are completed
        progressPercentage: 0, // Initial progress is 0%
        timeSpent: "0ч", // Initial time spent is 0 hours
        totalLessons: course.lessonsCount,
      },
      purchaseDate: serverTimestamp(),
      status: "purchased",
      title: course.title,
      totalLessons: course.lessonsCount,
      userId: userId,
    };

    // Add the course data to the coursesData collection
    const courseRef = doc(db, "coursesData", `${userId}_${course.id}`); // Unique ID for the user-course combination
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
