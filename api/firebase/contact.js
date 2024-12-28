// api/firebase/contact.js
import { collection, addDoc } from "firebase/firestore";

export const submitContactForm = async (firestore, formData) => {
  try {
    await addDoc(collection(firestore, "contactMessages"), {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      timestamp: new Date(),
    });
    return { success: true, message: "Сообщение отправлено успешно!" };
  } catch (error) {
    console.error("Ошибка при отправке сообщения:", error);
    return { success: false, message: "Не удалось отправить сообщение." };
  }
};

export const subscribeUser = async (firestore, email) => {
  if (!email) {
    return { success: false, message: "Введите Email для подписки!" };
  }
  try {
    await addDoc(collection(firestore, "subscriptions"), {
      email: email,
      timestamp: new Date(),
    });
    return { success: true, message: "Подписка оформлена!" };
  } catch (error) {
    console.error("Ошибка при оформлении подписки:", error);
    return { success: false, message: "Не удалось оформить подписку." };
  }
};
