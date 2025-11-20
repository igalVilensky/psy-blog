// composables/useCommunity.js
import { ref, computed } from 'vue';
import {
    collection,
    addDoc,
    query,
    orderBy,
    limit,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    increment,
    onSnapshot,
    serverTimestamp,
    where,
    runTransaction
} from 'firebase/firestore';
import { useAuthStore } from '~/stores/auth';

export const useCommunity = () => {
    const { $firestore } = useNuxtApp();
    const authStore = useAuthStore();

    const posts = ref([]);
    const stats = ref({
        members: 0,
        posts: 0,
        discussions: 0,
        insights: 0
    });
    const loading = ref(false);
    const error = ref(null);

    /**
     * Create a new community post
     */
    const createPost = async (postData) => {
        if (!authStore.user) {
            throw new Error('User must be authenticated to create posts');
        }

        loading.value = true;
        error.value = null;

        try {
            const postsRef = collection($firestore, 'community_posts');

            // Prepare post document
            const newPost = {
                title: postData.title,
                content: postData.content,
                category: postData.category || 'Обсуждение',
                tags: postData.tags || [],
                authorId: authStore.user.uid,
                authorName: authStore.user.displayName || authStore.user.email || 'Аноним',
                authorEmail: authStore.user.email,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                likes: 0,
                comments: 0,
                shares: 0,
                likedBy: []
            };

            // Add post to Firestore
            const docRef = await addDoc(postsRef, newPost);

            // Increment stats
            await incrementStat('posts');

            // Join community if not already a member
            joinCommunity();

            return { id: docRef.id, ...newPost };
        } catch (err) {
            console.error('Error creating post:', err);
            error.value = err.message;
            throw err;
        } finally {
            loading.value = false;
        }
    };

    /**
     * Fetch posts with optional filtering
     */
    const getPosts = async (options = {}) => {
        loading.value = true;
        error.value = null;

        try {
            const postsRef = collection($firestore, 'community_posts');
            let q = query(
                postsRef,
                orderBy('createdAt', 'desc'),
                limit(options.limit || 20)
            );

            // Add filters if provided
            if (options.category) {
                q = query(q, where('category', '==', options.category));
            }

            const querySnapshot = await getDocs(q);
            const fetchedPosts = [];

            querySnapshot.forEach((doc) => {
                fetchedPosts.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            posts.value = fetchedPosts;
            return fetchedPosts;
        } catch (err) {
            console.error('Error fetching posts:', err);
            error.value = err.message;
            throw err;
        } finally {
            loading.value = false;
        }
    };

    /**
     * Subscribe to real-time posts updates
     */
    const subscribeToPost = (options = {}) => {
        const postsRef = collection($firestore, 'community_posts');
        let q = query(
            postsRef,
            orderBy('createdAt', 'desc'),
            limit(options.limit || 20)
        );

        return onSnapshot(q, (snapshot) => {
            const fetchedPosts = [];
            snapshot.forEach((doc) => {
                fetchedPosts.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            posts.value = fetchedPosts;
        }, (err) => {
            console.error('Error in posts subscription:', err);
            error.value = err.message;
        });
    };

    /**
     * Like/unlike a post
     */
    const toggleLike = async (postId) => {
        if (!authStore.user) {
            throw new Error('User must be authenticated to like posts');
        }

        try {
            const postRef = doc($firestore, 'community_posts', postId);
            const postSnap = await getDoc(postRef);

            if (!postSnap.exists()) {
                throw new Error('Post not found');
            }

            const postData = postSnap.data();
            const likedBy = postData.likedBy || [];
            const userLiked = likedBy.includes(authStore.user.uid);

            if (userLiked) {
                // Unlike
                await updateDoc(postRef, {
                    likes: increment(-1),
                    likedBy: likedBy.filter(uid => uid !== authStore.user.uid)
                });
            } else {
                // Like
                await updateDoc(postRef, {
                    likes: increment(1),
                    likedBy: [...likedBy, authStore.user.uid]
                });
            }

            return !userLiked; // Return new liked state
        } catch (err) {
            console.error('Error toggling like:', err);
            error.value = err.message;
            throw err;
        }
    };

    /**
     * Get community statistics
     */
    const getStats = async () => {
        try {
            const statsRef = doc($firestore, 'community_stats', 'global');
            const statsSnap = await getDoc(statsRef);

            if (statsSnap.exists()) {
                stats.value = statsSnap.data();
            } else {
                // Initialize stats if they don't exist
                await initializeStats();
            }

            return stats.value;
        } catch (err) {
            console.error('Error fetching stats:', err);
            error.value = err.message;
            throw err;
        }
    };

    /**
     * Subscribe to real-time stats updates
     */
    const subscribeToStats = () => {
        const statsRef = doc($firestore, 'community_stats', 'global');

        return onSnapshot(statsRef, (doc) => {
            if (doc.exists()) {
                stats.value = doc.data();
            }
        }, (err) => {
            console.error('Error in stats subscription:', err);
            error.value = err.message;
        });
    };

    /**
     * Initialize stats document
     */
    const initializeStats = async () => {
        try {
            const statsRef = doc($firestore, 'community_stats', 'global');
            const initialStats = {
                members: 0,
                posts: 0,
                discussions: 0,
                insights: 0,
                lastUpdated: serverTimestamp()
            };

            await updateDoc(statsRef, initialStats).catch(async () => {
                // If document doesn't exist, create it
                const { setDoc } = await import('firebase/firestore');
                await setDoc(statsRef, initialStats);
            });

            stats.value = initialStats;
        } catch (err) {
            console.error('Error initializing stats:', err);
            throw err;
        }
    };

    /**
     * Increment a specific stat
     */
    const incrementStat = async (statName) => {
        try {
            const statsRef = doc($firestore, 'community_stats', 'global');

            await runTransaction($firestore, async (transaction) => {
                const statsDoc = await transaction.get(statsRef);

                if (!statsDoc.exists()) {
                    // Create initial stats
                    transaction.set(statsRef, {
                        members: 0,
                        posts: 0,
                        discussions: 0,
                        insights: 0,
                        lastUpdated: serverTimestamp()
                    });
                }

                transaction.update(statsRef, {
                    [statName]: increment(1),
                    lastUpdated: serverTimestamp()
                });
            });
        } catch (err) {
            console.error(`Error incrementing ${statName}:`, err);
            throw err;
        }
    };

    /**
     * Get user's liked posts
     */
    const isPostLikedByUser = (post) => {
        if (!authStore.user || !post.likedBy) return false;
        return post.likedBy.includes(authStore.user.uid);
    };

    /**
     * Share a post (increment share count)
     */
    const sharePost = async (postId) => {
        try {
            const postRef = doc($firestore, 'community_posts', postId);
            await updateDoc(postRef, {
                shares: increment(1)
            });
            // Join community if not already a member
            joinCommunity();
            return true;
        } catch (err) {
            console.error('Error sharing post:', err);
            error.value = err.message;
            throw err;
        }
    };

    /**
     * Add comment to a post
     */
    const addComment = async (postId, commentText) => {
        if (!authStore.user) {
            throw new Error('User must be authenticated to comment');
        }

        try {
            const postRef = doc($firestore, 'community_posts', postId);
            const commentsRef = collection(postRef, 'comments');

            const newComment = {
                content: commentText,
                authorId: authStore.user.uid,
                authorName: authStore.user.displayName || authStore.user.email || 'Аноним',
                authorAvatar: authStore.user.photoURL || null,
                createdAt: serverTimestamp(),
                likes: 0
            };

            // Add comment to subcollection
            const commentDoc = await addDoc(commentsRef, newComment);

            // Increment comment count on post
            await updateDoc(postRef, {
                comments: increment(1)
            });

            // Join community if not already a member
            joinCommunity();

            return { id: commentDoc.id, ...newComment };
        } catch (err) {
            console.error('Error adding comment:', err);
            error.value = err.message;
            throw err;
        }
    };

    /**
     * Get comments for a post
     */
    const getComments = async (postId) => {
        try {
            const commentsRef = collection($firestore, 'community_posts', postId, 'comments');
            const q = query(commentsRef, orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);

            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (err) {
            console.error('Error fetching comments:', err);
            throw err;
        }
    };

    /**
     * Subscribe to comments for a post
     */
    const subscribeToComments = (postId, callback) => {
        const commentsRef = collection($firestore, 'community_posts', postId, 'comments');
        const q = query(commentsRef, orderBy('createdAt', 'desc'));

        return onSnapshot(q, (snapshot) => {
            const comments = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            callback(comments);
        }, (err) => {
            console.error('Error subscribing to comments:', err);
        });
    };

    /**
     * Save/unsave post to favorites
     */
    const toggleSavePost = async (postId) => {
        if (!authStore.user) {
            throw new Error('User must be authenticated to save posts');
        }

        try {
            const userRef = doc($firestore, 'users', authStore.user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                throw new Error('User profile not found');
            }

            const userData = userSnap.data();
            const savedPosts = userData.savedPosts || [];
            const isSaved = savedPosts.includes(postId);

            if (isSaved) {
                // Unsave
                await updateDoc(userRef, {
                    savedPosts: savedPosts.filter(id => id !== postId)
                });
            } else {
                // Save
                await updateDoc(userRef, {
                    savedPosts: [...savedPosts, postId]
                });
            }

            // Join community if not already a member
            joinCommunity();

            return !isSaved; // Return new saved state
        } catch (err) {
            console.error('Error toggling save:', err);
            error.value = err.message;
            throw err;
        }
    };

    /**
     * Check if post is saved by user
     */
    const isPostSavedByUser = async (postId) => {
        if (!authStore.user) return false;

        try {
            const userRef = doc($firestore, 'users', authStore.user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) return false;

            const userData = userSnap.data();
            const savedPosts = userData.savedPosts || [];
            return savedPosts.includes(postId);
        } catch (err) {
            console.error('Error checking saved status:', err);
            return false;
        }
    };

    /**
     * Get popular topics (tags with most usage)
     */
    const getPopularTopics = async () => {
        try {
            const postsRef = collection($firestore, 'community_posts');
            const q = query(postsRef, limit(100)); // Get recent posts
            const querySnapshot = await getDocs(q);

            const tagCounts = {};

            querySnapshot.forEach((doc) => {
                const post = doc.data();
                if (post.tags && Array.isArray(post.tags)) {
                    post.tags.forEach(tag => {
                        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
                    });
                }
            });

            // Convert to array and sort by count
            const popularTopics = Object.entries(tagCounts)
                .map(([tag, count]) => ({ tag, count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 10); // Top 10 topics

            return popularTopics;
        } catch (err) {
            console.error('Error fetching popular topics:', err);
            error.value = err.message;
            return [];
        }
    };

    /**
     * Get a single post by ID
     */
    const getPostById = async (postId) => {
        try {
            const docRef = doc($firestore, 'community_posts', postId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() };
            } else {
                return null;
            }
        } catch (err) {
            console.error('Error getting post:', err);
            error.value = err.message;
            throw err;
        }
    };

    /**
     * Join community (increment member count if new)
     */
    const joinCommunity = async () => {
        if (!authStore.user) return;

        try {
            const userRef = doc($firestore, 'users', authStore.user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const userData = userSnap.data();
                if (!userData.isCommunityMember) {
                    await updateDoc(userRef, { isCommunityMember: true });
                    await incrementStat('members');
                }
            }
        } catch (err) {
            console.error('Error joining community:', err);
            // Don't throw, just log
        }
    };

    return {
        // State
        posts,
        stats,
        loading,
        error,

        // Methods
        createPost,
        getPosts,
        subscribeToPost,
        toggleLike,
        getStats,
        subscribeToStats,
        incrementStat,
        isPostLikedByUser,
        sharePost,
        addComment,
        toggleSavePost,
        isPostSavedByUser,
        getPopularTopics,
        getPostById,
        getComments,
        subscribeToComments
    };
};

